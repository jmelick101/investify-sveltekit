import { db } from './db';
import { auditLogs } from './db/schema';
import { sql, desc, eq } from 'drizzle-orm';

export interface AuditLogEntry {
	userId: string;
	action: string;
	resourceType: string;
	resourceId?: string;
	details?: Record<string, unknown>;
	ipAddress?: string;
	userAgent?: string;
}

/**
 * Log an audit event
 * @param entry The audit log entry
 */
export async function logAuditEvent(entry: AuditLogEntry): Promise<void> {
	try {
		await db.insert(auditLogs).values({
			userId: entry.userId,
			action: entry.action,
			resourceType: entry.resourceType,
			resourceId: entry.resourceId || null,
			details: entry.details || {},
			ipAddress: entry.ipAddress || null,
			userAgent: entry.userAgent || null
		});
	} catch (error) {
		// Don't let audit logging failures break the main operation
		console.error('Failed to log audit event:', error);
	}
}

/**
 * Common audit actions
 */
export const AuditActions = {
	// User management
	USER_LOGIN: 'user.login',
	USER_LOGOUT: 'user.logout',
	USER_REGISTER: 'user.register',
	USER_UPDATE_PROFILE: 'user.update_profile',
	USER_CHANGE_PASSWORD: 'user.change_password',
	USER_ENABLE_2FA: 'user.enable_2fa',
	USER_DISABLE_2FA: 'user.disable_2fa',

	// Investment actions
	INVESTMENT_CREATE: 'investment.create',
	INVESTMENT_APPROVE: 'investment.approve',
	INVESTMENT_REJECT: 'investment.reject',
	INVESTMENT_COMPLETE: 'investment.complete',
	INVESTMENT_SUBMIT_PAYMENT: 'investment.submit_payment',

	// Withdrawal actions
	WITHDRAWAL_CREATE: 'withdrawal.create',
	WITHDRAWAL_APPROVE: 'withdrawal.approve',
	WITHDRAWAL_REJECT: 'withdrawal.reject',
	WITHDRAWAL_CANCEL: 'withdrawal.cancel',

	// Wallet actions
	WALLET_ADD: 'wallet.add',
	WALLET_UPDATE: 'wallet.update',
	WALLET_DELETE: 'wallet.delete',

	// Admin actions
	ADMIN_UPDATE_USER: 'admin.update_user',
	ADMIN_UPDATE_BALANCE: 'admin.update_balance',
	ADMIN_APPROVE_KYC: 'admin.approve_kyc',
	ADMIN_REJECT_KYC: 'admin.reject_kyc',
	ADMIN_CREATE_PLAN: 'admin.create_plan',
	ADMIN_UPDATE_PLAN: 'admin.update_plan',
	ADMIN_DELETE_PLAN: 'admin.delete_plan',
	ADMIN_CREATE_BLOG: 'admin.create_blog',
	ADMIN_UPDATE_BLOG: 'admin.update_blog',
	ADMIN_DELETE_BLOG: 'admin.delete_blog',
	ADMIN_CREATE_SURVEY: 'admin.create_survey',
	ADMIN_UPDATE_SURVEY: 'admin.update_survey',
	ADMIN_UPDATE_SETTINGS: 'admin.update_settings',

	// Survey actions
	SURVEY_SUBMIT_RESPONSE: 'survey.submit_response'
} as const;

/**
 * Get audit logs for a user
 * @param userId User ID to get logs for
 * @param limit Number of logs to retrieve
 */
export async function getUserAuditLogs(userId: string, limit = 50) {
	try {
		return await db
			.select()
			.from(auditLogs)
			.where(eq(auditLogs.userId, userId))
			.orderBy(desc(auditLogs.createdAt))
			.limit(limit);
	} catch (error) {
		console.error('Failed to get audit logs:', error);
		return [];
	}
}

/**
 * Get all audit logs (admin only)
 * @param limit Number of logs to retrieve
 * @param offset Offset for pagination
 */
export async function getAllAuditLogs(limit = 100, offset = 0) {
	try {
		return await db
			.select()
			.from(auditLogs)
			.orderBy(desc(auditLogs.createdAt))
			.limit(limit)
			.offset(offset);
	} catch (error) {
		console.error('Failed to get audit logs:', error);
		return [];
	}
}
