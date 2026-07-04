import { db } from './db';
import { sql } from 'drizzle-orm';

// Audit log table (created dynamically if not exists)
const auditLogTable = sql`
	CREATE TABLE IF NOT EXISTS audit_logs (
		id SERIAL PRIMARY KEY,
		user_id UUID REFERENCES users(id),
		action VARCHAR(100) NOT NULL,
		resource_type VARCHAR(50) NOT NULL,
		resource_id VARCHAR(255),
		details JSONB,
		ip_address VARCHAR(45),
		user_agent TEXT,
		created_at TIMESTAMP DEFAULT NOW()
	)
`;

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
 * Initialize audit log table
 */
export async function initAuditLog(): Promise<void> {
	try {
		await db.execute(auditLogTable);
		console.log('✅ Audit log table initialized');
	} catch (error) {
		console.error('Failed to initialize audit log table:', error);
	}
}

/**
 * Log an audit event
 * @param entry The audit log entry
 */
export async function logAuditEvent(entry: AuditLogEntry): Promise<void> {
	try {
		await db.execute(sql`
			INSERT INTO audit_logs (user_id, action, resource_type, resource_id, details, ip_address, user_agent)
			VALUES (${entry.userId}, ${entry.action}, ${entry.resourceType}, ${entry.resourceId || null}, ${JSON.stringify(entry.details || {})}, ${entry.ipAddress || null}, ${entry.userAgent || null})
		`);
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
export async function getUserAuditLogs(userId: string, limit = 50): Promise<AuditLogEntry[]> {
	try {
		const result = await db.execute(sql`
			SELECT * FROM audit_logs
			WHERE user_id = ${userId}
			ORDER BY created_at DESC
			LIMIT ${limit}
		`);
		return (result as any).rows || [];
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
export async function getAllAuditLogs(limit = 100, offset = 0): Promise<AuditLogEntry[]> {
	try {
		const result = await db.execute(sql`
			SELECT * FROM audit_logs
			ORDER BY created_at DESC
			LIMIT ${limit} OFFSET ${offset}
		`);
		return (result as any).rows || [];
	} catch (error) {
		console.error('Failed to get audit logs:', error);
		return [];
	}
}
