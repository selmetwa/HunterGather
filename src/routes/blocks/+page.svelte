<script>
	import { onMount } from 'svelte';
	// @ts-nocheck
	import { createUniqueArray } from '../../utils/createUniqueArray.js';
	import getPaginatedBlocks from '../../queries/blocks/getPaginatedBlocks';
	import getBlocksCount from '../../queries/blocks/getBlocksCount';

	import Grid from '../../components/Grid.svelte';
	import BlockCard from '../../components/BlockCard.svelte';
	import LoadMoreButton from '../../components/LoadMoreButton.svelte';
	import ObjectTypeNav from '../../components/ObjectTypeNav.svelte';
  import SearchBar from '../../components/SearchBar.svelte';

	export let data;

	let blocks = data.blocks;
	let page = 0;
	$: count = 0;

	$: if (page) loadMore();

	onMount(async () => {
		count = (await getBlocksCount()) || 0;
	});

	const loadMore = async () => {
		blocks = createUniqueArray(blocks, await getPaginatedBlocks(page, 15));
	};
</script>

<div class="my-8 sm:px-8 md:px-16 xl:px-24 flex justify-between">
  <ObjectTypeNav currentPath='blocks' />
  <SearchBar currentPath="blocks" />
</div>
{#if blocks}
	<Grid>
		{#each blocks as block}
			<BlockCard {block} />
		{/each}
	</Grid>
	{#if blocks.length < count}
		<LoadMoreButton onClick={() => (page += 1)} />
	{/if}
{/if}
