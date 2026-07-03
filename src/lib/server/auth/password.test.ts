import { describe, it, expect } from 'vitest';
import { hashPassword, verifyPassword } from './password';

describe('password utilities', () => {
	it('should hash password', async () => {
		const password = 'testPassword123';
		const hash = await hashPassword(password);

		expect(hash).toBeDefined();
		expect(hash).not.toBe(password);
		expect(hash.length).toBeGreaterThan(0);
	});

	it('should verify correct password', async () => {
		const password = 'testPassword123';
		const hash = await hashPassword(password);
		const isValid = await verifyPassword(password, hash);

		expect(isValid).toBe(true);
	});

	it('should reject incorrect password', async () => {
		const password = 'testPassword123';
		const hash = await hashPassword(password);
		const isValid = await verifyPassword('wrongPassword', hash);

		expect(isValid).toBe(false);
	});
});
