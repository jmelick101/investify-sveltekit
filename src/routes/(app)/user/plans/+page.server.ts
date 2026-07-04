import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { plans } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals }) => {
	const user = locals.user!; // Guaranteed by (app) layout

	// TODO: Replace with real data - Load all active plans
	const activePlans = await db
		.select()
		.from(plans)
		.where(eq(plans.status, 'active'));

	return {
		plans: activePlans.map((plan) => ({
			id: plan.id,
			name: plan.name,
			category: plan.category,
			minAmount: Number(plan.minAmount),
			maxAmount: Number(plan.maxAmount),
			duration: plan.durationDays,
			percentMin: Number(plan.percentMin),
			percentMax: Number(plan.percentMax),
			payout: plan.payoutOptions as string[],
			features: plan.features as string[],
			referrals: plan.referralLevels as any[],
			status: plan.status,
			recommended: plan.recommended,
			subscribedUsers: 0 // TODO: Calculate from investments table
		}))
	};
};
