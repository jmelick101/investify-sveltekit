import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { blogPosts, users } from '$lib/server/db/schema';
import { eq, desc, sql } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals }) => {
	const user = locals.user!;

	// Get published blog posts as news
	const newsArticles = await db
		.select({
			id: blogPosts.id,
			title: blogPosts.title,
			slug: blogPosts.slug,
			excerpt: blogPosts.excerpt,
			content: blogPosts.content,
			coverImage: blogPosts.coverImage,
			status: blogPosts.status,
			publishedAt: blogPosts.publishedAt,
			createdAt: blogPosts.createdAt,
			author: {
				firstName: users.firstName,
				lastName: users.lastName
			}
		})
		.from(blogPosts)
		.leftJoin(users, eq(blogPosts.authorId, users.id))
		.where(eq(blogPosts.status, 'published'))
		.orderBy(desc(blogPosts.publishedAt))
		.limit(10);

	return {
		breadcrumbs: [
			{ title: 'Dashboard', href: '/user/dashboard' },
			{ title: 'News', href: '/user/news' }
		],
		newsArticles: newsArticles.map((article) => ({
			id: article.id,
			title: article.title,
			date: article.publishedAt?.toLocaleDateString('en-US', {
				month: 'short',
				day: 'numeric',
				year: 'numeric'
			}) || 'N/A',
			category: 'News',
			summary: article.excerpt || 'No summary available',
			content: article.content,
			imageUrl: article.coverImage || 'https://images.unsplash.com/photo-1554224155-9726b30c8d1b?q=80&w=2670&auto=format&fit=crop'
		}))
	};
};
