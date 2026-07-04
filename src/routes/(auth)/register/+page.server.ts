import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { hashPassword } from '$lib/server/auth/password';
import { registerSchema } from '$lib/server/validation/auth';
import { lucia } from '$lib/server/auth';
import {
	createEmailVerificationToken,
	sendEmailVerificationEmail
} from '$lib/server/services/email';
import { authRateLimiter } from '$lib/server/rate-limit';
import { logAuditEvent, AuditActions } from '$lib/server/audit';
import crypto from 'crypto';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		if (event.locals.user.role === 'admin') {
			throw redirect(302, '/admin/dashboard');
		} else {
			throw redirect(302, '/user/dashboard');
		}
	}
	const ref = event.url.searchParams.get('ref');
	return { ref };
};

export const actions: Actions = {
	default: async (event) => {
		// Rate limiting
		const rateLimitResult = authRateLimiter.check(event.request);
		if (!rateLimitResult.allowed) {
			return fail(429, {
				errors: {
					firstName: null,
					lastName: null,
					email: 'Too many registration attempts. Please try again later.',
					phone: null,
					password: null,
					passwordConfirmation: null,
					referralCode: null
				},
				data: {
					firstName: '',
					lastName: '',
					email: '',
					phone: '',
					referralCode: ''
				}
			});
		}

		const formData = await event.request.formData();
		const firstName = formData.get('firstName');
		const lastName = formData.get('lastName');
		const email = formData.get('email');
		const phone = formData.get('phone') || undefined;
		const password = formData.get('password');
		const passwordConfirmation = formData.get('passwordConfirmation');
		const referralCode = formData.get('referralCode') || undefined;

		const result = registerSchema.safeParse({
			firstName,
			lastName,
			email,
			phone,
			password,
			passwordConfirmation,
			referralCode
		});

		if (!result.success) {
			const errors = result.error.flatten().fieldErrors;
			return fail(400, {
				errors: {
					firstName: errors.firstName?.[0] || null,
					lastName: errors.lastName?.[0] || null,
					email: errors.email?.[0] || null,
					phone: errors.phone?.[0] || null,
					password: errors.password?.[0] || null,
					passwordConfirmation: errors.passwordConfirmation?.[0] || null,
					referralCode: errors.referralCode?.[0] || null
				},
				data: {
					firstName: String(firstName || ''),
					lastName: String(lastName || ''),
					email: String(email || ''),
					phone: String(phone || ''),
					referralCode: String(referralCode || '')
				}
			});
		}

		// Email check
		const [existingEmail] = await db.select().from(users).where(eq(users.email, result.data.email));

		if (existingEmail) {
			return fail(400, {
				errors: {
					firstName: null,
					lastName: null,
					email: 'Email address already registered',
					phone: null,
					password: null,
					passwordConfirmation: null,
					referralCode: null
				},
				data: {
					firstName: result.data.firstName,
					lastName: result.data.lastName,
					email: result.data.email,
					phone: result.data.phone || '',
					referralCode: result.data.referralCode || ''
				}
			});
		}

		// Referral check
		let referredById: string | null = null;
		if (result.data.referralCode) {
			const [referrer] = await db
				.select()
				.from(users)
				.where(eq(users.referralCode, result.data.referralCode));

			if (!referrer) {
				return fail(400, {
					errors: {
						firstName: null,
						lastName: null,
						email: null,
						phone: null,
						password: null,
						passwordConfirmation: null,
						referralCode: 'Invalid referral code'
					},
					data: {
						firstName: result.data.firstName,
						lastName: result.data.lastName,
						email: result.data.email,
						phone: result.data.phone || '',
						referralCode: result.data.referralCode
					}
				});
			}
			referredById = referrer.id;
		}

		// Hash password
		const hashedPassword = await hashPassword(result.data.password);

		// Unique referral code generation loop (8 hex chars)
		let generatedReferralCode = '';
		let isUnique = false;
		let attempts = 0;
		while (!isUnique && attempts < 10) {
			generatedReferralCode = crypto.randomBytes(4).toString('hex');
			const [existingReferral] = await db
				.select()
				.from(users)
				.where(eq(users.referralCode, generatedReferralCode));
			if (!existingReferral) {
				isUnique = true;
			}
			attempts++;
		}

		if (!isUnique) {
			return fail(500, {
				errors: {
					firstName: null,
					lastName: null,
					email: null,
					phone: null,
					password: null,
					passwordConfirmation: null,
					referralCode: 'Failed to generate referral code. Please try again.'
				},
				data: {
					firstName: result.data.firstName,
					lastName: result.data.lastName,
					email: result.data.email,
					phone: result.data.phone || '',
					referralCode: result.data.referralCode || ''
				}
			});
		}

		// Insert user
		const [newUser] = await db
			.insert(users)
			.values({
				firstName: result.data.firstName,
				lastName: result.data.lastName,
				email: result.data.email,
				phone: result.data.phone || null,
				passwordHash: hashedPassword,
				role: 'user',
				walletBalance: '0',
				tokenBalance: '0',
				kycStatus: 'pending',
				referralCode: generatedReferralCode,
				referredBy: referredById
			})
			.returning();

		// Log registration
		await logAuditEvent({
			userId: newUser.id,
			action: AuditActions.USER_REGISTER,
			resourceType: 'user',
			resourceId: newUser.id,
			ipAddress: event.request.headers.get('x-forwarded-for') || event.request.headers.get('x-real-ip') || 'unknown',
			userAgent: event.request.headers.get('user-agent') || 'unknown'
		});

		// Send verification email
		const verificationToken = await createEmailVerificationToken(newUser.id);
		await sendEmailVerificationEmail(newUser.email, verificationToken);

		// Create session
		const session = await lucia.createSession(newUser.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);

		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '/',
			...sessionCookie.attributes
		});

		throw redirect(302, '/user/dashboard');
	}
};
