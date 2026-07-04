import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { withdrawals } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals }) => {
	const user = locals.user!;

	// TODO: Replace with real data - Load user's withdrawals
	const userWithdrawals = await db
		.select()
		.from(withdrawals)
		.where(eq(withdrawals.userId, user.id));

	return {
		withdrawals: userWithdrawals.map((w) => ({
			id: w.id,
			amount: Number(w.amount),
			crypto: w.cryptoSymbol,
			address: w.walletId, // TODO: Join with wallets table to get actual address
			status: w.status,
			createdAt: w.createdAt.toISOString(),
			updatedAt: w.updatedAt.toISOString()
		}))
	};
};
