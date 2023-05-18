import { supabaseClient } from '$lib/supabase';

/**
 * This function gets all collections from a specific 
 * user within a defined start and end range.
 */
async function getCollectionsByUserId(userId: string, page: number, limit: number) {
  const start = page * limit;
	const end = start + limit;

  const { data: collections } = await supabaseClient
    .from('collections')
    .select()
    .eq('userId', userId)
    .range(start, end);

  return collections
}

export default getCollectionsByUserId;
