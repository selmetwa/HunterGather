<script>
	import { onMount } from 'svelte';

	import { createUniqueArray } from '../../utils/createUniqueArray';
	import getPaginatedCollections from '../../queries/collections/getPaginatedCollections';
	import getCollectionsCount from '../../queries/collections/getCollectionsCount';
	import Grid from '../../components/ui/Grid.svelte';
	import LoadMoreButton from '../../components/ui/LoadMoreButton.svelte';
	import CollectionCard from '../../components/Collections/CollectionCard.svelte';
	import PageNav from '../../components/Navigation/PageNav.svelte';

	export let data;
	let { collections } = data;
	$: page = 0;
	$: count = 0;
  $: showLoadMore = false;

	$: if (page) loadMore();

	const loadMore = async () => {
    const newCollections = await getPaginatedCollections(page) || []
    if (newCollections.length <= 15 ) showLoadMore = false
		collections = createUniqueArray(collections, newCollections);
	};

	onMount(async () => {
		count = (await getCollectionsCount()) || 0;
    showLoadMore = count > collections.length
	});
</script>

<PageNav currentPath="collections" objectType="collections" />
{#if collections}
	<Grid>
		{#each collections as collection}
			<CollectionCard {collection} />
		{/each}
	</Grid>
	{#if showLoadMore}
		<LoadMoreButton onClick={() => (page += 1)} />
	{/if}
{/if}
