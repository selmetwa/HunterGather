import { interweave } from '../../../utils/interweave';
import paginatedBlocksBySearch from '../../../queries/search/paginatedBlocksBySearch';
import paginatedCollectionsBySearch from '../../../queries/search/paginationCollectionsBySearch';

export const ssr = false;

export const load = async ({ params }: { fetch: any; params: any }) => {
	const query = params.queryString.split('-')[0];
	const objectType = params.queryString.split('-')[1];

	if (objectType === 'blocks') {
		const { blocks, blocksCount } = await paginatedBlocksBySearch(query, 0, 10);

		return {
			searchTerm: query,
			objects: blocks,
			count: blocksCount,
			objectType
		};
	}

	if (objectType === 'collections') {
		const { collections, collectionsCount } = await paginatedCollectionsBySearch(query, 0, 10);
		return {
			searchTerm: query,
			objects: collections,
			count: collectionsCount,
			objectType
		};
	}

	const { blocks, blocksCount } = await paginatedBlocksBySearch(query, 0, 10);
	const { collections, collectionsCount } = await paginatedCollectionsBySearch(query, 0, 10);

	const objects = interweave(blocks, collections);
	const count = blocksCount + collectionsCount;

	return {
		searchTerm: query,
		objects,
		count,
		objectType
	};
};
