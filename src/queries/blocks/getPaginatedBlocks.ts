import { supabaseClient } from '$lib/supabase';
import { LIMIT } from '../../constants/constants';
/**
 * Fetch and return a list of blocks within a certain range
 */

async function getPaginatedBlocks(page: number) {
	const start = page * LIMIT;
	const end = start + LIMIT;

	const { data: blocks } = await supabaseClient
		.from('blocks')
		.select()
		.order('updated_at', { ascending: false })
		.range(start, end);

	return blocks;
}

export default getPaginatedBlocks;
