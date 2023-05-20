<script lang="ts">
  import { createUniqueArray } from '../utils/createUniqueArray';
  import getPaginatedCollectionItems from '../queries/collections/getPaginatedCollectionItems';
	import BlockCard from '../components/BlockCard.svelte';
	import CollectionCard from '../components/CollectionCard.svelte';
	import { previewPanel } from '../store/store';
	import LoadingSpinner from '../components/LoadingSpinner.svelte';
  import ObjectTypeNav from '../components/ObjectTypeNav.svelte';

	export let data: any;
	const count = data.count;
	let objects = data.items;
	let page = 0;
	let inProgress = false;

	let gridRules = '';
	previewPanel.subscribe((isPreviewPanelOpen) => {
		gridRules = isPreviewPanelOpen
			? 'grid-cols-2'
			: 'sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5';
	});

	$: if (page) loadMore();

	const loadMore = async () => {
		inProgress = true;
    objects = createUniqueArray(objects, await getPaginatedCollectionItems('', page, 15, false))
		inProgress = false;
	};

</script>

<svelte:head>
	<title>wwwabbit</title>
	<meta name="description" content="Wwwabbit" />
</svelte:head>
<section>
  <ObjectTypeNav currentPath='/' />
	<div class="xl:p-x-24 lg:p-x-16 md:p-x-16 p-8">
		<div class={`grid gap-2 md:gap-4 ${gridRules}`}>
			{#each objects as object}
				{#if object.objectType === 'block'}
					<BlockCard block={object} />
				{:else}
					<CollectionCard collection={object} />
				{/if}
			{/each}
		</div>
		{#if objects.length < count}
			<button
				class="font-bold font-sans group relative flex w-min justify-center rounded-md border border-transparent bg-action-400 hover:bg-action-500 py-2 px-4 text-lg font-medium text-white focus:outline-none focus:ring-2 focus:gray-300 focus:ring-offset-2 drop-shadow-sm ease-in-out duration-300 mt-24 whitespace-nowrap mx-auto"
				on:click={() => (page += 1)}
			>
				{#if inProgress}
					<LoadingSpinner />
				{/if}
				Load More
			</button>
		{/if}
	</div>
</section>
