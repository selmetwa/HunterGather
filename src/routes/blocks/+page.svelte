<script lang="ts">
	import { onMount } from 'svelte';

	import type { Block } from '../../types/block';
	import { createUniqueArray } from '../../utils/createUniqueArray.js';
	import getPaginatedBlocks from '../../queries/blocks/getPaginatedBlocks';
	import getBlocksCount from '../../queries/blocks/getBlocksCount';
	import Grid from '../../components/ui/Grid.svelte';
	import BlockCard from '../../components/Blocks/BlockCard.svelte';
	import LoadMoreButton from '../../components/ui/LoadMoreButton.svelte';
	import PageNav from '../../components/Navigation/PageNav.svelte';

	export let data;

	let blocks = data.blocks as Block[];
	let page = 0;
	$: count = 0;
  $: showLoadMore = false;
	$: if (page) loadMore();

	onMount(async () => {
		count = (await getBlocksCount()) || 0;
    showLoadMore = count > blocks.length;
	});

	const loadMore = async () => {
    const newBlocks = await getPaginatedBlocks(page) || [];
    if (newBlocks?.length <= 15) {
      showLoadMore = false
    }
		blocks = createUniqueArray(blocks, newBlocks);
	};
</script>

<PageNav currentPath="blocks" objectType="blocks" />
{#if blocks}
	<Grid>
		{#each blocks as block}
			<BlockCard {block} />
		{/each}
	</Grid>
	{#if showLoadMore}
		<LoadMoreButton onClick={() => (page += 1)} />
	{/if}
{/if}
