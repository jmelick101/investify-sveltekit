import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/db';
import { planCategories } from '$lib/server/db/schema';
import { desc, eq } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';
import { safeQuery } from '$lib/server/db/utils';
import { logAuditEvent, AuditActions } from '$lib/server/audit';

export const load: PageServerLoad = async () => {
	const categoriesList = await safeQuery(
		() => db.select().from(planCategories).orderBy(desc(planCategories.createdAt)),
		'Failed to load plan categories'
	);

	return {
		breadcrumbs: [
			{ title: 'Dashboard', href: '/admin/dashboard' },
			{ title: 'Settings', href: '/admin/settings/plan/categories' },
			{ title: 'Categories', href: '/admin/settings/plan/categories' }
		],
		categories: categoriesList
	};
};

export const actions: Actions = {
	addCategory: async ({ request, locals }) => {
		const formData = await request.formData();
		const name = formData.get('name') as string;

		if (!name) {
			return fail(400, { error: 'Category name is required' });
		}

		try {
			await db.insert(planCategories).values({ name });

			await logAuditEvent({
				userId: locals.user?.id || '',
				action: AuditActions.ADMIN_UPDATE_SETTINGS,
				resourceType: 'plan_category',
				details: { action: 'add', name },
				ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
				userAgent: request.headers.get('user-agent') || 'unknown'
			});

			return { success: true, message: 'Category added' };
		} catch (error) {
			return fail(500, { error: 'Failed to add category' });
		}
	},

	deleteCategory: async ({ request, locals }) => {
		const formData = await request.formData();
		const categoryId = formData.get('categoryId') as string;

		if (!categoryId) {
			return fail(400, { error: 'Category ID is required' });
		}

		try {
			await db.delete(planCategories).where(eq(planCategories.id, categoryId));

			await logAuditEvent({
				userId: locals.user?.id || '',
				action: AuditActions.ADMIN_UPDATE_SETTINGS,
				resourceType: 'plan_category',
				details: { action: 'delete', categoryId },
				ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
				userAgent: request.headers.get('user-agent') || 'unknown'
			});

			return { success: true, message: 'Category deleted' };
		} catch (error) {
			return fail(500, { error: 'Failed to delete category' });
		}
	}
};
