import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { createBlogPostSchema } from '$lib/server/validation/admin';
import { db } from '$lib/server/db';
import { blogPosts } from '$lib/server/db/schema';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const data = {
			title: formData.get('title'),
			slug: formData.get('slug'),
			excerpt: formData.get('excerpt') || undefined,
			coverImage: formData.get('coverImage') || undefined,
			content: formData.get('content'),
			status: formData.get('status')
		};

		const result = createBlogPostSchema.safeParse(data);

		if (!result.success) {
			return fail(400, {
				errors: result.error.flatten().fieldErrors,
				data
			});
		}

		try {
			const [post] = await db
				.insert(blogPosts)
				.values({
					...result.data,
					authorId: locals.user!.id,
					publishedAt: result.data.status === 'published' ? new Date() : null
				})
				.returning();

			throw redirect(303, `/admin/blog/${post.id}/edit`);
		} catch (error) {
			if (error instanceof Response) throw error;
			return fail(500, {
				error: 'Failed to create blog post',
				data
			});
		}
	}
};
