import { z } from 'zod';

// Buy plan schema
export const buyPlanSchema = z.object({
	planId: z.string().uuid('Invalid plan ID'),
	amount: z.number().min(500, 'Minimum investment is £500').max(100000, 'Maximum investment is £100,000'),
	paymentMethod: z.enum(['crypto', 'wallet_balance']),
	cryptoSymbol: z.string().optional(),
	payoutOption: z.enum(['Daily', 'Weekly', 'Monthly'])
});

// Create withdrawal schema
export const createWithdrawalSchema = z.object({
	walletId: z.string().uuid('Invalid wallet ID'),
	walletType: z.enum(['main', 'token', 'compounding', 'bonus']),
	amount: z.number().min(50, 'Minimum withdrawal is £50').max(100000, 'Maximum withdrawal is £100,000'),
	cryptoSymbol: z.enum(['BTC', 'ETH', 'USDT', 'BNB'])
});

// Add wallet schema
export const addWalletSchema = z.object({
	cryptocurrency: z.enum(['BTC', 'ETH', 'USDT', 'BNB']),
	name: z.string().min(1, 'Wallet name is required').max(100),
	address: z.string().min(10, 'Invalid wallet address').max(255)
});

// Update wallet schema
export const updateWalletSchema = z.object({
	name: z.string().min(1, 'Wallet name is required').max(100),
	address: z.string().min(10, 'Invalid wallet address').max(255)
});

// Submit payment proof schema
export const submitPaymentProofSchema = z.object({
	investmentId: z.string().uuid('Invalid investment ID'),
	transactionHash: z.string().min(10, 'Invalid transaction hash').max(255),
	cryptoAmount: z.number().positive('Crypto amount must be positive')
});

// Survey response schema
export const surveyResponseSchema = z.object({
	surveyId: z.string().uuid('Invalid survey ID'),
	answers: z.record(z.string(), z.any())
});
