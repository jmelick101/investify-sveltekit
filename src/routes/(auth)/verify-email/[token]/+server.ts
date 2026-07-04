import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import {
	verifyEmailVerificationToken,
	deleteEmailVerificationToken
} from '$lib/server/services/email';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const GET: RequestHandler = async ({ params }) => {
	const { token } = params;

	const userId = await verifyEmailVerificationToken(token);

	if (!userId) {
		throw redirect(303, '/verify-email?error=invalid_token');
	}

	await db.update(users).set({ emailVerifiedAt: new Date() }).where(eq(users.id, userId));

	await deleteEmailVerificationToken(userId);

	throw redirect(303, '/user/dashboard?verified=true');
};
