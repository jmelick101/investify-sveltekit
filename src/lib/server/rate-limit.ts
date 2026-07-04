import { dev } from '$app/environment';

// In-memory rate limit store (in production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

interface RateLimitConfig {
	windowMs: number;
	maxRequests: number;
	keyGenerator?: (request: Request) => string;
}

/**
 * Simple rate limiter for protecting sensitive endpoints
 * @param config Rate limit configuration
 * @returns Rate limit check function
 */
export function createRateLimiter(config: RateLimitConfig) {
	const { windowMs, maxRequests, keyGenerator } = config;

	return {
		/**
		 * Check if a request is allowed
		 * @param request The incoming request
		 * @returns Object with allowed status and remaining count
		 */
		check(request: Request): { allowed: boolean; remaining: number; resetAt: number } {
			const key = keyGenerator ? keyGenerator(request) : getDefaultKey(request);
			const now = Date.now();
			const resetAt = now + windowMs;

			const existing = rateLimitStore.get(key);

			if (!existing || now > existing.resetAt) {
				// First request or window expired
				rateLimitStore.set(key, { count: 1, resetAt });
				return { allowed: true, remaining: maxRequests - 1, resetAt };
			}

			if (existing.count >= maxRequests) {
				// Rate limit exceeded
				return { allowed: false, remaining: 0, resetAt: existing.resetAt };
			}

			// Increment count
			existing.count++;
			return { allowed: true, remaining: maxRequests - existing.count, resetAt: existing.resetAt };
		},

		/**
		 * Reset rate limit for a key
		 * @param request The request to reset
		 */
		reset(request: Request): void {
			const key = keyGenerator ? keyGenerator(request) : getDefaultKey(request);
			rateLimitStore.delete(key);
		}
	};
}

function getDefaultKey(request: Request): string {
	// Use IP address and pathname as key
	const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
	const url = new URL(request.url);
	return `${ip}:${url.pathname}`;
}

// Pre-configured rate limiters for common use cases
export const authRateLimiter = createRateLimiter({
	windowMs: 15 * 60 * 1000, // 15 minutes
	maxRequests: 5 // 5 attempts per 15 minutes
});

export const withdrawalRateLimiter = createRateLimiter({
	windowMs: 60 * 60 * 1000, // 1 hour
	maxRequests: 3 // 3 withdrawals per hour
});

export const investmentRateLimiter = createRateLimiter({
	windowMs: 60 * 60 * 1000, // 1 hour
	maxRequests: 5 // 5 investments per hour
});

export const apiRateLimiter = createRateLimiter({
	windowMs: 60 * 1000, // 1 minute
	maxRequests: 60 // 60 requests per minute
});

// Clean up expired entries periodically (in production, use Redis TTL)
if (dev) {
	setInterval(() => {
		const now = Date.now();
		for (const [key, value] of rateLimitStore.entries()) {
			if (now > value.resetAt) {
				rateLimitStore.delete(key);
			}
		}
	}, 60 * 1000); // Clean up every minute
}
