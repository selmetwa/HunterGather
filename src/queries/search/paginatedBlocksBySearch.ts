import { supabaseClient } from '$lib/supabase';
import { LIMIT } from '../../constants/constants';

/**
 * Get blocks based on a search term within a certain range
 * Search blocks by title
 */
async function paginatedBlocksBySearch(query: string, page: number) {
	const start = page * LIMIT;
	const end = start + LIMIT;

	const { data, count } = await supabaseClient
		.from('blocks')
		.select('*', { count: 'exact' })
		.filter('title', 'ilike', `%${query}%`)
		.range(start, end)
		.order('updated_at', { ascending: false });

	return {
		blocks: data || [],
		blocksCount: count || 0
	};
}

export default paginatedBlocksBySearch;
