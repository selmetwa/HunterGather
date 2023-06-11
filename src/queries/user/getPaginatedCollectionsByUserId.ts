import { supabaseClient } from '$lib/supabase';
import { LIMIT } from '../../constants/constants';

/**
 * This function gets all collections from a specific
 * user within a defined start and end range.
 */
async function getPaginatedCollectionsByUserId(userId: string, page: number) {
	const start = page * LIMIT;
	const end = start + LIMIT;

	const { data: collections } = await supabaseClient
		.from('collections')
		.select()
		.eq('userId', userId)
		.range(start, end)
		.order('updated_at', { ascending: false });

	return collections;
}

export default getPaginatedCollectionsByUserId;
