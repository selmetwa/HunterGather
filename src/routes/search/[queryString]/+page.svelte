<script>
	export let data;

	import { createUniqueArray } from '../../../utils/createUniqueArray';
	import paginatedBlocksBySearch from '../../../queries/search/paginatedBlocksBySearch';
	import paginatedCollectionsBySearch from '../../../queries/search/paginationCollectionsBySearch';
	import LoadMoreButton from '../../../components/ui/LoadMoreButton.svelte';
	import Grid from '../../../components/ui/Grid.svelte';
	import BlockCard from '../../../components/Blocks/BlockCard.svelte';
	import CollectionCard from '../../../components/Collections/CollectionCard.svelte';
	import PageNav from '../../../components/Navigation/PageNav.svelte';

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

<PageNav isSearchPage={true} {objectType} {searchTerm} {count} />
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
