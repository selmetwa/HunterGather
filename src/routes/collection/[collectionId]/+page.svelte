<script lang="ts">
	import { onMount } from 'svelte';

  import { createUniqueArray  } from '../../../utils/createUniqueArray';
	import getPaginatedCollectionItems from '../../../queries/collections/getPaginatedCollectionItems';
	import getCollectionCount from '../../../queries/collections/getCollectionCount';
	import { previewPanel } from '../../../store/store';
	import BlockCard from '../../../components/BlockCard.svelte';
	import CollectionCard from '../../../components/CollectionCard.svelte';
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

	let gridRules: string;
	previewPanel.subscribe((isOpen) => {
		gridRules = isOpen
			? 'grid-cols-2'
			: 'sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5';
	});
</script>

<CollectionHeader {collection} {count} />
<main class="xl:p-x-24 lg:p-x-16 md:p-x-16 p-8">
	{#if !!objects.length}
		<div class={`grid gap-4 w-full ${gridRules}`}>
			{#each objects as object}
				{#if object.objectType === 'block'}
					<BlockCard block={object} />
				{:else}
					<CollectionCard collection={object} />
				{/if}
			{/each}
		</div>
	{:else}
		<div class="flex items-center border-2 border-gray-300 background-gray-200 text-center p-20">
			<p class="text-gray-400 m-auto">مـَفيش (māfeesh) / there is nothing</p>
		</div>
	{/if}
	{#if objects.length < count}
		<button
			class="font-bold font-sans group relative flex w-min justify-center rounded-md border border-transparent bg-action-400 hover:bg-action-500 py-2 px-4 text-lg font-medium text-white focus:outline-none focus:ring-2 focus:gray-300 focus:ring-offset-2 drop-shadow-sm ease-in-out duration-300 mt-24 whitespace-nowrap mx-auto"
			on:click={() => (page += 1)}
		>
			Load More
		</button>
	{/if}
</main>
