import type { PageServerLoad } from './$types';
import { getArticleBySlug, getAllArticles } from '$lib/server/articles';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const article = await getArticleBySlug(params.slug);

	if (!article) {
		throw error(404, 'Article not found');
	}

	const allArticles = await getAllArticles();
	const relatedArticles = article.related_article_ids
		.map((id) => allArticles.find((a) => a.id === id))
		.filter(Boolean)
		.slice(0, 3);

	const currentIndex = allArticles.findIndex((a) => a.id === article.id);
	const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
	const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

	return {
		article,
		relatedArticles,
		prevArticle,
		nextArticle
	};
};
