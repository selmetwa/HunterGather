<script>
	export let data;

	import { createUniqueArray } from '../../../utils/createUniqueArray';
	import paginatedBlocksBySearch from '../../../queries/search/paginatedBlocksBySearch';
	import paginatedCollectionsBySearch from '../../../queries/search/paginationCollectionsBySearch';
	import LoadMoreButton from '../../../components/LoadMoreButton.svelte';
	import Grid from '../../../components/Grid.svelte';
	import BlockCard from '../../../components/BlockCard.svelte';
	import CollectionCard from '../../../components/CollectionCard.svelte';
	import SearchBar from '../../../components/SearchBar.svelte';
	import ObjectTypeNavSearch from '../../../components/ObjectTypeNavSearch.svelte';

	let page = 0;

	$: if (page) loadMore();

	$: ({ objects, count, objectType, searchTerm } = data);

	/**
	 * Weird workaround to reset objects when user changes search query
	 */
	$: if (searchTerm) {
		objects = [];
		setTimeout(() => {
			updateObjects();
		}, 100);
	}

	const updateObjects = () => {
		objects = data.objects;
	};

	const loadMore = async () => {
		if (objectType === 'blocks') {
			const blocks = await paginatedBlocksBySearch(data.searchTerm, page, 10);
			objects = createUniqueArray(objects, [...blocks.blocks]);

			return;
		}

		if (objectType === 'collections') {
			const collections = await paginatedCollectionsBySearch(data.searchTerm, page, 10);
			objects = createUniqueArray(objects, [...collections.collections]);

			return;
		}

		const blocks = await paginatedBlocksBySearch(data.searchTerm, page, 10);
		const collections = await paginatedCollectionsBySearch(data.searchTerm, page, 10);
		objects = createUniqueArray(objects, [...blocks.blocks, ...collections.collections]);
	};
</script>

<div class="my-8 sm:px-8 md:px-16 xl:px-24 flex justify-between items-center flex-col md:flex-row">
	<h1 class="font-sans text-left text-3xl font-light tracking-tight text-gray-400 my-6">
		{count} Search Results for <span class="text-action-400">{searchTerm}</span>
	</h1>
	<div>
		<ObjectTypeNavSearch {objectType} {searchTerm} />
		<SearchBar currentPath={objectType} />
	</div>
</div>
{#if objects.length > 0}
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
	<div
		class="flex items-center border-2 border-gray-300 background-gray-200 text-center p-20 w-8/12 m-auto"
	>
		<p class="text-gray-400 m-auto">مـَفيش (māfeesh) / there is nothing</p>
	</div>
{/if}

{#if objects.length < count}
	<LoadMoreButton onClick={() => (page += 1)} />
{/if}
