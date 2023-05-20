import { supabaseClient } from '$lib/supabase';

/**
 * Fetch and return the count of all created collections
 */
async function getCollectionsCount() {
  const { count } = await supabaseClient
    .from('collections')
    .select('*', { count: 'exact', head: true })
  
  return count;
}

export default getCollectionsCount;
