import { supabaseClient } from '$lib/supabase';

/**
 * This function returns all blocks by userId
 * within a specific start and end range
 */
async function getBlocksByUserId(userId: string, page: number, limit: number) {
  const start = page * limit;
	const end = start + limit;
  const { data: blocks } = await supabaseClient.from('blocks').select().eq('userId', userId).range(start, end).order('created_at', { ascending: false });

  return blocks;
}

export default getBlocksByUserId;
