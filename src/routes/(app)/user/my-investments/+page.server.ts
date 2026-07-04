import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { investments, plans } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals }) => {
	const user = locals.user!;

	// TODO: Replace with real data - Load user's investments
	const userInvestments = await db
		.select()
		.from(investments)
		.leftJoin(plans, eq(investments.planId, plans.id))
		.where(eq(investments.userId, user.id));

	return {
		investments: userInvestments.map((inv) => ({
			id: inv.investments.id,
			status: inv.investments.status,
			invested: Number(inv.investments.amount),
			split: {
				left: Number(inv.investments.amount) * 0.5,
				right: Number(inv.investments.amount) * 0.5
			},
			startDate: inv.investments.startDate?.toISOString() ?? new Date().toISOString(),
			endDate: inv.investments.endDate?.toISOString() ?? new Date().toISOString(),
			nextPaymentDate: inv.investments.nextPayoutDate?.toISOString() ?? new Date().toISOString(),
			plan: {
				id: inv.plans?.id ?? '',
				name: inv.plans?.name ?? 'Unknown Plan'
			}
		}))
	};
};
