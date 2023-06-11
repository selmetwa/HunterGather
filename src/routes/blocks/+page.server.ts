import getPaginatedBlocks from '../../queries/blocks/getPaginatedBlocks';

export const ssr = false;

export const load = async ({ fetch, params }: { fetch: any; params: any }) => {
	const blocks = await getPaginatedBlocks(0);

	return {
		blocks
	};
};
