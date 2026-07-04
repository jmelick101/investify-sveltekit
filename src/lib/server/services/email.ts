import { db } from '../db';
import { passwordResetTokens, emailVerificationTokens } from '../db/schema';
import { eq } from 'drizzle-orm';
import crypto from 'crypto';
import { env } from '$env/dynamic/private';

const origin = env.ORIGIN || 'http://localhost:5173';

function hashToken(token: string): string {
	return crypto.createHash('sha256').update(token).digest('hex');
}

export async function createPasswordResetToken(userId: string): Promise<string> {
	await deletePasswordResetToken(userId);
	const token = crypto.randomBytes(32).toString('hex');
	const tokenHash = hashToken(token);
	const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 60 minutes
	await db.insert(passwordResetTokens).values({
		userId,
		tokenHash,
		expiresAt
	});
	return token;
}

export async function verifyPasswordResetToken(token: string): Promise<string | null> {
	const tokenHash = hashToken(token);
	const [record] = await db
		.select()
		.from(passwordResetTokens)
		.where(eq(passwordResetTokens.tokenHash, tokenHash));
	if (!record) return null;
	if (record.expiresAt < new Date()) {
		await deletePasswordResetToken(record.userId);
		return null;
	}
	return record.userId;
}

export async function deletePasswordResetToken(userId: string): Promise<void> {
	await db.delete(passwordResetTokens).where(eq(passwordResetTokens.userId, userId));
}

export async function sendPasswordResetEmail(email: string, token: string): Promise<void> {
	const resetUrl = `${origin}/reset-password/${token}`;
	console.log(`
=========================================
PASSWORD RESET EMAIL
To: ${email}
Link: ${resetUrl}
=========================================
`);
}

export async function createEmailVerificationToken(userId: string): Promise<string> {
	await db.delete(emailVerificationTokens).where(eq(emailVerificationTokens.userId, userId));
	const token = crypto.randomBytes(32).toString('hex');
	const tokenHash = hashToken(token);
	const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24 hours
	await db.insert(emailVerificationTokens).values({
		userId,
		tokenHash,
		expiresAt
	});
	return token;
}

export async function verifyEmailVerificationToken(token: string): Promise<string | null> {
	const tokenHash = hashToken(token);
	const [record] = await db
		.select()
		.from(emailVerificationTokens)
		.where(eq(emailVerificationTokens.tokenHash, tokenHash));
	if (!record) return null;
	if (record.expiresAt < new Date()) {
		await deleteEmailVerificationToken(record.userId);
		return null;
	}
	return record.userId;
}

export async function deleteEmailVerificationToken(userId: string): Promise<void> {
	await db.delete(emailVerificationTokens).where(eq(emailVerificationTokens.userId, userId));
}

export async function sendEmailVerificationEmail(email: string, token: string): Promise<void> {
	const verifyUrl = `${origin}/verify-email/${token}`;
	console.log(`
=========================================
EMAIL VERIFICATION EMAIL
To: ${email}
Link: ${verifyUrl}
=========================================
`);
}
