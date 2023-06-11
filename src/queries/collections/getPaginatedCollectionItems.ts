import { supabaseClient } from '$lib/supabase';

import { interweave } from '../../utils/interweave';

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
			.range(start, end)
			.order('updated_at', { ascending: false });

		const { data: collections } = await supabaseClient
			.from('collections')
			.select()
			.contains('collectionIds', [`${collectionId}`])
			.range(start, end)
			.order('updated_at', { ascending: false });

		return interweave(blocks, collections);
	}

	const { data: blocks } = await supabaseClient
		.from('blocks')
		.select()
		.order('created_at', { ascending: false })
		.range(start, end);
	const { data: collections } = await supabaseClient
		.from('collections')
		.select()
		.order('updated_at', { ascending: false })
		.range(start, end);
	return interweave(blocks, collections);
}

export default getPaginatedCollectionItems;
