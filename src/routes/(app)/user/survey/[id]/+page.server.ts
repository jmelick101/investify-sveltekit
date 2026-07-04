import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { surveys, surveyQuestions, surveyResponses } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { safeQuery } from '$lib/server/db/utils';

export const load: PageServerLoad = async ({ locals, params }) => {
	const user = locals.user!;
	const { id } = params;

	const [survey] = await safeQuery(
		() => db.select().from(surveys).where(eq(surveys.id, id)).limit(1),
		'Failed to load survey'
	);

	if (!survey) {
		return {
			survey: null,
			message: 'Survey not found'
		};
	}

	const questions = await safeQuery(
		() =>
			db
				.select()
				.from(surveyQuestions)
				.where(eq(surveyQuestions.surveyId, id))
				.orderBy(surveyQuestions.sortOrder),
		'Failed to load survey questions'
	);

	const [existingResponse] = await safeQuery(
		() =>
			db
				.select()
				.from(surveyResponses)
				.where(eq(surveyResponses.surveyId, id))
				.limit(1),
		'Failed to check survey response'
	);

	return {
		survey: {
			id: survey.id,
			name: survey.name,
			description: survey.description,
			status: survey.status,
			created_at: survey.createdAt?.toISOString() || new Date().toISOString(),
			questions: (questions || []).map((q) => ({
				id: q.id,
				text: q.text,
				type: q.type,
				options: (q.options as string[]) || [],
				required: q.required
			}))
		},
		hasResponded: !!existingResponse
	};
};
