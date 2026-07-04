import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';
import { hashPassword, verifyPassword } from '$lib/server/auth/password';
import { logAuditEvent, AuditActions } from '$lib/server/audit';

export const load: PageServerLoad = async () => {
	return {
		breadcrumbs: [
			{ title: 'Dashboard', href: '/user/dashboard' },
			{ title: 'Settings', href: '/user/settings' },
			{ title: 'Password', href: '/user/settings/password' }
		]
	};
};

export const actions: Actions = {
	changePassword: async ({ request, locals }) => {
		const formData = await request.formData();
		const currentPassword = formData.get('currentPassword') as string;
		const newPassword = formData.get('newPassword') as string;
		const confirmPassword = formData.get('confirmPassword') as string;

		if (!currentPassword || !newPassword || !confirmPassword) {
			return fail(400, { error: 'All fields are required' });
		}

		if (newPassword !== confirmPassword) {
			return fail(400, { error: 'New passwords do not match' });
		}

		if (newPassword.length < 8) {
			return fail(400, { error: 'Password must be at least 8 characters' });
		}

		try {
			const [user] = await db
				.select({ id: users.id, passwordHash: users.passwordHash })
				.from(users)
				.where(eq(users.id, locals.user!.id))
				.limit(1);

			if (!user) {
				return fail(404, { error: 'User not found' });
			}

			const valid = await verifyPassword(currentPassword, user.passwordHash);
			if (!valid) {
				return fail(400, { error: 'Current password is incorrect' });
			}

			const newHash = await hashPassword(newPassword);
			await db.update(users).set({ passwordHash: newHash }).where(eq(users.id, user.id));

			await logAuditEvent({
				userId: user.id,
				action: AuditActions.USER_UPDATE_PASSWORD,
				resourceType: 'user',
				details: {},
				ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
				userAgent: request.headers.get('user-agent') || 'unknown'
			});

			return { success: true, message: 'Password changed' };
		} catch (error) {
			return fail(500, { error: 'Failed to change password' });
		}
	}
};
