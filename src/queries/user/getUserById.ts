import { supabaseClient } from '$lib/supabase';

/**
 * Fetches and returns user by their userId
 */
async function getUserById(userId: string) {
	const { data: user } = await supabaseClient.from('users').select().eq('id', userId);

	return user || [{}];
}

export default getUserById;
