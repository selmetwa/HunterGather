export const load = async ({ fetch, params }: { fetch: any; params: any }) => {
	const collectionId = params?.collectionId;

	return {
		collectionId,
	};
};
