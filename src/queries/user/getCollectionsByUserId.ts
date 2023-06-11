import { supabaseClient } from '$lib/supabase';

/**
 * This function gets all collections from a specific
 */
async function getCollectionsByUserId(userId: string) {
	const { data: collections } = await supabaseClient
		.from('collections')
		.select()
		.eq('userId', userId)
		.order('updated_at', { ascending: false });

	return collections || [];
}

export default getCollectionsByUserId;
