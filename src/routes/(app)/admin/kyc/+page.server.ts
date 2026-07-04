import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/db';
import { kycDocuments, users } from '$lib/server/db/schema';
import { desc, eq } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';
import { safeQuery } from '$lib/server/db/utils';
import { logAuditEvent, AuditActions } from '$lib/server/audit';
import { sendKycApprovalEmail, sendKycRejectionEmail } from '$lib/server/email';

export const load: PageServerLoad = async () => {
	const kycList = await safeQuery(
		() =>
			db
				.select({
					id: kycDocuments.id,
					documentType: kycDocuments.documentType,
					filePath: kycDocuments.filePath,
					status: kycDocuments.status,
					notes: kycDocuments.notes,
					createdAt: kycDocuments.createdAt,
					updatedAt: kycDocuments.updatedAt,
					user: {
						id: users.id,
						firstName: users.firstName,
						lastName: users.lastName,
						email: users.email,
						kycStatus: users.kycStatus
					}
				})
				.from(kycDocuments)
				.leftJoin(users, eq(kycDocuments.userId, users.id))
				.orderBy(desc(kycDocuments.createdAt))
				.limit(50),
		'Failed to load KYC documents'
	);

	return {
		breadcrumbs: [
			{ title: 'Dashboard', href: '/admin/dashboard' },
			{ title: 'KYC Verification', href: '/admin/kyc' }
		],
		kycDocuments: kycList
	};
};

export const actions: Actions = {
	approve: async ({ request, locals }) => {
		const formData = await request.formData();
		const documentId = formData.get('documentId');
		const userId = formData.get('userId');

		if (!documentId || !userId) {
			return fail(400, { error: 'Document ID and User ID are required' });
		}

		// Verify document exists
		const [document] = await db
			.select()
			.from(kycDocuments)
			.where(eq(kycDocuments.id, documentId as string))
			.limit(1);

		if (!document) {
			return fail(404, { error: 'KYC document not found' });
		}

		try {
			// Update KYC document status
			await db
				.update(kycDocuments)
				.set({
					status: 'approved',
					updatedAt: new Date()
				})
				.where(eq(kycDocuments.id, documentId as string));

			// Update user KYC status
			await db
				.update(users)
				.set({
					kycStatus: 'approved',
					updatedAt: new Date()
				})
				.where(eq(users.id, userId as string));

			// Get user email for notification
			const [user] = await db
				.select({ email: users.email })
				.from(users)
				.where(eq(users.id, userId as string))
				.limit(1);

			if (user) {
				await sendKycApprovalEmail(user.email);
			}

			// Log audit event
			await logAuditEvent({
				userId: locals.user?.id || '',
				action: AuditActions.ADMIN_APPROVE_KYC,
				resourceType: 'kyc_document',
				resourceId: documentId as string,
				details: { userId: userId as string, documentType: document.documentType },
				ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
				userAgent: request.headers.get('user-agent') || 'unknown'
			});

			return { success: true, message: 'KYC approved' };
		} catch (error) {
			return fail(500, { error: 'Failed to approve KYC' });
		}
	},

	reject: async ({ request, locals }) => {
		const formData = await request.formData();
		const documentId = formData.get('documentId');
		const userId = formData.get('userId');
		const notes = formData.get('notes');

		if (!documentId || !userId) {
			return fail(400, { error: 'Document ID and User ID are required' });
		}

		// Verify document exists
		const [document] = await db
			.select()
			.from(kycDocuments)
			.where(eq(kycDocuments.id, documentId as string))
			.limit(1);

		if (!document) {
			return fail(404, { error: 'KYC document not found' });
		}

		try {
			// Update KYC document status
			await db
				.update(kycDocuments)
				.set({
					status: 'rejected',
					notes: notes?.toString(),
					updatedAt: new Date()
				})
				.where(eq(kycDocuments.id, documentId as string));

			// Update user KYC status
			await db
				.update(users)
				.set({
					kycStatus: 'rejected',
					updatedAt: new Date()
				})
				.where(eq(users.id, userId as string));

			// Get user email for notification
			const [user] = await db
				.select({ email: users.email })
				.from(users)
				.where(eq(users.id, userId as string))
				.limit(1);

			if (user) {
				await sendKycRejectionEmail(user.email, notes?.toString());
			}

			// Log audit event
			await logAuditEvent({
				userId: locals.user?.id || '',
				action: AuditActions.ADMIN_REJECT_KYC,
				resourceType: 'kyc_document',
				resourceId: documentId as string,
				details: { userId: userId as string, notes: notes?.toString() },
				ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
				userAgent: request.headers.get('user-agent') || 'unknown'
			});

			return { success: true, message: 'KYC rejected' };
		} catch (error) {
			return fail(500, { error: 'Failed to reject KYC' });
		}
	}
};
