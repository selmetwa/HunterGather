<script>
	import { onMount } from 'svelte';

	import { createUniqueArray } from '../../utils/createUniqueArray';
	import getPaginatedCollections from '../../queries/collections/getPaginatedCollections';
	import getCollectionsCount from '../../queries/collections/getCollectionsCount';
	import Grid from '../../components/Grid.svelte';
	import LoadMoreButton from '../../components/LoadMoreButton.svelte';
	import ObjectTypeNav from '../../components/ObjectTypeNav.svelte';
	import CollectionCard from '../../components/CollectionCard.svelte';
	import SearchBar from '../../components/SearchBar.svelte';

	export let data;
	let { collections } = data;
	$: page = 0;
	$: count = 0;

	$: if (page) loadMore();

	const loadMore = async () => {
		collections = createUniqueArray(collections, await getPaginatedCollections(page, 5));
	};

	onMount(async () => {
		count = (await getCollectionsCount()) || 0;
	});
</script>

<div class="my-8 sm:px-8 md:px-16 xl:px-24 flex justify-between items-center flex-col md:flex-row">
	<ObjectTypeNav currentPath="collections" />
	<SearchBar currentPath="collections" />
</div>
{#if collections}
	<Grid>
		{#each collections as collection}
			<CollectionCard {collection} />
		{/each}
	</Grid>
	{#if collections.length < count}
		<LoadMoreButton onClick={() => (page += 1)} />
	{/if}
{/if}
