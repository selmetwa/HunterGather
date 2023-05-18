// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
import { supabaseClient } from '$lib/supabase';

export const load = async ({ fetch, params }: { fetch: any; params: any }) => {
	const { data: blocks } = await supabaseClient.from('blocks').select().range(0, 15)
	const { data: collections } = await supabaseClient.from('collections').select().range(0, 15)

  const { count: blocksCount } = await supabaseClient.from('blocks').select('*', { count: 'exact' });
  const { count: collectionsCount } = await supabaseClient.from('collections').select('*', { count: 'exact' });
  const interweave = (arr1: any, arr2: any) => {
    return arr1.reduce((acc: any, current: any, index: number) => {
      return [
        ...acc,
        current,
        ...arr2.splice(0, arr1[index + 1] ? 2 : arr2.length)
      ];
    }, []);
  };

  const items = interweave(blocks, collections);

  return {
    items,
    count: (blocksCount + collectionsCount)
  }
};
