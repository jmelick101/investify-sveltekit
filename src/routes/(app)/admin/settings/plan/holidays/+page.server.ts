import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/db';
import { holidays } from '$lib/server/db/schema';
import { desc, eq } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';
import { safeQuery } from '$lib/server/db/utils';
import { logAuditEvent, AuditActions } from '$lib/server/audit';

export const load: PageServerLoad = async () => {
	const holidaysList = await safeQuery(
		() => db.select().from(holidays).orderBy(desc(holidays.date)),
		'Failed to load holidays'
	);

	return {
		breadcrumbs: [
			{ title: 'Dashboard', href: '/admin/dashboard' },
			{ title: 'Settings', href: '/admin/settings/plan/holidays' },
			{ title: 'Holidays', href: '/admin/settings/plan/holidays' }
		],
		holidays: holidaysList
	};
};

export const actions: Actions = {
	addHoliday: async ({ request, locals }) => {
		const formData = await request.formData();
		const name = formData.get('name') as string;
		const date = formData.get('date') as string;

		if (!name || !date) {
			return fail(400, { error: 'Name and date are required' });
		}

		try {
			await db.insert(holidays).values({ name, date });

			await logAuditEvent({
				userId: locals.user?.id || '',
				action: AuditActions.ADMIN_UPDATE_SETTINGS,
				resourceType: 'holiday',
				details: { action: 'add', name, date },
				ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
				userAgent: request.headers.get('user-agent') || 'unknown'
			});

			return { success: true, message: 'Holiday added' };
		} catch (error) {
			return fail(500, { error: 'Failed to add holiday' });
		}
	},

	deleteHoliday: async ({ request, locals }) => {
		const formData = await request.formData();
		const holidayId = formData.get('holidayId') as string;

		if (!holidayId) {
			return fail(400, { error: 'Holiday ID is required' });
		}

		try {
			await db.delete(holidays).where(eq(holidays.id, holidayId));

			await logAuditEvent({
				userId: locals.user?.id || '',
				action: AuditActions.ADMIN_UPDATE_SETTINGS,
				resourceType: 'holiday',
				details: { action: 'delete', holidayId },
				ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
				userAgent: request.headers.get('user-agent') || 'unknown'
			});

			return { success: true, message: 'Holiday deleted' };
		} catch (error) {
			return fail(500, { error: 'Failed to delete holiday' });
		}
	}
};
