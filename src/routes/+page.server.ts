// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
import { supabaseClient } from '$lib/supabase';
import { interweave } from '../utils/interweave';

export const load = async ({ fetch, params }: { fetch: any; params: any }) => {
	const { data: blocks } = await supabaseClient.from('blocks').select().order('created_at', { ascending: false }).range(0, 15)
	const { data: collections } = await supabaseClient.from('collections').select().order('created_at', { ascending: false }).range(0, 15)

  const { count: blocksCount } = await supabaseClient.from('blocks').select('*', { count: 'exact' });
  const { count: collectionsCount } = await supabaseClient.from('collections').select('*', { count: 'exact' });

  const items = interweave(blocks, collections);

  return {
    items,
    count: ((blocksCount || 0) + (collectionsCount || 0))
  }
};
