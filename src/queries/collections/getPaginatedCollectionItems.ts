import { supabaseClient } from '$lib/supabase';

import { interweave } from '../../utils/interweave';
import { LIMIT } from '../../constants/constants';

/**
 * This function fetches blocks and collections
 * within a collection, within a given range.
 */
async function getPaginatedCollectionItems(
	collectionId: string,
	page: number,
	filterByCollectionId: boolean
) {
	const start = page * LIMIT;
	const end = start + LIMIT;

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
		.order('updated_at', { ascending: false })
		.range(start, end);
	const { data: collections } = await supabaseClient
		.from('collections')
		.select()
		.order('updated_at', { ascending: false })
		.range(start, end);
	return interweave(blocks, collections);
}

export default getPaginatedCollectionItems;
