import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const user = locals.user!;

	// TODO: Replace with real data - Load news articles from database
	const newsArticles = [
		{
			id: 1,
			title: 'Q1 2026 Financial Results Exceed Expectations',
			date: 'Feb 8, 2026',
			category: 'Financial',
			summary: 'We are thrilled to announce that our first-quarter financial results have surpassed all projections.',
			content: '<p>Financial results content...</p>',
			imageUrl: 'https://images.unsplash.com/photo-1554224155-9726b30c8d1b?q=80&w=2670&auto=format&fit=crop'
		}
	];

	return {
		newsArticles
	};
};
