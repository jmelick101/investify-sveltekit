import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';
import { logAuditEvent, AuditActions } from '$lib/server/audit';

export const load: PageServerLoad = async ({ locals }) => {
	const [user] = await db
		.select({
			id: users.id,
			email: users.email,
			firstName: users.firstName,
			lastName: users.lastName,
			phone: users.phone,
			country: users.country
		})
		.from(users)
		.where(eq(users.id, locals.user!.id))
		.limit(1);

	return {
		breadcrumbs: [
			{ title: 'Dashboard', href: '/user/dashboard' },
			{ title: 'Settings', href: '/user/settings' },
			{ title: 'Profile', href: '/user/settings/profile' }
		],
		profile: user || null
	};
};

export const actions: Actions = {
	updateProfile: async ({ request, locals }) => {
		const formData = await request.formData();
		const firstName = formData.get('firstName') as string;
		const lastName = formData.get('lastName') as string;
		const phone = formData.get('phone') as string;
		const country = formData.get('country') as string;

		if (!firstName || !lastName) {
			return fail(400, { error: 'First name and last name are required' });
		}

		try {
			await db
				.update(users)
				.set({
					firstName,
					lastName,
					phone: phone || null,
					country: country || null
				})
				.where(eq(users.id, locals.user!.id));

			await logAuditEvent({
				userId: locals.user!.id,
				action: AuditActions.USER_UPDATE_PROFILE,
				resourceType: 'user',
				details: { fields: ['firstName', 'lastName', 'phone', 'country'] },
				ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
				userAgent: request.headers.get('user-agent') || 'unknown'
			});

			return { success: true, message: 'Profile updated' };
		} catch (error) {
			return fail(500, { error: 'Failed to update profile' });
		}
	}
};
