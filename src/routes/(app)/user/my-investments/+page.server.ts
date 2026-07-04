import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/db';
import { investments, plans, payouts } from '$lib/server/db/schema';
import { eq, desc } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';
import { submitPaymentProofSchema } from '$lib/server/validation/user';
import { safeQuery } from '$lib/server/db/utils';

export const load: PageServerLoad = async ({ locals }) => {
	const user = locals.user!;

	const userInvestments = await safeQuery(
		() =>
			db
				.select({
					id: investments.id,
					amount: investments.amount,
					status: investments.status,
					profitAccrued: investments.profitAccrued,
					totalExpectedProfit: investments.totalExpectedProfit,
					startDate: investments.startDate,
					endDate: investments.endDate,
					payoutOption: investments.payoutOption,
					planName: plans.name,
					planCategory: plans.category,
					planDuration: plans.durationDays,
					planPercent: plans.percentMin
				})
				.from(investments)
				.leftJoin(plans, eq(investments.planId, plans.id))
				.where(eq(investments.userId, user.id))
				.orderBy(desc(investments.createdAt)),
		'Failed to load investments'
	);

	return {
		breadcrumbs: [
			{ title: 'Dashboard', href: '/user/dashboard' },
			{ title: 'My Investments', href: '/user/my-investments' }
		],
		investments: userInvestments
	};
};

export const actions: Actions = {
	submitPaymentProof: async ({ request, locals }) => {
		const user = locals.user!;
		const formData = await request.formData();
		const data = Object.fromEntries(formData);

		const result = submitPaymentProofSchema.safeParse({
			...data,
			cryptoAmount: Number(data.cryptoAmount)
		});

		if (!result.success) {
			return fail(400, {
				errors: result.error.flatten().fieldErrors,
				data
			});
		}

		const { investmentId, transactionHash, cryptoAmount } = result.data;

		// Verify investment exists and belongs to user
		const [investment] = await db
			.select()
			.from(investments)
			.where(eq(investments.id, investmentId))
			.limit(1);

		if (!investment || investment.userId !== user.id) {
			return fail(404, {
				error: 'Investment not found'
			});
		}

		// Only allow payment proof for pending investments
		if (investment.status !== 'pending') {
			return fail(400, {
				error: 'Can only submit payment proof for pending investments'
			});
		}

		// Update investment with payment proof
		await db
			.update(investments)
			.set({
				transactionHash,
				cryptoAmount: cryptoAmount.toString(),
				updatedAt: new Date()
			})
			.where(eq(investments.id, investmentId));

		return {
			success: true,
			message: 'Payment proof submitted successfully. Awaiting admin verification.'
		};
	}
};
