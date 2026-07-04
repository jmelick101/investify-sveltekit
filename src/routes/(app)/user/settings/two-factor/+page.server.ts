import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';
import { generateTwoFactorSecret, generateQRCode, generateBackupCodes } from '$lib/server/auth/two-factor';
import { logAuditEvent, AuditActions } from '$lib/server/audit';

export const load: PageServerLoad = async ({ locals }) => {
	const [user] = await db
		.select({ id: users.id, twoFactorEnabled: users.twoFactorEnabled })
		.from(users)
		.where(eq(users.id, locals.user!.id))
		.limit(1);

	return {
		breadcrumbs: [
			{ title: 'Dashboard', href: '/user/dashboard' },
			{ title: 'Settings', href: '/user/settings' },
			{ title: 'Two-Factor', href: '/user/settings/two-factor' }
		],
		twoFactorEnabled: user?.twoFactorEnabled || false
	};
};

export const actions: Actions = {
	enableTwoFactor: async ({ locals }) => {
		try {
			const [user] = await db
				.select({ id: users.id, email: users.email })
				.from(users)
				.where(eq(users.id, locals.user!.id))
				.limit(1);

			if (!user) {
				return fail(404, { error: 'User not found' });
			}

			const secret = await generateTwoFactorSecret(user.email);
			const qrCode = await generateQRCode(secret.otpauthUrl);
			const backupCodes = await generateBackupCodes(user.id);

			return {
				success: true,
				secret: secret.base32,
				qrCode,
				backupCodes: backupCodes.codes
			};
		} catch (error) {
			return fail(500, { error: 'Failed to enable 2FA' });
		}
	},

	confirmTwoFactor: async ({ request, locals }) => {
		const formData = await request.formData();
		const code = formData.get('code') as string;

		if (!code) {
			return fail(400, { error: 'Code is required' });
		}

		try {
			await db
				.update(users)
				.set({ twoFactorEnabled: true })
				.where(eq(users.id, locals.user!.id));

			await logAuditEvent({
				userId: locals.user!.id,
				action: AuditActions.USER_ENABLE_2FA,
				resourceType: 'user',
				details: {},
				ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
				userAgent: request.headers.get('user-agent') || 'unknown'
			});

			return { success: true, message: '2FA enabled' };
		} catch (error) {
			return fail(500, { error: 'Failed to confirm 2FA' });
		}
	},

	disableTwoFactor: async ({ locals }) => {
		try {
			await db
				.update(users)
				.set({ twoFactorEnabled: false })
				.where(eq(users.id, locals.user!.id));

			await logAuditEvent({
				userId: locals.user!.id,
				action: AuditActions.USER_DISABLE_2FA,
				resourceType: 'user',
				details: {},
				ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
				userAgent: request.headers.get('user-agent') || 'unknown'
			});

			return { success: true, message: '2FA disabled' };
		} catch (error) {
			return fail(500, { error: 'Failed to disable 2FA' });
		}
	}
};
