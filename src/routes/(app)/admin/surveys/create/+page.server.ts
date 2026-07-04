import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { db } from '$lib/server/db';
import { surveys, surveyQuestions } from '$lib/server/db/schema';
import { z } from 'zod';

const createSurveySchema = z.object({
	name: z.string().min(1, 'Survey name is required'),
	description: z.string().optional(),
	questionsJson: z.string()
});

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const data = {
			name: formData.get('name'),
			description: formData.get('description') || undefined,
			questionsJson: formData.get('questionsJson')
		};

		const result = createSurveySchema.safeParse(data);

		if (!result.success) {
			return fail(400, {
				errors: result.error.flatten().fieldErrors,
				data
			});
		}

		try {
			const questions = JSON.parse(result.data.questionsJson);

			// Create survey
			const [survey] = await db
				.insert(surveys)
				.values({
					name: result.data.name,
					description: result.data.description || null,
					type: 'general',
					status: 'active'
				})
				.returning();

			// Create questions
			const questionValues = questions.map((q: any, index: number) => ({
				surveyId: survey.id,
				text: q.text,
				type: q.type,
				options: ['radio', 'checkbox', 'select'].includes(q.type) ? q.options : null,
				required: q.required,
				sortOrder: index
			}));

			await db.insert(surveyQuestions).values(questionValues);

			throw redirect(303, `/admin/surveys/${survey.id}`);
		} catch (error) {
			if (error instanceof Response) throw error;
			console.error('Survey creation error:', error);
			return fail(500, {
				error: 'Failed to create survey',
				data
			});
		}
	}
};
