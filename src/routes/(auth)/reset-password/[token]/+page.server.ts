import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { resetPasswordSchema } from '$lib/server/validation/auth';
import { verifyPasswordResetToken, deletePasswordResetToken } from '$lib/server/services/email';
import { hashPassword } from '$lib/server/auth/password';
import { lucia } from '$lib/server/auth';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		throw redirect(302, '/user/dashboard');
	}
	const token = event.params.token;
	const userId = await verifyPasswordResetToken(token);
	return {
		invalidToken: !userId
	};
};

export const actions: Actions = {
	default: async (event) => {
		const token = event.params.token;
		const userId = await verifyPasswordResetToken(token);
		if (!userId) {
			return fail(400, {
				errors: {
					password: 'Token has expired or is invalid.',
					passwordConfirmation: null as string | null
				}
			});
		}

		const formData = await event.request.formData();
		const password = formData.get('password');
		const passwordConfirmation = formData.get('passwordConfirmation');

		const result = resetPasswordSchema.safeParse({ password, passwordConfirmation });
		if (!result.success) {
			const errors = result.error.flatten().fieldErrors;
			return fail(400, {
				errors: {
					password: errors.password?.[0] || null,
					passwordConfirmation: errors.passwordConfirmation?.[0] || null
				}
			});
		}

		const passwordHash = await hashPassword(result.data.password);
		await db.update(users).set({ passwordHash }).where(eq(users.id, userId));
		await lucia.invalidateUserSessions(userId);
		await deletePasswordResetToken(userId);

		return { success: true };
	}
};
