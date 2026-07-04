import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { plans } from '$lib/server/db/schema';
import { desc } from 'drizzle-orm';
import { safeQuery } from '$lib/server/db/utils';

export const load: PageServerLoad = async () => {
	const plansList = await safeQuery(
		() => db.select().from(plans).orderBy(desc(plans.createdAt)),
		'Failed to load plans'
	);

	return {
		breadcrumbs: [
			{ title: 'Dashboard', href: '/admin/dashboard' },
			{ title: 'Plans', href: '/admin/plans' }
		],
		plans: plansList
	};
};
