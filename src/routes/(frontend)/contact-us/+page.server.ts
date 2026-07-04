import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/db';
import { contactSubmissions } from '$lib/server/db/schema';
import { fail } from '@sveltejs/kit';
import { logAuditEvent, AuditActions } from '$lib/server/audit';

export const load: PageServerLoad = async () => {
	return {};
};

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const firstName = formData.get('firstName') as string;
		const lastName = formData.get('lastName') as string;
		const email = formData.get('email') as string;
		const interest = formData.get('interest') as string;
		const message = formData.get('message') as string;

		if (!firstName || !lastName || !email || !message) {
			return fail(400, { error: 'All fields are required' });
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return fail(400, { error: 'Invalid email address' });
		}

		try {
			await db.insert(contactSubmissions).values({
				firstName,
				lastName,
				email,
				interest: interest || 'General Inquiry',
				message
			});

			return { success: true, message: 'Message sent successfully!' };
		} catch (error) {
			console.error('Contact form submission error:', error);
			return fail(500, { error: 'Failed to send message. Please try again.' });
		}
	}
};
