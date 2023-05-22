import { supabaseClient } from '$lib/supabase';

/**
 * Get collections by search query
 * also return count
 */
async function paginatedCollectionsBySearch(query: string, page: number, limit: number) {
	const start = page * limit;
	const end = start + limit;

  /**
   * Only fetch collections if user is searching 
   * from All view or the Collections page
   */

    const { data, count } = await supabaseClient
      .from('collections')
      .select('*', { count: 'exact' })
      .filter('title', 'ilike', `%${query}%`)
      .range(start, end);

    return {
      collections: data || [],
      collectionsCount: count || 0
    };
}

export default paginatedCollectionsBySearch;
