import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/db';
import { platformWallets } from '$lib/server/db/schema';
import { desc, eq } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';
import { safeQuery } from '$lib/server/db/utils';
import { logAuditEvent, AuditActions } from '$lib/server/audit';

export const load: PageServerLoad = async () => {
	const walletsList = await safeQuery(
		() => db.select().from(platformWallets).orderBy(desc(platformWallets.createdAt)),
		'Failed to load platform wallets'
	);

	return {
		breadcrumbs: [
			{ title: 'Dashboard', href: '/admin/dashboard' },
			{ title: 'Settings', href: '/admin/settings/wallets' },
			{ title: 'Wallets', href: '/admin/settings/wallets' }
		],
		wallets: walletsList
	};
};

export const actions: Actions = {
	addWallet: async ({ request, locals }) => {
		const formData = await request.formData();
		const cryptocurrency = formData.get('cryptocurrency') as string;
		const name = formData.get('name') as string;
		const address = formData.get('address') as string;

		if (!cryptocurrency || !name || !address) {
			return fail(400, { error: 'All fields are required' });
		}

		try {
			await db.insert(platformWallets).values({
				cryptocurrency,
				name,
				address,
				isActive: true
			});

			await logAuditEvent({
				userId: locals.user?.id || '',
				action: AuditActions.ADMIN_UPDATE_SETTINGS,
				resourceType: 'platform_wallet',
				details: { action: 'add', cryptocurrency, name },
				ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
				userAgent: request.headers.get('user-agent') || 'unknown'
			});

			return { success: true, message: 'Wallet added' };
		} catch (error) {
			return fail(500, { error: 'Failed to add wallet' });
		}
	},

	deleteWallet: async ({ request, locals }) => {
		const formData = await request.formData();
		const walletId = formData.get('walletId') as string;

		if (!walletId) {
			return fail(400, { error: 'Wallet ID is required' });
		}

		try {
			await db.delete(platformWallets).where(eq(platformWallets.id, walletId));

			await logAuditEvent({
				userId: locals.user?.id || '',
				action: AuditActions.ADMIN_UPDATE_SETTINGS,
				resourceType: 'platform_wallet',
				details: { action: 'delete', walletId },
				ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
				userAgent: request.headers.get('user-agent') || 'unknown'
			});

			return { success: true, message: 'Wallet deleted' };
		} catch (error) {
			return fail(500, { error: 'Failed to delete wallet' });
		}
	}
};
