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
		'Failed to load platform settings'
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
			{ title: 'Settings', href: '/admin/settings/platform' },
			{ title: 'Platform', href: '/admin/settings/platform' }
		],
		settings: settingsMap
	};
};

export const actions: Actions = {
	updateSettings: async ({ request, locals }) => {
		const formData = await request.formData();
		const tokenMultiplier = formData.get('tokenMultiplier') as string;
		const minWithdrawal = formData.get('minWithdrawal') as string;
		const maxWithdrawal = formData.get('maxWithdrawal') as string;
		const referralBonus = formData.get('referralBonus') as string;

		try {
			const settingsToUpdate = [
				{ key: 'token_multiplier', value: tokenMultiplier },
				{ key: 'min_withdrawal', value: minWithdrawal },
				{ key: 'max_withdrawal', value: maxWithdrawal },
				{ key: 'referral_bonus', value: referralBonus }
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

			await logAuditEvent({
				userId: locals.user?.id || '',
				action: AuditActions.ADMIN_UPDATE_SETTINGS,
				resourceType: 'platform_settings',
				details: { settings: settingsToUpdate.map(s => s.key) },
				ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
				userAgent: request.headers.get('user-agent') || 'unknown'
			});

			return { success: true, message: 'Platform settings updated' };
		} catch (error) {
			return fail(500, { error: 'Failed to update settings' });
		}
	}
};
