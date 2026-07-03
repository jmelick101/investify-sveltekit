import { describe, it, expect } from 'vitest';
import { loginSchema, registerSchema, resetPasswordSchema } from './auth';

describe('auth validation schemas', () => {
	describe('loginSchema', () => {
		it('should validate correct login data', () => {
			const result = loginSchema.safeParse({
				email: 'user@example.com',
				password: 'password123'
			});
			expect(result.success).toBe(true);
		});

		it('should reject invalid email', () => {
			const result = loginSchema.safeParse({
				email: 'invalid-email',
				password: 'password123'
			});
			expect(result.success).toBe(false);
		});

		it('should reject empty password', () => {
			const result = loginSchema.safeParse({
				email: 'user@example.com',
				password: ''
			});
			expect(result.success).toBe(false);
		});
	});

	describe('registerSchema', () => {
		it('should validate correct registration data', () => {
			const result = registerSchema.safeParse({
				firstName: 'John',
				lastName: 'Doe',
				email: 'john@example.com',
				password: 'Password123',
				passwordConfirmation: 'Password123'
			});
			expect(result.success).toBe(true);
		});

		it('should reject weak password', () => {
			const result = registerSchema.safeParse({
				firstName: 'John',
				lastName: 'Doe',
				email: 'john@example.com',
				password: 'weak',
				passwordConfirmation: 'weak'
			});
			expect(result.success).toBe(false);
		});

		it('should reject mismatched passwords', () => {
			const result = registerSchema.safeParse({
				firstName: 'John',
				lastName: 'Doe',
				email: 'john@example.com',
				password: 'Password123',
				passwordConfirmation: 'DifferentPassword123'
			});
			expect(result.success).toBe(false);
		});
	});

	describe('resetPasswordSchema', () => {
		it('should validate matching passwords', () => {
			const result = resetPasswordSchema.safeParse({
				password: 'NewPassword123',
				passwordConfirmation: 'NewPassword123'
			});
			expect(result.success).toBe(true);
		});

		it('should reject password without uppercase', () => {
			const result = resetPasswordSchema.safeParse({
				password: 'password123',
				passwordConfirmation: 'password123'
			});
			expect(result.success).toBe(false);
		});

		it('should reject password without number', () => {
			const result = resetPasswordSchema.safeParse({
				password: 'PasswordABC',
				passwordConfirmation: 'PasswordABC'
			});
			expect(result.success).toBe(false);
		});
	});
});
