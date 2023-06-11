<script lang="ts">
  import type { Block } from '../../types/block';
  import type { Collection } from '../../types/collection';
	import { createUniqueArray } from '../../utils/createUniqueArray';
	import getCollection from '../../queries/collections/getCollection';
	import getCollectionCount from '../../queries/collections/getCollectionCount';
	import getPaginatedCollectionItems from '../../queries/collections/getPaginatedCollectionItems';
	import BlockCard from '../Blocks/BlockCard.svelte';
	import CollectionCard from '../Collections/CollectionCard.svelte';
	import LoadMoreButton from '../ui/LoadMoreButton.svelte';
	import { objectView } from '../../store/store';

	export let collectionId = '';
	let page = 0;
	$: count = 0;
	$: objects = [] as (Block | Collection)[];
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
		count = await getCollectionCount(collectionId);
	};

	const loadData = async () => {
		const collection = await getCollection(collectionId);
		title = collection && collection[0] && collection[0].title;
		objects = createUniqueArray(
			objects,
			await getPaginatedCollectionItems(collectionId, page, 5, true)
		);
	};
</script>

<div>
	<h1 class="font-sans text-left text-2xl font-light tracking-tight text-gray-400 my-4">
		<span class="text-action-400">{title}</span> preview
	</h1>
	{#if !!objects.length}
		{#if ['card', 'two-up'].includes($objectView)}
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
			<section class="flex flex-col gap-6 gap-4">
				{#each objects as object}
					{#if object.objectType === 'block'}
						<BlockCard block={object} />
					{:else}
						<CollectionCard collection={object} />
					{/if}
				{/each}
			</section>
		{/if}
	{:else}
		<div class="flex items-center border-2 border-gray-300 background-gray-200 text-center p-20">
			<p class="text-gray-400 m-auto">مـَفيش (māfeesh) / there is nothing</p>
		</div>
	{/if}
	{#if objects.length < count}
		<LoadMoreButton onClick={() => (page += 1)} />
	{/if}
</div>
