import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import {
	createEmailVerificationToken,
	sendEmailVerificationEmail
} from '$lib/server/services/email';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(303, '/login');
	}

	if (locals.user.emailVerifiedAt) {
		throw redirect(303, '/user/dashboard');
	}

	return {
		email: locals.user.email
	};
};

export const actions: Actions = {
	resend: async ({ locals }) => {
		if (!locals.user) {
			return fail(401, { error: 'Unauthorized' });
		}

		if (locals.user.emailVerifiedAt) {
			return fail(400, { error: 'Email already verified' });
		}

		const token = await createEmailVerificationToken(locals.user.id);
		await sendEmailVerificationEmail(locals.user.email, token);

		return {
			success: true
		};
	}
};
