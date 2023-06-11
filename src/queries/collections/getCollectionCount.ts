import { supabaseClient } from '$lib/supabase';

/**
 * This function fetches and returns the number of
 * blocks & collections within a collection.
 */
async function getCollectionCount(collectionId: string) {
	const blocksRes = await supabaseClient
		.from('blocks')
		.select('*', { count: 'exact', head: true })
		.contains('collectionIds', [`${collectionId}`]);

	const collectionRes = await supabaseClient
		.from('collections')
		.select('*', { count: 'exact', head: true })
		.contains('collectionIds', [`${collectionId}`]);

	const blockCount = (blocksRes && blocksRes.count) || 0;
	const collectionsCount = (collectionRes && collectionRes.count) || 0;

	return blockCount + collectionsCount;
}

export default getCollectionCount;
