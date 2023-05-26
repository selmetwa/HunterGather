import { supabaseClient } from '$lib/supabase';

/**
 * Get blocks based on a search term within a certain range
 * Search blocks by title
 */
async function paginatedBlocksBySearch(query: string, page: number, limit: number) {
	const start = (page) * limit;
	const end = start + limit;

	const { data, count} = await supabaseClient
		.from('blocks')
		.select('*', { count: 'exact' })
		.filter('title', 'ilike', `%${query}%`)
		.range(start, end);

	return {
		blocks: data,
		blocksCount: count || 0
	};
}

export default paginatedBlocksBySearch;
