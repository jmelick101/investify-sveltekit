import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/db';
import { withdrawals, wallets, users } from '$lib/server/db/schema';
import { eq, desc, sql } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';
import { createWithdrawalSchema } from '$lib/server/validation/user';
import { safeQuery, withTransaction } from '$lib/server/db/utils';

export const load: PageServerLoad = async ({ locals }) => {
	const user = locals.user!;

	const userWithdrawals = await safeQuery(
		() =>
			db
				.select({
					id: withdrawals.id,
					amount: withdrawals.amount,
					cryptoSymbol: withdrawals.cryptoSymbol,
					cryptoAmount: withdrawals.cryptoAmount,
					status: withdrawals.status,
					walletType: withdrawals.walletType,
					transactionHash: withdrawals.transactionHash,
					createdAt: withdrawals.createdAt,
					updatedAt: withdrawals.updatedAt,
					processedAt: withdrawals.processedAt,
					walletAddress: wallets.address,
					walletName: wallets.name
				})
				.from(withdrawals)
				.leftJoin(wallets, eq(withdrawals.walletId, wallets.id))
				.where(eq(withdrawals.userId, user.id))
				.orderBy(desc(withdrawals.createdAt)),
		'Failed to load withdrawals'
	);

	const userWallets = await safeQuery(
		() =>
			db
				.select()
				.from(wallets)
				.where(eq(wallets.userId, user.id))
				.orderBy(desc(wallets.createdAt)),
		'Failed to load wallets'
	);

	const [userBalances] = await safeQuery(
		() =>
			db
				.select({
					walletBalance: users.walletBalance,
					tokenBalance: users.tokenBalance
				})
				.from(users)
				.where(eq(users.id, user.id))
				.limit(1),
		'Failed to load user balances'
	);

	return {
		breadcrumbs: [
			{ title: 'Dashboard', href: '/user/dashboard' },
			{ title: 'Withdrawals', href: '/user/withdrawals' }
		],
		withdrawals: userWithdrawals.map((w) => ({
			id: w.id,
			amount: Number(w.amount),
			crypto: w.cryptoSymbol,
			cryptoAmount: w.cryptoAmount,
			address: w.walletAddress || 'N/A',
			walletName: w.walletName || 'N/A',
			status: w.status,
			transactionHash: w.transactionHash,
			createdAt: w.createdAt?.toISOString() || new Date().toISOString(),
			updatedAt: w.updatedAt?.toISOString() || new Date().toISOString(),
			processedAt: w.processedAt?.toISOString() || null
		})),
		wallets: userWallets.map((w) => ({
			id: w.id,
			cryptocurrency: w.cryptocurrency,
			name: w.name,
			address: w.address
		})),
		balances: {
			main: Number(userBalances?.walletBalance || 0),
			token: Number(userBalances?.tokenBalance || 0)
		}
	};
};

export const actions: Actions = {
	createWithdrawal: async ({ request, locals }) => {
		const user = locals.user!;
		const formData = await request.formData();
		const data = Object.fromEntries(formData);

		const result = createWithdrawalSchema.safeParse({
			...data,
			amount: Number(data.amount)
		});

		if (!result.success) {
			return fail(400, {
				errors: result.error.flatten().fieldErrors,
				data
			});
		}

		const { walletId, walletType, amount, cryptoSymbol } = result.data;

		return await withTransaction(async (tx) => {
			const [wallet] = await tx
				.select()
				.from(wallets)
				.where(eq(wallets.id, walletId))
				.limit(1);

			if (!wallet || wallet.userId !== user.id) {
				return fail(404, { error: 'Wallet not found' });
			}

			const [currentUser] = await tx
				.select({
					walletBalance: users.walletBalance,
					tokenBalance: users.tokenBalance
				})
				.from(users)
				.where(eq(users.id, user.id))
				.limit(1);

			let currentBalance = 0;
			if (walletType === 'main') {
				currentBalance = Number(currentUser?.walletBalance || 0);
			} else if (walletType === 'token') {
				currentBalance = Number(currentUser?.tokenBalance || 0);
			}

			if (currentBalance < amount) {
				return fail(400, {
					error: `Insufficient ${walletType} wallet balance. Available: £${currentBalance.toFixed(2)}`
				});
			}

			const [withdrawal] = await tx
				.insert(withdrawals)
				.values({
					userId: user.id,
					walletId,
					walletType,
					amount: amount.toString(),
					cryptoSymbol,
					status: 'pending'
				})
				.returning();

			if (walletType === 'main') {
				await tx
					.update(users)
					.set({
						walletBalance: (currentBalance - amount).toString(),
						updatedAt: new Date()
					})
					.where(eq(users.id, user.id));
			} else if (walletType === 'token') {
				await tx
					.update(users)
					.set({
						tokenBalance: (currentBalance - amount).toString(),
						updatedAt: new Date()
					})
					.where(eq(users.id, user.id));
			}

			return {
				success: true,
				message: 'Withdrawal request submitted successfully. Awaiting admin approval.',
				withdrawalId: withdrawal.id
			};
		}, 'Failed to create withdrawal');
	},

	cancelWithdrawal: async ({ request, locals }) => {
		const user = locals.user!;
		const formData = await request.formData();
		const withdrawalId = formData.get('withdrawalId') as string;

		if (!withdrawalId) {
			return fail(400, { error: 'Withdrawal ID is required' });
		}

		return await withTransaction(async (tx) => {
			const [withdrawal] = await tx
				.select()
				.from(withdrawals)
				.where(eq(withdrawals.id, withdrawalId))
				.limit(1);

			if (!withdrawal || withdrawal.userId !== user.id) {
				return fail(404, { error: 'Withdrawal not found' });
			}

			if (withdrawal.status !== 'pending') {
				return fail(400, { error: 'Can only cancel pending withdrawals' });
			}

			const [currentUser] = await tx
				.select({
					walletBalance: users.walletBalance,
					tokenBalance: users.tokenBalance
				})
				.from(users)
				.where(eq(users.id, user.id))
				.limit(1);

			const withdrawalAmount = Number(withdrawal.amount);

			if (withdrawal.walletType === 'main') {
				const currentBalance = Number(currentUser?.walletBalance || 0);
				await tx
					.update(users)
					.set({
						walletBalance: (currentBalance + withdrawalAmount).toString(),
						updatedAt: new Date()
					})
					.where(eq(users.id, user.id));
			} else if (withdrawal.walletType === 'token') {
				const currentBalance = Number(currentUser?.tokenBalance || 0);
				await tx
					.update(users)
					.set({
						tokenBalance: (currentBalance + withdrawalAmount).toString(),
						updatedAt: new Date()
					})
					.where(eq(users.id, user.id));
			}

			await tx.delete(withdrawals).where(eq(withdrawals.id, withdrawalId));

			return {
				success: true,
				message: 'Withdrawal cancelled and funds returned to your wallet.'
			};
		}, 'Failed to cancel withdrawal');
	}
};
