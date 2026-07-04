import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/db';
import { payoutOptions } from '$lib/server/db/schema';
import { desc, eq } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';
import { safeQuery } from '$lib/server/db/utils';
import { logAuditEvent, AuditActions } from '$lib/server/audit';

export const load: PageServerLoad = async () => {
	const optionsList = await safeQuery(
		() => db.select().from(payoutOptions).orderBy(desc(payoutOptions.createdAt)),
		'Failed to load payout options'
	);

	return {
		breadcrumbs: [
			{ title: 'Dashboard', href: '/admin/dashboard' },
			{ title: 'Settings', href: '/admin/settings/plan/payout-options' },
			{ title: 'Payout Options', href: '/admin/settings/plan/payout-options' }
		],
		options: optionsList
	};
};

export const actions: Actions = {
	addOption: async ({ request, locals }) => {
		const formData = await request.formData();
		const name = formData.get('name') as string;

		if (!name) {
			return fail(400, { error: 'Option name is required' });
		}

		try {
			await db.insert(payoutOptions).values({ name });

			await logAuditEvent({
				userId: locals.user?.id || '',
				action: AuditActions.ADMIN_UPDATE_SETTINGS,
				resourceType: 'payout_option',
				details: { action: 'add', name },
				ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
				userAgent: request.headers.get('user-agent') || 'unknown'
			});

			return { success: true, message: 'Option added' };
		} catch (error) {
			return fail(500, { error: 'Failed to add option' });
		}
	},

	deleteOption: async ({ request, locals }) => {
		const formData = await request.formData();
		const optionId = formData.get('optionId') as string;

		if (!optionId) {
			return fail(400, { error: 'Option ID is required' });
		}

		try {
			await db.delete(payoutOptions).where(eq(payoutOptions.id, optionId));

			await logAuditEvent({
				userId: locals.user?.id || '',
				action: AuditActions.ADMIN_UPDATE_SETTINGS,
				resourceType: 'payout_option',
				details: { action: 'delete', optionId },
				ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
				userAgent: request.headers.get('user-agent') || 'unknown'
			});

			return { success: true, message: 'Option deleted' };
		} catch (error) {
			return fail(500, { error: 'Failed to delete option' });
		}
	}
};
