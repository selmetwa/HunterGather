<script>
  import { onMount } from 'svelte';
// @ts-nocheck
  import { createUniqueArray } from '../../utils/createUniqueArray.js';
  import getPaginatedBlocks from "../../queries/blocks/getPaginatedBlocks";
  import getBlocksCount from '../../queries/blocks/getBlocksCount';

  import Grid from '../../components/Grid.svelte';
  import BlockCard from '../../components/BlockCard.svelte';
  import LoadMoreButton from '../../components/LoadMoreButton.svelte';
  import ObjectTypeNav from '../../components/ObjectTypeNav.svelte';

  export let data;

  let blocks = data.blocks
  let page = 0;
  $: count = 0;

  $: if (page) loadMore();

  onMount(async () => {
    count = await getBlocksCount() || 0;
  })

  const loadMore = async () => {
    blocks = createUniqueArray(blocks, await getPaginatedBlocks(page, 15))
  }
</script>

<ObjectTypeNav currentPath='blocks' />
<Grid>
  {#each blocks as block}
    <BlockCard block={block} />
  {/each}
</Grid>
{#if blocks.length < count} 
  <LoadMoreButton onClick={() => page += 1} />
{/if}