import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { surveyResponses, surveys } from '$lib/server/db/schema';
import { eq, and } from 'drizzle-orm';
import { logAuditEvent, AuditActions } from '$lib/server/audit';

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const { surveyId, answers } = await request.json();

		if (!surveyId || !answers) {
			return json({ error: 'Survey ID and answers are required' }, { status: 400 });
		}

		const [survey] = await db
			.select()
			.from(surveys)
			.where(eq(surveys.id, surveyId))
			.limit(1);

		if (!survey) {
			return json({ error: 'Survey not found' }, { status: 404 });
		}

		const [existingResponse] = await db
			.select()
			.from(surveyResponses)
			.where(
				and(
					eq(surveyResponses.surveyId, surveyId),
					eq(surveyResponses.userId, locals.user.id)
				)
			)
			.limit(1);

		if (existingResponse) {
			return json({ error: 'You have already submitted a response to this survey' }, { status: 409 });
		}

		const [response] = await db
			.insert(surveyResponses)
			.values({
				surveyId,
				userId: locals.user.id,
				answers
			})
			.returning();

		await logAuditEvent({
			userId: locals.user.id,
			action: AuditActions.USER_UPDATE_PROFILE,
			resourceType: 'survey_response',
			details: { surveyId, responseId: response.id },
			ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
			userAgent: request.headers.get('user-agent') || 'unknown'
		});

		return json({ success: true, responseId: response.id });
	} catch (error) {
		console.error('Survey submission error:', error);
		return json({ error: 'Failed to submit survey' }, { status: 500 });
	}
};
