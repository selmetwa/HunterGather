import { supabaseClient } from '$lib/supabase';

export const load = async ({ params }: { fetch: any; params: any }) => {
	const blockId = params?.blockId;

	const { data: block } = await supabaseClient.from('blocks').select().eq('blockId', blockId);

  return {
    block: block,
  };
};
