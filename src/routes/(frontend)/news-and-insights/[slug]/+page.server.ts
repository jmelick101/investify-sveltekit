import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    // TODO: Load from database when ready
    // For now, parse the slug as an ID
    const id = parseInt(params.slug, 10);
    
    return {
        id: isNaN(id) ? 1 : id
    };
};
