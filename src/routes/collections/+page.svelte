<script>
	import { onMount } from 'svelte';

	import { createUniqueArray } from '../../utils/createUniqueArray';
	import getPaginatedCollections from '../../queries/collections/getPaginatedCollections';
	import getCollectionsCount from '../../queries/collections/getCollectionsCount';
	import Grid from '../../components/Grid.svelte';
	import LoadMoreButton from '../../components/LoadMoreButton.svelte';
	import ObjectTypeNav from '../../components/ObjectTypeNav.svelte';
	import CollectionCard from '../../components/CollectionCard.svelte';

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

<ObjectTypeNav currentPath="collections" />

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