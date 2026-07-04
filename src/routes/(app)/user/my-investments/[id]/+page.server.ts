import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { investments, plans } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { safeQuery } from '$lib/server/db/utils';

export const load: PageServerLoad = async ({ locals, params }) => {
	const user = locals.user!;
	const { id } = params;

	const userInvestment = await safeQuery(
		() =>
			db
				.select()
				.from(investments)
				.leftJoin(plans, eq(investments.planId, plans.id))
				.where(eq(investments.id, id))
				.limit(1),
		'Failed to load investment'
	);

	const inv = userInvestment?.[0];

	return {
		investment: inv
			? {
					id: inv.investments.id,
					investedCapital: Number(inv.investments.amount),
					profit: Number(inv.investments.profitAccrued),
					totalExpectedProfit: Number(inv.investments.totalExpectedProfit),
					endDate: inv.investments.endDate || new Date().toISOString(),
					amount: Number(inv.investments.amount),
					status: inv.investments.status,
					startDate: inv.investments.startDate,
					payoutOption: inv.investments.payoutOption,
					cryptoSymbol: inv.investments.cryptoSymbol,
					cryptoAmount: inv.investments.cryptoAmount,
					createdAt: inv.investments.createdAt?.toISOString(),
					updatedAt: inv.investments.updatedAt?.toISOString(),
					plan: {
						id: inv.plans?.id ?? '',
						name: inv.plans?.name ?? 'Unknown Plan',
						duration: inv.plans?.durationDays ?? 0,
						category: inv.plans?.category ?? '',
						roi: `${inv.plans?.percentMin} - ${inv.plans?.percentMax}%`
					}
				}
			: null
	};
};
