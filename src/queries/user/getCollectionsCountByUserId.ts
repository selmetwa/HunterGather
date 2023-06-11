import { supabaseClient } from '$lib/supabase';

/**
 * This function gets the amount of collections a user has contributed
 */
async function getCollectionsCountByUserId(userId: string) {
	const count = await supabaseClient
		.from('collections')
		.select('*', { count: 'exact', head: true })
		.eq('userId', userId);

	return count.count || 0;
}

export default getCollectionsCountByUserId;
