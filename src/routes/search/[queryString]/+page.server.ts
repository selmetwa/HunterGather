import { supabaseClient } from '$lib/supabase';
import { createUniqueArray } from '../../../utils/createUniqueArray';

const interweave = (arr1: any, arr2: any) => {
	return arr1.reduce((acc: any, current: any, index: number) => {
		return [...acc, current, ...arr2.splice(0, arr1[index + 1] ? 2 : arr2.length)];
	}, []);
};

export const load = async ({ params }: { fetch: any; params: any }) => {
	console.log({ params })

  const q = params.queryString;

  const { data: blocks, error: blocksError } = 
  await supabaseClient
    .from('blocks')
    .select()
    .filter('title', 'ilike', `%${q}%`);

  const { data: blocksFromUrl, error: blocksFromUrlError } =
  await supabaseClient
    .from('blocks')
    .select()
    .filter('url', 'ilike', `%${q}%`); 

  const { data: collections, error: collectionsError } 
    = await supabaseClient.from('collections').select().filter('title', 'ilike', `%${q}%`)

  const blocksArr = createUniqueArray(blocks, blocksFromUrl)
  const a = interweave(blocksArr, collections);

  return {
    searchTerm: params.queryString,
    a,
    blocksFromUrl: blocksFromUrl,
    blocks: blocks,
    collections: collections
  }
};
