import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/db';
import { siteSettings } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';
import { safeQuery } from '$lib/server/db/utils';
import { logAuditEvent, AuditActions } from '$lib/server/audit';

export const load: PageServerLoad = async () => {
	const settings = await safeQuery(
		() => db.select().from(siteSettings),
		'Failed to load website settings'
	);

	const settingsMap = (settings || []).reduce(
		(acc, setting) => {
			acc[setting.key] = setting.value;
			return acc;
		},
		{} as Record<string, string | null>
	);

	return {
		breadcrumbs: [
			{ title: 'Dashboard', href: '/admin/dashboard' },
			{ title: 'Settings', href: '/admin/settings/website' },
			{ title: 'Website', href: '/admin/settings/website' }
		],
		settings: settingsMap
	};
};

export const actions: Actions = {
	updateSettings: async ({ request, locals }) => {
		const formData = await request.formData();
		const siteName = formData.get('siteName') as string;
		const siteDescription = formData.get('siteDescription') as string;
		const contactEmail = formData.get('contactEmail') as string;
		const contactPhone = formData.get('contactPhone') as string;
		const address = formData.get('address') as string;

		try {
			// Upsert each setting
			const settingsToUpdate = [
				{ key: 'site_name', value: siteName },
				{ key: 'site_description', value: siteDescription },
				{ key: 'site_email', value: contactEmail },
				{ key: 'site_phone', value: contactPhone },
				{ key: 'site_address', value: address }
			];

			for (const setting of settingsToUpdate) {
				const [existing] = await db
					.select()
					.from(siteSettings)
					.where(eq(siteSettings.key, setting.key))
					.limit(1);

				if (existing) {
					await db
						.update(siteSettings)
						.set({ value: setting.value })
						.where(eq(siteSettings.key, setting.key));
				} else {
					await db.insert(siteSettings).values(setting);
				}
			}

			// Log audit event
			await logAuditEvent({
				userId: locals.user?.id || '',
				action: AuditActions.ADMIN_UPDATE_SETTINGS,
				resourceType: 'site_settings',
				details: { settings: settingsToUpdate.map(s => s.key) },
				ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
				userAgent: request.headers.get('user-agent') || 'unknown'
			});

			return { success: true, message: 'Website settings updated' };
		} catch (error) {
			return fail(500, { error: 'Failed to update settings' });
		}
	}
};
