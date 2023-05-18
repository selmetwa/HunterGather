import { supabaseClient } from '$lib/supabase';

/**
 * This function gets the amount of blocks a user has contributed
 */
async function getBlocksCountByUserId(userId: string) {
  console.log({ userId })
  const count = await supabaseClient
    .from('blocks')
    .select('*', { count: 'exact', head: true })
    .eq('userId', userId)

  console.log({ count})
  return count.count || 0
}

export default getBlocksCountByUserId;
