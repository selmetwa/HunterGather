<script lang="ts">
  import Masonry from "../../../components/Masonry.svelte";
	export let data: any;

  
	console.log({ data });

  const { blocks, collectionId } = data;
</script>


<Masonry gridGap={'0.75rem'} colWidth={'minmax(Min(20em, 100%), 1fr)'} items={blocks}>
  {#each blocks as o}
    <div class="_card _padding">
      <header>
        <h3>{o.title}</h3>
      </header>
      <img src={o.src} />
    </div>
  {/each}
</Masonry>

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
