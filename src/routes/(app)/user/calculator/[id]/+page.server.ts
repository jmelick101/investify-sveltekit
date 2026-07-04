import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { plans } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals, params }) => {
	const user = locals.user!;
	const { id } = params;

	// TODO: Replace with real calculator data
	// Load plan details for calculator
	const plan = await db.select().from(plans).where(eq(plans.id, id)).limit(1);

	return {
		calculatedInvestment: {
			id: id,
			plan: plan[0] ? {
				id: plan[0].id,
				name: plan[0].name,
				duration: plan[0].durationDays,
				amount: 1000,
				category: plan[0].category,
				roi: `${plan[0].percentMin} - ${plan[0].percentMax}%`,
				payout: plan[0].payoutOptions as string[]
			} : null,
			investedCapital: 1000,
			profit: 10,
			totalExpectedProfit: 1700,
			endDate: '2022-01-01',
			amount: 1000,
			tokens: 120,
			payoutOption: 'Daily',
			status: 'active'
		},
		payouts: [{
			daily: [],
			monthly: [],
			yearly: []
		}]
	};
};
