import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { surveys } from '$lib/server/db/schema';
import { desc } from 'drizzle-orm';
import { safeQuery } from '$lib/server/db/utils';

export const load: PageServerLoad = async () => {
	const surveysList = await safeQuery(
		() => db.select().from(surveys).orderBy(desc(surveys.createdAt)).limit(50),
		'Failed to load surveys'
	);

	return {
		breadcrumbs: [
			{ title: 'Dashboard', href: '/admin/dashboard' },
			{ title: 'Surveys', href: '/admin/surveys' }
		],
		surveys: surveysList
	};
};
