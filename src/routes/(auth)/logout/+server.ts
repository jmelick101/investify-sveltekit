import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { lucia } from '$lib/server/auth';

export const POST: RequestHandler = async (event) => {
	if (!event.locals.session) {
		throw redirect(302, '/login');
	}

	await lucia.invalidateSession(event.locals.session.id);
	const sessionCookie = lucia.createBlankSessionCookie();

	event.cookies.set(sessionCookie.name, sessionCookie.value, {
		path: '/',
		...sessionCookie.attributes
	});

	throw redirect(302, '/login');
};
