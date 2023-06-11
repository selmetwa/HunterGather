import { supabaseClient } from '$lib/supabase';

/**
 * Fetch and return the count of all uploaded blocks
 */

async function getBlocksCount() {
	const { count } = await supabaseClient.from('blocks').select('*', { count: 'exact', head: true });

	return count;
}

export default getBlocksCount;
