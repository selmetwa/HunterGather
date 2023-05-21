<script lang="ts">
  import { onMount } from "svelte";

  import { createUniqueArray } from "../../../../utils/createUniqueArray";
  import getCollectionsByUserId from "../../../../queries/user/getCollectionsByUserId";
  import getCollectionsCountByUserId from "../../../../queries/user/getCollectionsCountByUserId";
  import CollectionCard from "../../../../components/CollectionCard.svelte";
  import Grid from "../../../../components/Grid.svelte";
  import LoadMoreButton from "../../../../components/LoadMoreButton.svelte";
  import ProfileHeader from "../../ProfileHeader.svelte";

  interface Data {
		collections: Array<any>;
		userId: string;
	}

	export let data: Data;
  let collections = data.collections;
	let page = 0;

  $: count = 0;
	$: if (page) loadMore();

  const loadMore = async () => {
		collections = createUniqueArray(collections, await getCollectionsByUserId(data.userId, page, 10));
  }

  onMount(async () => {
		count = await getCollectionsCountByUserId(data.userId);
	});
</script>

<ProfileHeader userId={data.userId} />
<section>
  <div class="mt-8 ml-8">
    <a href={`/profile/blocks/${data.userId}`} class='text-blue-400 font-sans font-light color-blue'>Blocks</a> / <a href="#top" class='text-blue-400 font-sans font-bold color-blue'>Collections</a>
  </div>
  <Grid>
    {#each collections as collection}
    <CollectionCard {collection} />
  {/each}
  </Grid>
	{#if collections.length < count}
  <LoadMoreButton onClick={() => (page += 1)} />
	{/if}
</section>
