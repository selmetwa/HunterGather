import { supabaseClient } from '$lib/supabase';
import { LIMIT } from '../../constants/constants';

/**
 * Get collections by search query
 * also return count
 */
async function paginatedCollectionsBySearch(query: string, page: number) {
	const start = page * LIMIT;
	const end = start + LIMIT;

	/**
	 * Only fetch collections if user is searching
	 * from All view or the Collections page
	 */

	const { data, count } = await supabaseClient
		.from('collections')
		.select('*', { count: 'exact' })
		.filter('title', 'ilike', `%${query}%`)
		.range(start, end)
		.order('updated_at', { ascending: false });

	return {
		collections: data || [],
		collectionsCount: count || 0
	};
}

export default paginatedCollectionsBySearch;
