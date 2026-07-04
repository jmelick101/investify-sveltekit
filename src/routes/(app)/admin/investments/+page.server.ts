import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { investments, users, plans } from '$lib/server/db/schema';
import { desc, eq, like, or, sql } from 'drizzle-orm';
import { safeQuery, formatPagination } from '$lib/server/db/utils';

export const load: PageServerLoad = async ({ url }) => {
	const page = Number(url.searchParams.get('page')) || 1;
	const limit = 20;
	const offset = (page - 1) * limit;
	const search = url.searchParams.get('search') || '';
	const status = url.searchParams.get('status') || '';

	const conditions = [];
	if (search) {
		conditions.push(
			or(
				like(users.email, `%${search}%`),
				like(users.firstName, `%${search}%`),
				like(users.lastName, `%${search}%`)
			)
		);
	}
	if (status) {
		conditions.push(eq(investments.status, status));
	}

	const whereClause = conditions.length > 0 ? (conditions.length === 1 ? conditions[0] : sql`${conditions.join(' AND ')}`) : undefined;

	const investmentsList = await safeQuery(
		() =>
			db
				.select({
					id: investments.id,
					amount: investments.amount,
					status: investments.status,
					paymentMethod: investments.paymentMethod,
					payoutOption: investments.payoutOption,
					profitAccrued: investments.profitAccrued,
					totalExpectedProfit: investments.totalExpectedProfit,
					startDate: investments.startDate,
					endDate: investments.endDate,
					createdAt: investments.createdAt,
					user: {
						id: users.id,
						firstName: users.firstName,
						lastName: users.lastName,
						email: users.email
					},
					plan: {
						id: plans.id,
						name: plans.name,
						category: plans.category
					}
				})
				.from(investments)
				.leftJoin(users, eq(investments.userId, users.id))
				.leftJoin(plans, eq(investments.planId, plans.id))
				.where(whereClause)
				.orderBy(desc(investments.createdAt))
				.limit(limit)
				.offset(offset),
		'Failed to load investments'
	);

	const totalResult = await safeQuery(
		() => db.select({ count: sql<number>`count(*)::int` }).from(investments).where(whereClause),
		'Failed to count investments'
	);
	const total = totalResult?.[0]?.count || 0;

	return {
		breadcrumbs: [
			{ title: 'Dashboard', href: '/admin/dashboard' },
			{ title: 'Investments', href: '/admin/investments' }
		],
		investments: investmentsList,
		pagination: formatPagination(page, limit, total),
		search,
		status
	};
};
