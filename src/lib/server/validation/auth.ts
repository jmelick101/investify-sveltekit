import { z } from 'zod';

export const loginSchema = z.object({
	email: z.string().email('Invalid email address').min(1, 'Email is required'),
	password: z.string().min(1, 'Password is required')
});

export const registerSchema = z.object({
	firstName: z.string().min(1, 'First name is required').max(255),
	lastName: z.string().min(1, 'Last name is required').max(255),
	email: z.string().email('Invalid email address').min(1, 'Email is required'),
	phone: z.string().optional(),
	password: z
		.string()
		.min(8, 'Password must be at least 8 characters')
		.regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
		.regex(/[a-z]/, 'Password must contain at least one lowercase letter')
		.regex(/[0-9]/, 'Password must contain at least one number'),
	passwordConfirmation: z.string().min(1, 'Password confirmation is required'),
	referralCode: z.string().optional()
}).refine((data) => data.password === data.passwordConfirmation, {
	message: "Passwords don't match",
	path: ['passwordConfirmation']
});

export const forgotPasswordSchema = z.object({
	email: z.string().email('Invalid email address').min(1, 'Email is required')
});

export const resetPasswordSchema = z.object({
	password: z
		.string()
		.min(8, 'Password must be at least 8 characters')
		.regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
		.regex(/[a-z]/, 'Password must contain at least one lowercase letter')
		.regex(/[0-9]/, 'Password must contain at least one number'),
	passwordConfirmation: z.string().min(1, 'Password confirmation is required')
}).refine((data) => data.password === data.passwordConfirmation, {
	message: "Passwords don't match",
	path: ['passwordConfirmation']
});

export const twoFactorChallengeSchema = z.object({
	code: z.string().length(6, 'Code must be 6 digits').regex(/^\d+$/, 'Code must be numeric')
});

export const emailVerificationResendSchema = z.object({
	email: z.string().email('Invalid email address')
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type TwoFactorChallengeInput = z.infer<typeof twoFactorChallengeSchema>;
