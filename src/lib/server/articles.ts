import { db } from '$lib/server/db';
import { blogPosts, users } from '$lib/server/db/schema';
import { eq, desc, asc } from 'drizzle-orm';
import { safeQuery, safeQueryOrNull } from '$lib/server/db/utils';

export interface Article {
	id: string;
	title: string;
	category: 'Market Updates' | 'Wealth Strategy' | 'Global Trends';
	date: string;
	readTime: string;
	author: string;
	author_bio: string;
	author_image?: string;
	image: string;
	excerpt: string;
	content: string;
	related_article_ids: string[];
	slug: string;
}

export async function getAllArticles(): Promise<Article[]> {
	const posts = await safeQuery(
		() =>
			db
				.select({
					id: blogPosts.id,
					title: blogPosts.title,
					slug: blogPosts.slug,
					content: blogPosts.content,
					excerpt: blogPosts.excerpt,
					coverImage: blogPosts.coverImage,
					category: blogPosts.category,
					readTime: blogPosts.readTime,
					authorBio: blogPosts.authorBio,
					authorImage: blogPosts.authorImage,
					relatedArticleIds: blogPosts.relatedArticleIds,
					publishedAt: blogPosts.publishedAt,
					createdAt: blogPosts.createdAt,
					authorFirstName: users.firstName,
					authorLastName: users.lastName
				})
				.from(blogPosts)
				.innerJoin(users, eq(blogPosts.authorId, users.id))
				.where(eq(blogPosts.status, 'published'))
				.orderBy(desc(blogPosts.publishedAt)),
		'Failed to load articles'
	);

	return (posts || []).map(formatArticle);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
	const post = await safeQueryOrNull(
		() =>
			db
				.select({
					id: blogPosts.id,
					title: blogPosts.title,
					slug: blogPosts.slug,
					content: blogPosts.content,
					excerpt: blogPosts.excerpt,
					coverImage: blogPosts.coverImage,
					category: blogPosts.category,
					readTime: blogPosts.readTime,
					authorBio: blogPosts.authorBio,
					authorImage: blogPosts.authorImage,
					relatedArticleIds: blogPosts.relatedArticleIds,
					publishedAt: blogPosts.publishedAt,
					createdAt: blogPosts.createdAt,
					authorFirstName: users.firstName,
					authorLastName: users.lastName
				})
				.from(blogPosts)
				.innerJoin(users, eq(blogPosts.authorId, users.id))
				.where(eq(blogPosts.slug, slug))
				.limit(1),
		'Failed to load article'
	);

	return post ? formatArticle(post) : null;
}

export async function getArticleById(id: string): Promise<Article | null> {
	const post = await safeQueryOrNull(
		() =>
			db
				.select({
					id: blogPosts.id,
					title: blogPosts.title,
					slug: blogPosts.slug,
					content: blogPosts.content,
					excerpt: blogPosts.excerpt,
					coverImage: blogPosts.coverImage,
					category: blogPosts.category,
					readTime: blogPosts.readTime,
					authorBio: blogPosts.authorBio,
					authorImage: blogPosts.authorImage,
					relatedArticleIds: blogPosts.relatedArticleIds,
					publishedAt: blogPosts.publishedAt,
					createdAt: blogPosts.createdAt,
					authorFirstName: users.firstName,
					authorLastName: users.lastName
				})
				.from(blogPosts)
				.innerJoin(users, eq(blogPosts.authorId, users.id))
				.where(eq(blogPosts.id, id))
				.limit(1),
		'Failed to load article'
	);

	return post ? formatArticle(post) : null;
}

function formatArticle(post: any): Article {
	const authorName = [post.authorFirstName, post.authorLastName].filter(Boolean).join(' ') || 'Investify Team';
	const dateStr = post.publishedAt
		? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
		: new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

	return {
		id: post.id,
		title: post.title,
		slug: post.slug,
		category: (post.category || 'Market Updates') as Article['category'],
		date: dateStr,
		readTime: post.readTime || '5 min read',
		author: authorName,
		author_bio: post.authorBio || '',
		author_image: post.authorImage || undefined,
		image: post.coverImage || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
		excerpt: post.excerpt || '',
		content: post.content,
		related_article_ids: (post.relatedArticleIds as string[]) || []
	};
}
