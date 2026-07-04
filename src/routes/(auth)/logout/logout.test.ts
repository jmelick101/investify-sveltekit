import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from './+server';
import { lucia } from '$lib/server/auth';
import { isRedirect } from '@sveltejs/kit';

vi.mock('$lib/server/auth', () => ({
	lucia: {
		invalidateSession: vi.fn(),
		createBlankSessionCookie: vi.fn(() => ({
			name: 'auth_session',
			value: '',
			attributes: {
				sameSite: 'lax',
				secure: true
			}
		}))
	}
}));

describe('Logout Endpoint', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should redirect to /login if there is no session', async () => {
		const mockEvent = {
			locals: {
				session: null
			},
			cookies: {
				set: vi.fn()
			}
		} as any;

		try {
			await POST(mockEvent);
			expect.fail('Should have thrown a redirect');
		} catch (error: any) {
			expect(isRedirect(error)).toBe(true);
			expect(error.status).toBe(302);
			expect(error.location).toBe('/login');
		}
	});

	it('should invalidate session, set blank cookie, and redirect to /login if there is a session', async () => {
		const mockEvent = {
			locals: {
				session: {
					id: 'session-123'
				}
			},
			cookies: {
				set: vi.fn()
			}
		} as any;

		try {
			await POST(mockEvent);
			expect.fail('Should have thrown a redirect');
		} catch (error: any) {
			expect(lucia.invalidateSession).toHaveBeenCalledWith('session-123');
			expect(lucia.createBlankSessionCookie).toHaveBeenCalled();
			expect(mockEvent.cookies.set).toHaveBeenCalledWith('auth_session', '', {
				path: '/',
				sameSite: 'lax',
				secure: true
			});
			expect(isRedirect(error)).toBe(true);
			expect(error.status).toBe(302);
			expect(error.location).toBe('/login');
		}
	});
});
