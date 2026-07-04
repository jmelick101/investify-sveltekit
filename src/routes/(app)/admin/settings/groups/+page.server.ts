import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/db';
import { userGroups } from '$lib/server/db/schema';
import { desc, eq } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';
import { safeQuery } from '$lib/server/db/utils';
import { logAuditEvent, AuditActions } from '$lib/server/audit';

export const load: PageServerLoad = async () => {
	const groupsList = await safeQuery(
		() => db.select().from(userGroups).orderBy(desc(userGroups.tokenThreshold)),
		'Failed to load user groups'
	);

	return {
		breadcrumbs: [
			{ title: 'Dashboard', href: '/admin/dashboard' },
			{ title: 'Settings', href: '/admin/settings/groups' },
			{ title: 'User Groups', href: '/admin/settings/groups' }
		],
		groups: groupsList
	};
};

export const actions: Actions = {
	addGroup: async ({ request, locals }) => {
		const formData = await request.formData();
		const name = formData.get('name') as string;
		const tokenThreshold = formData.get('tokenThreshold') as string;
		const description = formData.get('description') as string;

		if (!name || !tokenThreshold) {
			return fail(400, { error: 'Name and token threshold are required' });
		}

		try {
			await db.insert(userGroups).values({
				name,
				tokenThreshold,
				description: description || null
			});

			await logAuditEvent({
				userId: locals.user?.id || '',
				action: AuditActions.ADMIN_UPDATE_SETTINGS,
				resourceType: 'user_group',
				details: { action: 'add', name, tokenThreshold },
				ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
				userAgent: request.headers.get('user-agent') || 'unknown'
			});

			return { success: true, message: 'Group added' };
		} catch (error) {
			return fail(500, { error: 'Failed to add group' });
		}
	},

	deleteGroup: async ({ request, locals }) => {
		const formData = await request.formData();
		const groupId = formData.get('groupId') as string;

		if (!groupId) {
			return fail(400, { error: 'Group ID is required' });
		}

		try {
			await db.delete(userGroups).where(eq(userGroups.id, groupId));

			await logAuditEvent({
				userId: locals.user?.id || '',
				action: AuditActions.ADMIN_UPDATE_SETTINGS,
				resourceType: 'user_group',
				details: { action: 'delete', groupId },
				ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
				userAgent: request.headers.get('user-agent') || 'unknown'
			});

			return { success: true, message: 'Group deleted' };
		} catch (error) {
			return fail(500, { error: 'Failed to delete group' });
		}
	}
};
