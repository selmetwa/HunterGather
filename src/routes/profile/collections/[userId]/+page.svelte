<script lang="ts">
  import { onMount } from "svelte";

	import { previewPanel } from '../../../../store/store';
  import { createUniqueArray } from "../../../../utils/createUniqueArray";
  import getCollectionsByUserId from "../../../../queries/user/getCollectionsByUserId";
  import getCollectionsCountByUserId from "../../../../queries/user/getCollectionsCountByUserId";
  import CollectionCard from "../../../../components/CollectionCard.svelte";
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

  console.log({ data })
  let gridRules: string;
	previewPanel.subscribe((isPreviewPanelOpen: boolean) => {
		gridRules = isPreviewPanelOpen
			? 'grid-cols-2'
			: 'sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5';
	});
</script>

<ProfileHeader />
<section>
  <div class="mt-8 ml-8">
    <a href={`/profile/blocks/${data.userId}`} class='text-blue-400 font-sans font-light color-blue'>Blocks</a> / <a href="#top" class='text-blue-400 font-sans font-bold color-blue'>Collections</a>
  </div>
	<div class="xl:p-x-24 lg:p-x-16 sm:p-8">
		<div class={`grid gap-4 ${gridRules}`}>
			{#each collections as collection}
				<CollectionCard {collection} />
			{/each}
		</div>
	</div>
	{#if collections.length < count}
		<button
			class="font-bold font-sans group relative flex w-min justify-center rounded-md border border-transparent bg-action-400 hover:bg-action-500 py-2 px-4 text-lg font-medium text-white focus:outline-none focus:ring-2 focus:gray-300 focus:ring-offset-2 drop-shadow-sm ease-in-out duration-300 my-24 whitespace-nowrap mx-auto"
			on:click={() => (page += 1)}
		>
			Load More
		</button>
	{/if}
</section>
<!-- <h1>collections</h1>
<h1>{count}</h1> -->