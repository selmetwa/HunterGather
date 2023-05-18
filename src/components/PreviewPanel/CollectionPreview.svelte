<script lang="ts">
	import { supabaseClient } from '$lib/supabase';

  import { createUniqueArray } from '../../utils/createUniqueArray';
  import getCollection from '../../queries/collections/getCollection';
  import getCollectionCount from '../../queries/collections/getCollectionCount';
  import getPaginatedCollectionItems from '../../queries/collections/getPaginatedCollectionItems';
	import BlockCard from '../BlockCard.svelte';
	import CollectionCard from '../CollectionCard.svelte';

	export let collectionId = '';
	let page = 0;
	$: count = 0;
	$: objects = [];
	$: title = '';

	$: if (page) {
		loadData();
	}

	$: if (collectionId) {
		page = 0;
		objects = [];
    loadCount();
		loadData();
	}

	const loadCount = async () => {
		count = await getCollectionCount(collectionId)
	};

	const loadData = async () => {
    const collection = await getCollection(collectionId)
		title = collection && collection[0] && collection[0].title;
    objects = createUniqueArray(objects, await getPaginatedCollectionItems(collectionId, page, 5, true))
	};
</script>

<div>
	<h1 class="font-sans text-left text-2xl font-light tracking-tight text-gray-400 my-4">
		{title} Preview
	</h1>
	{#if !!objects.length}
		<div class={`grid gap-4 grid-cols-2`}>
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
</div>
