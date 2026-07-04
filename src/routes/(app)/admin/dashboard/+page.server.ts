import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { users, investments, withdrawals, plans } from '$lib/server/db/schema';
import { sql, eq, desc } from 'drizzle-orm';
import { safeQuery } from '$lib/server/db/utils';

export const load: PageServerLoad = async () => {
	const totalUsersResult = await safeQuery(
		() => db.select({ count: sql<number>`count(*)::int` }).from(users),
		'Failed to load total users'
	);
	const totalUsers = totalUsersResult?.[0]?.count || 0;

	const totalInvestmentsResult = await safeQuery(
		() =>
			db.select({ sum: sql<string>`COALESCE(sum(amount), 0)::text` }).from(investments),
		'Failed to load total investments'
	);
	const totalInvestments = Number(totalInvestmentsResult?.[0]?.sum || 0);

	const activeInvestmentsResult = await safeQuery(
		() => db.select({ count: sql<number>`count(*)::int` }).from(investments).where(eq(investments.status, 'active')),
		'Failed to load active investments'
	);
	const activeInvestments = activeInvestmentsResult?.[0]?.count || 0;

	const pendingWithdrawalsResult = await safeQuery(
		() => db.select({ count: sql<number>`count(*)::int` }).from(withdrawals).where(eq(withdrawals.status, 'pending')),
		'Failed to load pending withdrawals'
	);
	const pendingWithdrawals = pendingWithdrawalsResult?.[0]?.count || 0;

	const pendingInvestmentsResult = await safeQuery(
		() => db.select({ count: sql<number>`count(*)::int` }).from(investments).where(eq(investments.status, 'pending')),
		'Failed to load pending investments'
	);
	const pendingInvestments = pendingInvestmentsResult?.[0]?.count || 0;

	const totalPlansResult = await safeQuery(
		() => db.select({ count: sql<number>`count(*)::int` }).from(plans),
		'Failed to load total plans'
	);
	const totalPlans = totalPlansResult?.[0]?.count || 0;

	const recentUsers = await safeQuery(
		() =>
			db
				.select({
					id: users.id,
					firstName: users.firstName,
					lastName: users.lastName,
					email: users.email,
					createdAt: users.createdAt,
					role: users.role
				})
				.from(users)
				.orderBy(desc(users.createdAt))
				.limit(5),
		'Failed to load recent users'
	);

	const recentInvestments = await safeQuery(
		() =>
			db
				.select({
					id: investments.id,
					amount: investments.amount,
					status: investments.status,
					createdAt: investments.createdAt,
					user: {
						firstName: users.firstName,
						lastName: users.lastName,
						email: users.email
					},
					plan: {
						name: plans.name
					}
				})
				.from(investments)
				.leftJoin(users, eq(investments.userId, users.id))
				.leftJoin(plans, eq(investments.planId, plans.id))
				.orderBy(desc(investments.createdAt))
				.limit(5),
		'Failed to load recent investments'
	);

	return {
		breadcrumbs: [{ title: 'Dashboard', href: '/admin/dashboard' }],
		stats: {
			totalUsers,
			totalInvestments,
			activeInvestments,
			pendingWithdrawals,
			pendingInvestments,
			totalPlans
		},
		recentUsers,
		recentInvestments
	};
};
