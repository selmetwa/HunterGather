import { supabaseClient } from '$lib/supabase';

/**
 * This function fetches and returns a collection object
 */

async function getCollection(collectionId: string) {
  const { data: collection } = await supabaseClient
    .from('collections')
    .select()
    .eq('collectionId', collectionId);
  
  return collection
}

export default getCollection;