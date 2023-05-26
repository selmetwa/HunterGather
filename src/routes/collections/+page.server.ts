import getPaginatedCollections from "../../queries/collections/getPaginatedCollections";

export const ssr = false;

export const load = async ({ fetch, params }: { fetch: any; params: any }) => {
  const collections = await getPaginatedCollections(0, 5)

  return {
    collections
  }
}