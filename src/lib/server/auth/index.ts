import { Lucia } from 'lucia';
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { db } from '../db';
import { sessions, users } from '../db/schema';
import { dev } from '$app/environment';

const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: !dev
		}
	},
	getUserAttributes: (attributes) => {
		return {
			id: attributes.id,
			email: attributes.email,
			firstName: attributes.firstName,
			lastName: attributes.lastName,
			role: attributes.role,
			emailVerifiedAt: attributes.emailVerifiedAt,
			avatarPath: attributes.avatarPath,
			walletBalance: attributes.walletBalance,
			tokenBalance: attributes.tokenBalance,
			group: attributes.group,
			referralCode: attributes.referralCode,
			kycStatus: attributes.kycStatus,
			twoFactorConfirmedAt: attributes.twoFactorConfirmedAt
		};
	}
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	id: string;
	email: string;
	firstName: string | null;
	lastName: string | null;
	role: string;
	emailVerifiedAt: Date | null;
	avatarPath: string | null;
	walletBalance: string;
	tokenBalance: string;
	group: string | null;
	referralCode: string | null;
	kycStatus: string;
	twoFactorConfirmedAt: Date | null;
}
