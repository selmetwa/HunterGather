import { supabaseClient } from '$lib/supabase';

const interweave = (arr1: any, arr2: any) => {
	return arr1.reduce((acc: any, current: any, index: number) => {
		return [...acc, current, ...arr2.splice(0, arr1[index + 1] ? 2 : arr2.length)];
	}, []);
};

/**
 * This function fetches blocks and collections
 * within a collection, within a given range.
 */
async function getPaginatedCollectionItems(
	collectionId: string,
	page: number,
	limit: number,
	filterByCollectionId: boolean
) {
	const start = page * limit;
	const end = start + limit;

	if (filterByCollectionId) {
		const { data: blocks } = await supabaseClient
			.from('blocks')
			.select()
			.contains('collectionIds', [`${collectionId}`])
			.range(start, end);

		const { data: collections } = await supabaseClient
			.from('collections')
			.select()
			.contains('collectionIds', [`${collectionId}`])
			.range(start, end);

		return interweave(blocks, collections);
	}

	const { data: blocks } = await supabaseClient.from('blocks').select().range(start, end);
	const { data: collections } = await supabaseClient.from('collections').select().range(start, end);
	return interweave(blocks, collections);
}

export default getPaginatedCollectionItems;
