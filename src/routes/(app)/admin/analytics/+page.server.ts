import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { users, investments, withdrawals, plans, payouts } from '$lib/server/db/schema';
import { sql, eq, desc, and, gte, lte } from 'drizzle-orm';
import { safeQuery } from '$lib/server/db/utils';

export const load: PageServerLoad = async ({ url }) => {
	const timeRange = url.searchParams.get('range') || '30d';

	const now = new Date();
	let startDate = new Date();
	switch (timeRange) {
		case '7d':
			startDate.setDate(now.getDate() - 7);
			break;
		case '30d':
			startDate.setDate(now.getDate() - 30);
			break;
		case '90d':
			startDate.setDate(now.getDate() - 90);
			break;
		case '1y':
			startDate.setFullYear(now.getFullYear() - 1);
			break;
		default:
			startDate.setDate(now.getDate() - 30);
	}

	const totalUsersResult = await safeQuery(
		() => db.select({ count: sql<number>`count(*)::int` }).from(users),
		'Failed to load total users'
	);
	const totalUsers = totalUsersResult?.[0]?.count || 0;

	const newUsersResult = await safeQuery(
		() => db.select({ count: sql<number>`count(*)::int` }).from(users).where(gte(users.createdAt, startDate)),
		'Failed to load new users'
	);
	const newUsers = newUsersResult?.[0]?.count || 0;

	const investmentStats = await safeQuery(
		() =>
			db
				.select({
					totalAmount: sql<string>`COALESCE(SUM(${investments.amount}::numeric), 0)::text`,
					totalProfit: sql<string>`COALESCE(SUM(${investments.profitAccrued}::numeric), 0)::text`,
					activeCount: sql<number>`COUNT(CASE WHEN ${investments.status} = 'active' THEN 1 END)`,
					completedCount: sql<number>`COUNT(CASE WHEN ${investments.status} = 'completed' THEN 1 END)`
				})
				.from(investments),
		'Failed to load investment stats'
	);
	const invStats = investmentStats?.[0];

	const recentInvestments = await safeQuery(
		() =>
			db
				.select({
					date: sql<string>`TO_CHAR(${investments.createdAt}::date, 'YYYY-MM-DD')`,
					amount: sql<string>`COALESCE(SUM(${investments.amount}::numeric), 0)::text`
				})
				.from(investments)
				.where(gte(investments.createdAt, startDate))
				.groupBy(sql`${investments.createdAt}::date`)
				.orderBy(sql`${investments.createdAt}::date`)
				.limit(30),
		'Failed to load investment trend'
	);

	const withdrawalStats = await safeQuery(
		() =>
			db
				.select({
					totalAmount: sql<string>`COALESCE(SUM(${withdrawals.amount}::numeric), 0)::text`,
					pendingCount: sql<number>`COUNT(CASE WHEN ${withdrawals.status} = 'pending' THEN 1 END)`,
					completedCount: sql<number>`COUNT(CASE WHEN ${withdrawals.status} = 'completed' THEN 1 END)`
				})
				.from(withdrawals),
		'Failed to load withdrawal stats'
	);
	const wdStats = withdrawalStats?.[0];

	const planDistribution = await safeQuery(
		() =>
			db
				.select({
					planName: plans.name,
					count: sql<number>`COUNT(${investments.id})`,
					totalAmount: sql<string>`COALESCE(SUM(${investments.amount}::numeric), 0)::text`
				})
				.from(investments)
				.leftJoin(plans, eq(investments.planId, plans.id))
				.groupBy(plans.name)
				.orderBy(sql`COUNT(${investments.id}) DESC`)
				.limit(5),
		'Failed to load plan distribution'
	);

	const payoutStats = await safeQuery(
		() =>
			db
				.select({
					totalPaid: sql<string>`COALESCE(SUM(${payouts.payoutAmount}::numeric), 0)::text`,
					count: sql<number>`COUNT(*)`
				})
				.from(payouts)
				.where(gte(payouts.createdAt, startDate)),
		'Failed to load payout stats'
	);
	const payStats = payoutStats?.[0];

	const totalAmount = Number(invStats?.totalAmount || 0);
	const totalProfit = Number(invStats?.totalProfit || 0);

	return {
		breadcrumbs: [
			{ title: 'Dashboard', href: '/admin/dashboard' },
			{ title: 'Analytics', href: '/admin/analytics' }
		],
		timeRange,
		analytics: {
			users: {
				total: totalUsers,
				new: newUsers,
				growthRate: totalUsers > 0 ? ((newUsers / totalUsers) * 100).toFixed(1) : '0'
			},
			investments: {
				totalAmount,
				totalProfit,
				active: invStats?.activeCount || 0,
				completed: invStats?.completedCount || 0
			},
			withdrawals: {
				totalAmount: Number(wdStats?.totalAmount || 0),
				pending: wdStats?.pendingCount || 0,
				completed: wdStats?.completedCount || 0
			},
			payouts: {
				totalPaid: Number(payStats?.totalPaid || 0),
				count: payStats?.count || 0
			},
			revenue: {
				total: totalAmount,
				profit: totalProfit,
				margin: totalAmount > 0 ? ((totalProfit / totalAmount) * 100).toFixed(1) : '0'
			},
			charts: {
				investmentTrend: recentInvestments,
				planDistribution
			}
		}
	};
};
