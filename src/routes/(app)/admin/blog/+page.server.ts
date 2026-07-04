import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { blogPosts, users } from '$lib/server/db/schema';
import { desc, eq } from 'drizzle-orm';
import { safeQuery } from '$lib/server/db/utils';

export const load: PageServerLoad = async () => {
	const posts = await safeQuery(
		() =>
			db
				.select({
					id: blogPosts.id,
					title: blogPosts.title,
					slug: blogPosts.slug,
					excerpt: blogPosts.excerpt,
					status: blogPosts.status,
					coverImage: blogPosts.coverImage,
					publishedAt: blogPosts.publishedAt,
					createdAt: blogPosts.createdAt,
					author: {
						id: users.id,
						firstName: users.firstName,
						lastName: users.lastName,
						email: users.email
					}
				})
				.from(blogPosts)
				.leftJoin(users, eq(blogPosts.authorId, users.id))
				.orderBy(desc(blogPosts.createdAt))
				.limit(50),
		'Failed to load blog posts'
	);

	return {
		breadcrumbs: [
			{ title: 'Dashboard', href: '/admin/dashboard' },
			{ title: 'Blog', href: '/admin/blog' }
		],
		posts
	};
};
