import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
	const user = locals.user!;
	const { id } = params;

	// TODO: Replace with real data - Load survey from database
	const survey = {
		id: parseInt(id),
		name: 'Customer Satisfaction Q1 2026',
		description: 'We value your feedback. Please take a moment to answer these questions.',
		created_at: '2026-01-15',
		type: 'Feedback',
		status: 'Active',
		questions: [
			{
				id: 'q1',
				text: 'How satisfied are you with our service?',
				type: 'Single Choice',
				options: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very Dissatisfied'],
				required: true
			},
			{
				id: 'q2',
				text: 'Which features do you use the most?',
				type: 'Multiple Choice',
				options: ['Dashboard', 'Reports', 'Settings', 'Profile'],
				required: false
			},
			{
				id: 'q3',
				text: 'Any additional comments?',
				type: 'Text',
				options: [],
				required: false
			}
		]
	};

	return {
		survey
	};
};
