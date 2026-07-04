import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { plans } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { safeQuery } from '$lib/server/db/utils';

export const load: PageServerLoad = async ({ locals, params }) => {
	const user = locals.user!;
	const { id } = params;

	const [plan] = await safeQuery(
		() => db.select().from(plans).where(eq(plans.id, id)).limit(1),
		'Failed to load plan'
	);

	if (!plan) {
		return {
			plan: null,
			message: 'Plan not found'
		};
	}

	return {
		breadcrumbs: [
			{ title: 'Dashboard', href: '/user/dashboard' },
			{ title: 'Calculator', href: '/user/calculator' }
		],
		plan: {
			id: plan.id,
			name: plan.name,
			duration: plan.durationDays,
			minAmount: Number(plan.minAmount),
			maxAmount: Number(plan.maxAmount),
			category: plan.category,
			roi: `${plan.percentMin} - ${plan.percentMax}%`,
			payout: (plan.payoutOptions as string[]) || ['Daily'],
			recommended: plan.recommended
		}
	};
};
