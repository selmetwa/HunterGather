import { supabaseClient } from '$lib/supabase';
import { LIMIT } from '../../constants/constants';
/**
 * This function returns all blocks by userId
 * within a specific start and end range
 */
async function getBlocksByUserId(userId: string, page: number) {
	const start = page * LIMIT;
	const end = start + LIMIT;
	const { data: blocks } = await supabaseClient
		.from('blocks')
		.select()
		.eq('userId', userId)
		.range(start, end)
		.order('updated_at', { ascending: false });

	return blocks;
}

export default getBlocksByUserId;
