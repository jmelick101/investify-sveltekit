import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { surveys, surveyQuestions } from '$lib/server/db/schema';
import { eq, desc } from 'drizzle-orm';
import { safeQuery } from '$lib/server/db/utils';

export const load: PageServerLoad = async () => {
	const activeSurveys = await safeQuery(
		() =>
			db
				.select()
				.from(surveys)
				.where(eq(surveys.isActive, true))
				.orderBy(desc(surveys.createdAt)),
		'Failed to load surveys'
	);

	const surveyIds = activeSurveys?.map((s) => s.id) || [];

	const questionsBySurvey: Record<string, any[]> = {};
	if (surveyIds.length > 0) {
		const allQuestions = await safeQuery(
			() => db.select().from(surveyQuestions).orderBy(surveyQuestions.order),
			'Failed to load survey questions'
		);

		for (const q of allQuestions || []) {
			if (!questionsBySurvey[q.surveyId]) {
				questionsBySurvey[q.surveyId] = [];
			}
			questionsBySurvey[q.surveyId].push(q);
		}
	}

	const surveysWithQuestions = (activeSurveys || []).map((survey) => ({
		...survey,
		questions: questionsBySurvey[survey.id] || []
	}));

	return {
		breadcrumbs: [
			{ title: 'Dashboard', href: '/user/dashboard' },
			{ title: 'Surveys', href: '/user/surveys' }
		],
		surveys: surveysWithQuestions
	};
};
