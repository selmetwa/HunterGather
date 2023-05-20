export const load = async ({ params }: { fetch: any; params: any }) => {
	console.log({ params })

  return {
    searchTerm: params.queryString
  }
};
