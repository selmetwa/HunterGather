<script lang="ts">
	import { onMount } from 'svelte';

	import type { Block } from '../../../types/block';
	import type { Collection } from '../../../types/collection';
	import { createUniqueArray } from '../../../utils/createUniqueArray';
	import getPaginatedCollectionItems from '../../../queries/collections/getPaginatedCollectionItems';
	import getCollectionCount from '../../../queries/collections/getCollectionCount';
	import BlockCard from '../../../components/Blocks/BlockCard.svelte';
	import Grid from '../../../components/ui/Grid.svelte';
	import CollectionCard from '../../../components/Collections/CollectionCard.svelte';
	import LoadMoreButton from '../../../components/ui/LoadMoreButton.svelte';
	import CollectionHeader from '../CollectionHeader.svelte';
	import ObjectViewButtons from '../../../components/Navigation/ObjectViewButtons.svelte';
	import FilterBar from '../../../components/ui/FilterBar.svelte';
  import Empty from '../../../components/ui/Empty.svelte';
	export let data: any;

	$: count = 0;
	$: objects = [] as (Block | Collection)[];
	$: masterObjects = [] as (Block | Collection)[];
	$: ({ collectionId, collection } = data);
  $: showLoadMore = false;

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
		masterObjects = [];
		loadData();
	}

	const loadData = async () => {
    const newObjects = await getPaginatedCollectionItems(collectionId, page, true) || []

    if (newObjects.length <= 15) showLoadMore = false
		masterObjects = createUniqueArray(
			masterObjects,
			newObjects,
		);

		objects = createUniqueArray(objects, masterObjects);
	};

	const handleFilter = (filterString: string) => {
		if (filterString.length === 0) {
			objects = masterObjects;
		}

		const filtered = masterObjects.filter((obj) => {
			if (obj.title && obj.title.toLowerCase().includes(filterString.toLowerCase())) {
				return true;
			}
			return false;
		});

		objects = [];
		setTimeout(() => {
			objects = filtered;
		}, 10);
	};

	const loadCount = async () => {
		count = await getCollectionCount(collectionId);
	};

	onMount(async () => {
		count = await getCollectionCount(collectionId);
    masterObjects = createUniqueArray(
			masterObjects,
			await getPaginatedCollectionItems(collectionId, page, true)
		);

		objects = createUniqueArray(objects, masterObjects);

    showLoadMore = count > objects.length
	});
</script>

<CollectionHeader {collection} {count} />

<main>
	<div
		class="my-8 sm:px-8 md:px-16 xl:px-24 flex justify-between items-center flex-col md:flex-row mb-12"
	>
		<FilterBar {handleFilter} />
		<ObjectViewButtons />
	</div>
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
		<Empty />
	{/if}
	{#if showLoadMore}
		<LoadMoreButton onClick={() => (page += 1)} />
	{/if}
</main>
