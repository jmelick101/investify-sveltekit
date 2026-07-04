import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/db';
import { aiSettings } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';
import { safeQuery } from '$lib/server/db/utils';
import { logAuditEvent, AuditActions } from '$lib/server/audit';

export const load: PageServerLoad = async () => {
	const settings = await safeQuery(
		() => db.select().from(aiSettings),
		'Failed to load AI settings'
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
			{ title: 'Settings', href: '/admin/settings/ai' },
			{ title: 'AI', href: '/admin/settings/ai' }
		],
		settings: settingsMap
	};
};

export const actions: Actions = {
	updateSettings: async ({ request, locals }) => {
		const formData = await request.formData();
		const groqApiKey = formData.get('groqApiKey') as string;
		const model = formData.get('model') as string;
		const enabled = formData.get('enabled') === 'true';

		try {
			const settingsToUpdate = [
				{ key: 'groq_api_key', value: groqApiKey },
				{ key: 'model', value: model },
				{ key: 'enabled', value: enabled.toString() }
			];

			for (const setting of settingsToUpdate) {
				const [existing] = await db
					.select()
					.from(aiSettings)
					.where(eq(aiSettings.key, setting.key))
					.limit(1);

				if (existing) {
					await db
						.update(aiSettings)
						.set({ value: setting.value })
						.where(eq(aiSettings.key, setting.key));
				} else {
					await db.insert(aiSettings).values(setting);
				}
			}

			await logAuditEvent({
				userId: locals.user?.id || '',
				action: AuditActions.ADMIN_UPDATE_SETTINGS,
				resourceType: 'ai_settings',
				details: { settings: settingsToUpdate.map(s => s.key) },
				ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
				userAgent: request.headers.get('user-agent') || 'unknown'
			});

			return { success: true, message: 'AI settings updated' };
		} catch (error) {
			return fail(500, { error: 'Failed to update AI settings' });
		}
	}
};
