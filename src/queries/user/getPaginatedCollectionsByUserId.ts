import { supabaseClient } from '$lib/supabase';

/**
 * This function gets all collections from a specific
 * user within a defined start and end range.
 */
async function getPaginatedCollectionsByUserId(userId: string, page: number, limit: number) {
	const start = page * limit;
	const end = start + limit;

	const { data: collections } = await supabaseClient
		.from('collections')
		.select()
		.eq('userId', userId)
		.range(start, end)
		.order('updated_at', { ascending: false });

	return collections;
}

export default getPaginatedCollectionsByUserId;
