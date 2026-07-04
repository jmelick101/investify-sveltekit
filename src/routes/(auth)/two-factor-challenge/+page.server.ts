import { redirect, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { twoFactorChallengeSchema } from '$lib/server/validation/auth';
import { verifyTOTP, verifyRecoveryCode, removeRecoveryCode } from '$lib/server/auth/two-factor';
import { lucia } from '$lib/server/auth';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ cookies }) => {
	const userId = cookies.get('2fa_user_id');

	if (!userId) {
		throw redirect(303, '/login');
	}

	return {};
};

export const actions: Actions = {
	code: async ({ request, cookies }) => {
		const userId = cookies.get('2fa_user_id');

		if (!userId) {
			return fail(401, { error: 'Unauthorized' });
		}

		const formData = await request.formData();
		const code = formData.get('code');

		const result = twoFactorChallengeSchema.safeParse({ code });

		if (!result.success) {
			return fail(400, {
				errors: result.error.flatten().fieldErrors
			});
		}

		const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);

		if (!user || !user.twoFactorSecret) {
			return fail(400, {
				errors: {
					code: ['Invalid authentication code']
				}
			});
		}

		const isValid = verifyTOTP(user.twoFactorSecret, result.data.code);

		if (!isValid) {
			return fail(400, {
				errors: {
					code: ['Invalid authentication code']
				}
			});
		}

		const session = await lucia.createSession(user.id, {
			ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
			userAgent: request.headers.get('user-agent') || 'unknown'
		});

		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '/',
			...sessionCookie.attributes
		});

		cookies.delete('2fa_user_id', { path: '/' });

		if (user.role === 'admin') {
			throw redirect(303, '/admin/dashboard');
		}

		throw redirect(303, '/user/dashboard');
	},

	recovery: async ({ request, cookies }) => {
		const userId = cookies.get('2fa_user_id');

		if (!userId) {
			return fail(401, { error: 'Unauthorized' });
		}

		const formData = await request.formData();
		const recoveryCode = formData.get('recoveryCode');

		if (!recoveryCode || typeof recoveryCode !== 'string') {
			return fail(400, {
				recoveryErrors: {
					recoveryCode: ['Recovery code is required']
				}
			});
		}

		const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);

		if (!user || !user.twoFactorRecoveryCodes) {
			return fail(400, {
				recoveryErrors: {
					recoveryCode: ['Invalid recovery code']
				}
			});
		}

		const recoveryCodes = JSON.parse(user.twoFactorRecoveryCodes) as string[];

		const isValid = verifyRecoveryCode(recoveryCodes, recoveryCode);

		if (!isValid) {
			return fail(400, {
				recoveryErrors: {
					recoveryCode: ['Invalid recovery code']
				}
			});
		}

		const updatedCodes = removeRecoveryCode(recoveryCodes, recoveryCode);

		await db
			.update(users)
			.set({ twoFactorRecoveryCodes: JSON.stringify(updatedCodes) })
			.where(eq(users.id, user.id));

		const session = await lucia.createSession(user.id, {
			ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
			userAgent: request.headers.get('user-agent') || 'unknown'
		});

		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '/',
			...sessionCookie.attributes
		});

		cookies.delete('2fa_user_id', { path: '/' });

		if (user.role === 'admin') {
			throw redirect(303, '/admin/dashboard');
		}

		throw redirect(303, '/user/dashboard');
	}
};
