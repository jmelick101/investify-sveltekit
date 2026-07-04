import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/db';
import { wallets, platformWallets } from '$lib/server/db/schema';
import { eq, desc } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';
import { addWalletSchema, updateWalletSchema } from '$lib/server/validation/user';
import { safeQuery } from '$lib/server/db/utils';

export const load: PageServerLoad = async ({ locals }) => {
	const user = locals.user!;

	const userWallets = await safeQuery(
		() =>
			db
				.select()
				.from(wallets)
				.where(eq(wallets.userId, user.id))
				.orderBy(desc(wallets.createdAt)),
		'Failed to load wallets'
	);

	const platformWalletsList = await safeQuery(
		() => db.select().from(platformWallets).where(eq(platformWallets.isActive, true)),
		'Failed to load platform wallets'
	);

	return {
		breadcrumbs: [
			{ title: 'Dashboard', href: '/user/dashboard' },
			{ title: 'My Wallets', href: '/user/my-wallets' }
		],
		wallets: userWallets.map((w) => ({
			id: w.id,
			cryptocurrency: w.cryptocurrency,
			name: w.name,
			address: w.address,
			created_at: w.createdAt?.toISOString() || new Date().toISOString()
		})),
		platformWallets: platformWalletsList.map((pw) => ({
			id: pw.id,
			cryptocurrency: pw.cryptocurrency,
			name: pw.name,
			address: pw.address
		}))
	};
};

export const actions: Actions = {
	addWallet: async ({ request, locals }) => {
		const user = locals.user!;
		const formData = await request.formData();
		const data = Object.fromEntries(formData);

		const result = addWalletSchema.safeParse(data);

		if (!result.success) {
			return fail(400, {
				errors: result.error.flatten().fieldErrors,
				data
			});
		}

		const { cryptocurrency, name, address } = result.data;

		// Check if wallet with same address already exists for this user
		const [existingWallet] = await db
			.select()
			.from(wallets)
			.where(eq(wallets.address, address))
			.limit(1);

		if (existingWallet) {
			return fail(400, {
				error: 'A wallet with this address already exists'
			});
		}

		// Create wallet
		const [wallet] = await db
			.insert(wallets)
			.values({
				userId: user.id,
				cryptocurrency,
				name,
				address
			})
			.returning();

		return {
			success: true,
			message: 'Wallet added successfully',
			walletId: wallet.id
		};
	},

	updateWallet: async ({ request, locals }) => {
		const user = locals.user!;
		const formData = await request.formData();
		const walletId = formData.get('walletId') as string;
		const data = Object.fromEntries(formData);

		if (!walletId) {
			return fail(400, {
				error: 'Wallet ID is required'
			});
		}

		const result = updateWalletSchema.safeParse(data);

		if (!result.success) {
			return fail(400, {
				errors: result.error.flatten().fieldErrors,
				data
			});
		}

		const { name, address } = result.data;

		// Verify wallet exists and belongs to user
		const [existingWallet] = await db
			.select()
			.from(wallets)
			.where(eq(wallets.id, walletId))
			.limit(1);

		if (!existingWallet || existingWallet.userId !== user.id) {
			return fail(404, {
				error: 'Wallet not found'
			});
		}

		// Update wallet
		await db
			.update(wallets)
			.set({
				name,
				address,
				updatedAt: new Date()
			})
			.where(eq(wallets.id, walletId));

		return {
			success: true,
			message: 'Wallet updated successfully'
		};
	},

	deleteWallet: async ({ request, locals }) => {
		const user = locals.user!;
		const formData = await request.formData();
		const walletId = formData.get('walletId') as string;

		if (!walletId) {
			return fail(400, {
				error: 'Wallet ID is required'
			});
		}

		// Verify wallet exists and belongs to user
		const [existingWallet] = await db
			.select()
			.from(wallets)
			.where(eq(wallets.id, walletId))
			.limit(1);

		if (!existingWallet || existingWallet.userId !== user.id) {
			return fail(404, {
				error: 'Wallet not found'
			});
		}

		// Delete wallet
		await db.delete(wallets).where(eq(wallets.id, walletId));

		return {
			success: true,
			message: 'Wallet deleted successfully'
		};
	}
};
