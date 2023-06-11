import { supabaseClient } from '$lib/supabase';
import { LIMIT } from '../../constants/constants';

/**
 * Fetch and return a list of collections within a certain range
 */
async function getPaginatedCollections(page: number) {
	const start = page * LIMIT;
	const end = start + LIMIT;

	const { data: blocks } = await supabaseClient
		.from('collections')
		.select()
		.order('updated_at', { ascending: false })
		.range(start, end);

	return blocks;
}

export default getPaginatedCollections;
