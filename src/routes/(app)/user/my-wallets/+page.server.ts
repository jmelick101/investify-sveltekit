import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { wallets } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals }) => {
	const user = locals.user!;

	// TODO: Replace with real data - Load user's wallets
	const userWallets = await db
		.select()
		.from(wallets)
		.where(eq(wallets.userId, user.id));

	return {
		wallets: userWallets.map((w) => ({
			id: w.id,
			cryptocurrency: w.cryptocurrency,
			name: w.name,
			address: w.address,
			received: '0.00', // TODO: Calculate from transactions
			created_at: w.createdAt.toISOString()
		}))
	};
};
