<script lang="ts">
	import { onMount } from 'svelte';
	import { createUniqueArray } from '../utils/createUniqueArray';
	import getPaginatedCollectionItems from '../queries/collections/getPaginatedCollectionItems';
	import BlockCard from '../components/Blocks/BlockCard.svelte';
	import CollectionCard from '../components/Collections/CollectionCard.svelte';
	import Grid from '../components/ui/Grid.svelte';
	import LoadMoreButton from '../components/ui/LoadMoreButton.svelte';
	import PageNav from '../components/Navigation/PageNav.svelte';

	export let data: any;
	const count = data.count;
	let objects = data.items;
	let page = 0;

	$: if (page) loadMore();
  $: showLoadMore = false;

  onMount(() => {
    showLoadMore = count > objects.length
  })

	const loadMore = async () => {
    const newObjects = await getPaginatedCollectionItems('', page, false);
    if (newObjects.length <= 15) showLoadMore = false
		objects = createUniqueArray(objects, newObjects);
	};
</script>

<svelte:head>
	<title>HunterGather</title>
	<meta name="description" content="HunterGather" />
</svelte:head>

<section>
	<PageNav currentPath="/" objectType="" />
	<Grid>
		{#each objects as object}
			{#if object.objectType === 'block'}
				<BlockCard block={object} />
			{:else}
				<CollectionCard collection={object} />
			{/if}
		{/each}
	</Grid>
	{#if showLoadMore}
		<LoadMoreButton onClick={() => (page += 1)} />
	{/if}
</section>
