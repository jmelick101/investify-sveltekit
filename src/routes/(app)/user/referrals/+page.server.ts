import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { users, investments, referrals, plans, siteSettings } from '$lib/server/db/schema';
import { eq, desc, sql } from 'drizzle-orm';
import { safeQuery } from '$lib/server/db/utils';

export const load: PageServerLoad = async ({ locals }) => {
	const user = locals.user!;

	const referralBonusSetting = await safeQuery(
		() => db.select().from(siteSettings).where(eq(siteSettings.key, 'referral_bonus')).limit(1),
		'Failed to load referral bonus setting'
	);
	const referralBonusPercent = Number(referralBonusSetting?.[0]?.value || '10') / 100;

	const referredUsers = await safeQuery(
		() =>
			db
				.select({
					id: users.id,
					firstName: users.firstName,
					lastName: users.lastName,
					email: users.email,
					createdAt: users.createdAt,
					group: users.group,
					totalInvested: sql<string>`COALESCE(SUM(${investments.amount}::numeric), 0)`,
					investmentCount: sql<number>`COUNT(${investments.id})`
				})
				.from(users)
				.leftJoin(investments, eq(users.referredBy, user.id))
				.where(eq(users.referredBy, user.id))
				.groupBy(users.id, users.firstName, users.lastName, users.email, users.createdAt, users.group)
				.orderBy(desc(users.createdAt)),
		'Failed to load referrals'
	);

	const referralStats = await safeQuery(
		() =>
			db
				.select({
					totalReferrals: sql<number>`COUNT(*)`,
					totalEarnings: sql<string>`COALESCE(SUM(${referrals.bonusEarned}), 0)`
				})
				.from(referrals)
				.where(eq(referrals.referrerId, user.id)),
		'Failed to load referral stats'
	);
	const stats = referralStats?.[0];

	return {
		breadcrumbs: [
			{ title: 'Dashboard', href: '/user/dashboard' },
			{ title: 'Referrals', href: '/user/referrals' }
		],
		referralCode: user.referralCode,
		referralStats: {
			totalReferrals: stats?.totalReferrals || 0,
			totalEarnings: Number(stats?.totalEarnings || 0)
		},
		referralBonusPercent: referralBonusPercent * 100,
		referrals: referredUsers.map((u) => ({
			user: {
				id: u.id,
				name: `${u.firstName} ${u.lastName}`,
				email: u.email
			},
			plan: 'Active',
			bonusEarned: Number(u.totalInvested) * referralBonusPercent,
			date: u.createdAt?.toISOString() || new Date().toISOString(),
			status: 'active',
			group: u.group ?? 'Pioneer',
			referralLevel: 1
		}))
	};
};
