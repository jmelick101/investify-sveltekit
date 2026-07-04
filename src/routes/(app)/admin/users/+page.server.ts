import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { desc, like, or, sql } from 'drizzle-orm';
import { safeQuery, formatPagination } from '$lib/server/db/utils';

export const load: PageServerLoad = async ({ url }) => {
	const page = Number(url.searchParams.get('page')) || 1;
	const limit = 20;
	const offset = (page - 1) * limit;
	const search = url.searchParams.get('search') || '';

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

	const whereClause = conditions.length > 0 ? conditions[0] : undefined;

	const usersList = await safeQuery(
		() =>
			db
				.select()
				.from(users)
				.where(whereClause)
				.orderBy(desc(users.createdAt))
				.limit(limit)
				.offset(offset),
		'Failed to load users'
	);

	const totalResult = await safeQuery(
		() => db.select({ count: sql<number>`count(*)::int` }).from(users).where(whereClause),
		'Failed to count users'
	);
	const total = totalResult?.[0]?.count || 0;

	return {
		breadcrumbs: [
			{ title: 'Dashboard', href: '/admin/dashboard' },
			{ title: 'Users', href: '/admin/users' }
		],
		users: usersList,
		pagination: formatPagination(page, limit, total),
		search
	};
};
