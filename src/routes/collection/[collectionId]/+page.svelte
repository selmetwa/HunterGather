<script lang="ts">
  import Masonry from "../../../components/Masonry.svelte";
  import BlockCard from "../../../components/BlockCard.svelte";
	export let data: any;

  
	console.log({ data });

  const { blocks, collectionId } = data;
</script>


<div class="xl:p-x-24 lg:p-x-16 sm:p-8">
  <Masonry gridGap={'0.75rem'} colWidth={'minmax(Min(20em, 100%), 1fr)'} items={blocks}>
    {#each blocks as block}
      <BlockCard {block} />
    {/each}
  </Masonry>
</div>


<style>
	main {
		width: 100%;
		margin: auto;
	}

	._padding {
		padding: 12px;
	}

	._card {
		border: 1px solid #ccc;
	}

	img {
		width: 100%;
		height: auto;
	}
</style>
