import { supabaseClient } from '$lib/supabase';
import { createUniqueArray } from '../../utils/createUniqueArray';

/**
 * Get blocks based on a search term within a certain range
 * Search blocks by both title and url
 */
async function paginatedBlocksBySearch(query: string, page: number, limit: number) {
	const start = page * limit;
	const end = start + limit;
  console.log({ query })
	const blocksFromTitle = await supabaseClient
		.from('blocks')
		.select('*', { count: 'exact' })
		.filter('title', 'ilike', `%${query}%`)
		.range(start, end);

	const blocksFromUrl = await supabaseClient
		.from('blocks')
		.select('*', { count: 'exact' })
		.filter('url', 'ilike', `%${query}%`)
		.range(start, end);

	const blocks = createUniqueArray(blocksFromTitle.data || [], blocksFromUrl.data || []);
	const count = (blocksFromTitle.count || 0) + (blocksFromUrl.count || 0);

	return {
		blocks,
		blocksCount: count
	};
}

export default paginatedBlocksBySearch;
