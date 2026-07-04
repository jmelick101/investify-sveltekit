import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/db';
import { withdrawals, users, wallets } from '$lib/server/db/schema';
import { desc, eq } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';
import { safeQuery, withTransaction } from '$lib/server/db/utils';
import { logAuditEvent, AuditActions } from '$lib/server/audit';
import { sendWithdrawalApprovalEmail, sendWithdrawalRejectionEmail } from '$lib/server/email';

export const load: PageServerLoad = async () => {
	const withdrawalsList = await safeQuery(
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
					processedAt: withdrawals.processedAt,
					user: {
						id: users.id,
						firstName: users.firstName,
						lastName: users.lastName,
						email: users.email
					},
					wallet: {
						id: wallets.id,
						name: wallets.name,
						address: wallets.address,
						cryptocurrency: wallets.cryptocurrency
					}
				})
				.from(withdrawals)
				.leftJoin(users, eq(withdrawals.userId, users.id))
				.leftJoin(wallets, eq(withdrawals.walletId, wallets.id))
				.orderBy(desc(withdrawals.createdAt))
				.limit(50),
		'Failed to load withdrawals'
	);

	return {
		breadcrumbs: [
			{ title: 'Dashboard', href: '/admin/dashboard' },
			{ title: 'Withdrawals', href: '/admin/withdrawals' }
		],
		withdrawals: withdrawalsList
	};
};

export const actions: Actions = {
	approve: async ({ request, locals }) => {
		const formData = await request.formData();
		const id = formData.get('id');
		const transactionHash = formData.get('transactionHash');

		if (!id) {
			return fail(400, { error: 'Withdrawal ID is required' });
		}

		const [withdrawal] = await db
			.select()
			.from(withdrawals)
			.where(eq(withdrawals.id, id as string))
			.limit(1);

		if (!withdrawal) {
			return fail(404, { error: 'Withdrawal not found' });
		}

		if (withdrawal.status !== 'pending') {
			return fail(400, { error: `Cannot approve withdrawal with status: ${withdrawal.status}` });
		}

		try {
			await db
				.update(withdrawals)
				.set({
					status: 'completed',
					transactionHash: transactionHash?.toString(),
					processedAt: new Date(),
					updatedAt: new Date()
				})
				.where(eq(withdrawals.id, id as string));

			const [user] = await db
				.select({ email: users.email, firstName: users.firstName })
				.from(users)
				.where(eq(users.id, withdrawal.userId))
				.limit(1);

			if (user) {
				await sendWithdrawalApprovalEmail(
					user.email,
					withdrawal.amount,
					withdrawal.cryptoSymbol
				);
			}

			await logAuditEvent({
				userId: locals.user?.id || '',
				action: AuditActions.WITHDRAWAL_APPROVE,
				resourceType: 'withdrawal',
				resourceId: id as string,
				details: { amount: withdrawal.amount, cryptoSymbol: withdrawal.cryptoSymbol },
				ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
				userAgent: request.headers.get('user-agent') || 'unknown'
			});

			return { success: true, message: 'Withdrawal approved' };
		} catch (error) {
			return fail(500, { error: 'Failed to approve withdrawal' });
		}
	},

	reject: async ({ request, locals }) => {
		const formData = await request.formData();
		const id = formData.get('id');

		if (!id) {
			return fail(400, { error: 'Withdrawal ID is required' });
		}

		const [withdrawal] = await db
			.select()
			.from(withdrawals)
			.where(eq(withdrawals.id, id as string))
			.limit(1);

		if (!withdrawal) {
			return fail(404, { error: 'Withdrawal not found' });
		}

		if (withdrawal.status !== 'pending') {
			return fail(400, { error: `Cannot reject withdrawal with status: ${withdrawal.status}` });
		}

		try {
			await withTransaction(async (tx) => {
				const [user] = await tx
					.select({ walletBalance: users.walletBalance, email: users.email })
					.from(users)
					.where(eq(users.id, withdrawal.userId))
					.limit(1);

				if (user) {
					const refundAmount = Number(withdrawal.amount);
					const currentBalance = Number(user.walletBalance);

					await tx
						.update(users)
						.set({
							walletBalance: (currentBalance + refundAmount).toString(),
							updatedAt: new Date()
						})
						.where(eq(users.id, withdrawal.userId));

					await sendWithdrawalRejectionEmail(
						user.email,
						withdrawal.amount,
						'Funds have been returned to your wallet'
					);
				}

				await tx
					.update(withdrawals)
					.set({
						status: 'rejected',
						updatedAt: new Date()
					})
					.where(eq(withdrawals.id, id as string));
			}, 'Failed to reject withdrawal');

			await logAuditEvent({
				userId: locals.user?.id || '',
				action: AuditActions.WITHDRAWAL_REJECT,
				resourceType: 'withdrawal',
				resourceId: id as string,
				details: { amount: withdrawal.amount, refunded: true },
				ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
				userAgent: request.headers.get('user-agent') || 'unknown'
			});

			return { success: true, message: 'Withdrawal rejected and funds refunded' };
		} catch (error) {
			return fail(500, { error: 'Failed to reject withdrawal' });
		}
	}
};
