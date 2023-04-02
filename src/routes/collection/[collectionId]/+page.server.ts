import { supabaseClient } from '$lib/supabase';

export const load = async ({ params }: { fetch: any; params: any }) => {
	const collectionId = params?.collectionId;

	const { data: collection } = await supabaseClient.from('collections').select().eq('collectionId', collectionId);

	return {
		collectionId,
		collection
	};
};
