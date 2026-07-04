import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/db';
import { planFeatures } from '$lib/server/db/schema';
import { desc, eq } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';
import { safeQuery } from '$lib/server/db/utils';
import { logAuditEvent, AuditActions } from '$lib/server/audit';

export const load: PageServerLoad = async () => {
	const featuresList = await safeQuery(
		() => db.select().from(planFeatures).orderBy(desc(planFeatures.createdAt)),
		'Failed to load plan features'
	);

	return {
		breadcrumbs: [
			{ title: 'Dashboard', href: '/admin/dashboard' },
			{ title: 'Settings', href: '/admin/settings/plan/features' },
			{ title: 'Features', href: '/admin/settings/plan/features' }
		],
		features: featuresList
	};
};

export const actions: Actions = {
	addFeature: async ({ request, locals }) => {
		const formData = await request.formData();
		const name = formData.get('name') as string;
		const description = formData.get('description') as string;

		if (!name) {
			return fail(400, { error: 'Feature name is required' });
		}

		try {
			await db.insert(planFeatures).values({ name, description: description || null });

			await logAuditEvent({
				userId: locals.user?.id || '',
				action: AuditActions.ADMIN_UPDATE_SETTINGS,
				resourceType: 'plan_feature',
				details: { action: 'add', name },
				ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
				userAgent: request.headers.get('user-agent') || 'unknown'
			});

			return { success: true, message: 'Feature added' };
		} catch (error) {
			return fail(500, { error: 'Failed to add feature' });
		}
	},

	deleteFeature: async ({ request, locals }) => {
		const formData = await request.formData();
		const featureId = formData.get('featureId') as string;

		if (!featureId) {
			return fail(400, { error: 'Feature ID is required' });
		}

		try {
			await db.delete(planFeatures).where(eq(planFeatures.id, featureId));

			await logAuditEvent({
				userId: locals.user?.id || '',
				action: AuditActions.ADMIN_UPDATE_SETTINGS,
				resourceType: 'plan_feature',
				details: { action: 'delete', featureId },
				ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
				userAgent: request.headers.get('user-agent') || 'unknown'
			});

			return { success: true, message: 'Feature deleted' };
		} catch (error) {
			return fail(500, { error: 'Failed to delete feature' });
		}
	}
};
