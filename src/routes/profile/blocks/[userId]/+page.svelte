<script lang="ts">
	import { onMount } from 'svelte';

	import BlockCard from '../../../../components/BlockCard.svelte';
	import { createUniqueArray } from '../../../../utils/createUniqueArray';
	import getBlocksByUserId from '../../../../queries/user/getBlocksByUserId';
	import getBlocksCountByUserId from '../../../../queries/user/getBlocksCountByUserId';
	import Grid from '../../../../components/Grid.svelte';
	import LoadMoreButton from '../../../../components/LoadMoreButton.svelte';
	import ProfileHeader from '../../ProfileHeader.svelte';
  import ObjectViewButtons from '../../../../components/ObjectViewButtons.svelte';
  import FilterBar from '../../../../components/FilterBar.svelte';

	interface Data {
		blocks: Array<any>;
		userId: string;
	}

	export let data: Data;
	let blocks = data.blocks;
	let masterBlocks = data.blocks;
	let page = 0;

	$: count = 0;
	$: if (page) loadMore();

	onMount(async () => {
		count = await getBlocksCountByUserId(data.userId);
	});

	const loadMore = async () => {
		blocks = createUniqueArray(blocks, await getBlocksByUserId(data.userId, page, 15));
    masterBlocks = createUniqueArray(blocks, await getBlocksByUserId(data.userId, page, 15));
	};

  const handleFilter = (filterString: string) => {
    if (filterString.length === 0) {
      blocks = masterBlocks
    }

    const filtered = masterBlocks.filter(obj => {
      if (obj.title && obj.title.toLowerCase().includes(filterString.toLowerCase())) {  
        return true;
      }
      return false;
    });

    blocks = []
    setTimeout(() => {
      blocks = filtered
    }, 100)
  }
</script>

<ProfileHeader userId={data.userId} />
<div class="my-8 sm:px-8 md:px-16 xl:px-24 flex justify-between items-center flex-col md:flex-row">
  <div>
    <a href="#top" class="text-blue-400 font-sans font-medium color-blue">Blocks</a> /
    <a
      href={`/profile/collections/${data.userId}`}
      class="text-blue-400 font-sans font-light color-blue">Collections</a
    >
    <FilterBar {handleFilter} />
  </div>
  <ObjectViewButtons />
</div>
<Grid>
	{#each blocks as block}
		<BlockCard {block} />
	{/each}
</Grid>
{#if blocks.length < count}
	<LoadMoreButton onClick={() => (page += 1)} />
{/if}
