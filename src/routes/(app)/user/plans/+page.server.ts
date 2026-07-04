import type { Actions } from './$types';
import { db } from '$lib/server/db';
import { plans, investments, users } from '$lib/server/db/schema';
import { eq, and } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';
import { buyPlanSchema } from '$lib/server/validation/user';
import { withTransaction } from '$lib/server/db/utils';

export const actions: Actions = {
	buyPlan: async ({ request, locals }) => {
		const user = locals.user!;
		const formData = await request.formData();
		const data = Object.fromEntries(formData);

		const result = buyPlanSchema.safeParse({
			...data,
			amount: Number(data.amount)
		});

		if (!result.success) {
			return fail(400, {
				errors: result.error.flatten().fieldErrors,
				data
			});
		}

		const { planId, amount, paymentMethod, cryptoSymbol, payoutOption } = result.data;

		return await withTransaction(async (tx) => {
			const [plan] = await tx
				.select()
				.from(plans)
				.where(and(eq(plans.id, planId), eq(plans.status, 'active')))
				.limit(1);

			if (!plan) {
				return fail(404, { error: 'Plan not found or inactive' });
			}

			if (amount < Number(plan.minAmount) || amount > Number(plan.maxAmount)) {
				return fail(400, {
					error: `Amount must be between £${plan.minAmount} and £${plan.maxAmount}`
				});
			}

			const availablePayouts = plan.payoutOptions as string[];
			if (!availablePayouts.includes(payoutOption)) {
				return fail(400, {
					error: `Payout option not available for this plan. Available: ${availablePayouts.join(', ')}`
				});
			}

			const avgPercent = (Number(plan.percentMin) + Number(plan.percentMax)) / 2;
			const totalExpectedProfit = (amount * avgPercent * plan.durationDays) / 100;

			const [investment] = await tx
				.insert(investments)
				.values({
					userId: user.id,
					planId,
					amount: amount.toString(),
					paymentMethod,
					cryptoSymbol: cryptoSymbol || null,
					payoutOption,
					status: 'pending',
					totalExpectedProfit: totalExpectedProfit.toString(),
					startDate: null,
					endDate: null
				})
				.returning();

			if (paymentMethod === 'wallet_balance') {
				const [currentUser] = await tx
					.select({ walletBalance: users.walletBalance })
					.from(users)
					.where(eq(users.id, user.id))
					.limit(1);

				const currentBalance = Number(currentUser?.walletBalance || 0);
				if (currentBalance < amount) {
					return fail(400, { error: 'Insufficient wallet balance' });
				}

				await tx
					.update(users)
					.set({
						walletBalance: (currentBalance - amount).toString(),
						updatedAt: new Date()
					})
					.where(eq(users.id, user.id));
			}

			return {
				success: true,
				message: 'Investment created successfully. Awaiting admin approval.',
				investmentId: investment.id
			};
		}, 'Failed to create investment');
	}
};
