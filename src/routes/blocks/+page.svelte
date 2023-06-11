<script>
	import { onMount } from 'svelte';
	// @ts-nocheck
	import { createUniqueArray } from '../../utils/createUniqueArray.js';
	import getPaginatedBlocks from '../../queries/blocks/getPaginatedBlocks';
	import getBlocksCount from '../../queries/blocks/getBlocksCount';

	import Grid from '../../components/ui/Grid.svelte';
	import BlockCard from '../../components/Blocks/BlockCard.svelte';
	import LoadMoreButton from '../../components/ui/LoadMoreButton.svelte';
  import PageNav from '../../components/Navigation/PageNav.svelte';

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

<PageNav currentPath="blocks" objectType="blocks" />
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
