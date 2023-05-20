import { supabaseClient } from '$lib/supabase';
/**
 * Fetch and return a list of blocks within a certain range
 */

async function getPaginatedBlocks(page: number, limit: number) {
  const start = page * limit;
	const end = start + limit;
	const { data: blocks } = await supabaseClient.from('blocks')
    .select()
    .order('created_at', { ascending: false })
    .range(start, end);
  
  return blocks;
}

export default getPaginatedBlocks