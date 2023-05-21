<script lang="ts">
	import { onMount } from 'svelte';

  import { createUniqueArray  } from '../../../utils/createUniqueArray';
	import getPaginatedCollectionItems from '../../../queries/collections/getPaginatedCollectionItems';
	import getCollectionCount from '../../../queries/collections/getCollectionCount';
	import BlockCard from '../../../components/BlockCard.svelte';
  import Grid from '../../../components/Grid.svelte';
	import CollectionCard from '../../../components/CollectionCard.svelte';
  import LoadMoreButton from '../../../components/LoadMoreButton.svelte';
	import CollectionHeader from '../CollectionHeader.svelte';
	export let data: any;

	$: count = 0;
	$: objects = [];
	$: ({ collectionId, collection } = data);
	let page = 0;

  /**
   * when user updates clicks load 
   * more page, load more data
  */
	$: if (page) {
		loadData();
	}

  /**
   * if the user navigates to a new collection reset 
   * page, count, objects, and load in new data
  */
	$: if (collectionId) {
		page = 0;
		loadCount();
		objects = [];
		loadData();
	}

	const loadData = async () => {
    objects = createUniqueArray(objects, await getPaginatedCollectionItems(collectionId, page, 5, true))
	};

	const loadCount = async () => {
		count = await getCollectionCount(collectionId);
	};

	onMount(async () => {
		loadData();
		loadCount();
	});
</script>

<CollectionHeader {collection} {count} />
<main class="xl:p-x-24 lg:p-x-16 md:p-x-16 p-8">
	{#if !!objects.length}
		<Grid>
			{#each objects as object}
				{#if object.objectType === 'block'}
					<BlockCard block={object} />
				{:else}
					<CollectionCard collection={object} />
				{/if}
			{/each}
		</Grid>
	{:else}
		<div class="flex items-center border-2 border-gray-300 background-gray-200 text-center p-20">
			<p class="text-gray-400 m-auto">مـَفيش (māfeesh) / there is nothing</p>
		</div>
	{/if}
	{#if objects.length < count}
		<LoadMoreButton onClick={() => page += 1} />
	{/if}
</main>
