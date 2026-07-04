import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals }) => {
	const user = locals.user!;

	// TODO: Replace with real data - Load user's referrals
	const referredUsers = await db
		.select()
		.from(users)
		.where(eq(users.referredBy, user.id));

	return {
		referrals: referredUsers.map((u) => ({
			user: {
				id: u.id,
				name: `${u.firstName} ${u.lastName}`,
				email: u.email
			},
			plan: 'N/A', // TODO: Get from investments
			bonusEarned: 0, // TODO: Calculate from referral earnings
			date: u.createdAt.toISOString(),
			status: 'active',
			group: u.group ?? 'Pioneer',
			referralLevel: 1
		}))
	};
};
