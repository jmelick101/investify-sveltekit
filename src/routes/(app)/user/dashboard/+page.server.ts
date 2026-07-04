import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { investments, plans, withdrawals } from '$lib/server/db/schema';
import { eq, sql, and, desc } from 'drizzle-orm';
import { safeQuery } from '$lib/server/db/utils';

export const load: PageServerLoad = async ({ locals }) => {
	const user = locals.user!;

	const userInvestments = await safeQuery(
		() =>
			db
				.select({
					id: investments.id,
					amount: investments.amount,
					status: investments.status,
					profitAccrued: investments.profitAccrued,
					startDate: investments.startDate,
					endDate: investments.endDate,
					planName: plans.name,
					planCategory: plans.category
				})
				.from(investments)
				.leftJoin(plans, eq(investments.planId, plans.id))
				.where(eq(investments.userId, user.id))
				.orderBy(desc(investments.createdAt))
				.limit(5),
		'Failed to load user investments'
	);

	const stats = await safeQuery(
		() =>
			db
				.select({
					totalInvested: sql<string>`COALESCE(SUM(CASE WHEN ${investments.status} IN ('active', 'completed') THEN ${investments.amount}::numeric ELSE 0 END), 0)`,
					totalProfit: sql<string>`COALESCE(SUM(${investments.profitAccrued}::numeric), 0)`,
					activeCount: sql<number>`COUNT(CASE WHEN ${investments.status} = 'active' THEN 1 END)`
				})
				.from(investments)
				.where(eq(investments.userId, user.id)),
		'Failed to load investment stats'
	);

	const withdrawalStats = await safeQuery(
		() =>
			db
				.select({
					pending: sql<number>`COUNT(*)`
				})
				.from(withdrawals)
				.where(and(eq(withdrawals.userId, user.id), eq(withdrawals.status, 'pending'))),
		'Failed to load withdrawal stats'
	);

	const statsData = stats?.[0] || { totalInvested: '0', totalProfit: '0', activeCount: 0 };
	const withdrawalData = withdrawalStats?.[0] || { pending: 0 };

	return {
		breadcrumbs: [{ title: 'Dashboard', href: '/user/dashboard' }],
		user,
		investments: userInvestments,
		stats: {
			totalInvested: parseFloat(statsData.totalInvested || '0'),
			totalProfit: parseFloat(statsData.totalProfit || '0'),
			activeInvestments: statsData.activeCount || 0,
			pendingWithdrawals: withdrawalData.pending || 0,
			walletBalance: parseFloat(user.walletBalance),
			tokenBalance: parseFloat(user.tokenBalance)
		}
	};
};
