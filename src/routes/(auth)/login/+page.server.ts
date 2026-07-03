import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { verifyPassword } from '$lib/server/auth/password';
import { loginSchema } from '$lib/server/validation/auth';
import { lucia } from '$lib/server/auth';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		if (event.locals.user.role === 'admin') {
			throw redirect(302, '/admin/dashboard');
		} else {
			throw redirect(302, '/user/dashboard');
		}
	}
	return {};
};

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const email = formData.get('email');
		const password = formData.get('password');

		const result = loginSchema.safeParse({ email, password });
		if (!result.success) {
			const errors = result.error.flatten().fieldErrors;
			return fail(400, {
				errors: {
					email: errors.email?.[0] || null,
					password: errors.password?.[0] || null
				},
				data: { email: String(email || '') }
			});
		}

		// Find user in database
		const [user] = await db.select().from(users).where(eq(users.email, result.data.email));

		if (!user) {
			return fail(400, {
				errors: {
					email: 'Invalid email or password',
					password: null
				},
				data: { email: result.data.email }
			});
		}

		// Verify password
		const validPassword = await verifyPassword(result.data.password, user.passwordHash);
		if (!validPassword) {
			return fail(400, {
				errors: {
					email: 'Invalid email or password',
					password: null
				},
				data: { email: result.data.email }
			});
		}

		// Check if 2FA is enabled (check if user.twoFactorConfirmedAt is not null and user.twoFactorSecret exists)
		if (user.twoFactorConfirmedAt && user.twoFactorSecret) {
			event.cookies.set('2fa_user_id', user.id, {
				path: '/',
				httpOnly: true,
				secure: !import.meta.env.DEV,
				sameSite: 'lax',
				maxAge: 60 * 10 // 10 minutes
			});
			throw redirect(302, '/two-factor-challenge');
		}

		// Create session
		const session = await lucia.createSession(user.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);

		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '/',
			...sessionCookie.attributes
		});

		if (user.role === 'admin') {
			throw redirect(302, '/admin/dashboard');
		} else {
			throw redirect(302, '/user/dashboard');
		}
	}
};
