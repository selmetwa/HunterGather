<script lang="ts">
  import { createUniqueArray } from '../utils/createUniqueArray';
  import getPaginatedCollectionItems from '../queries/collections/getPaginatedCollectionItems';
	import BlockCard from '../components/Blocks/BlockCard.svelte';
	import CollectionCard from '../components/Collections/CollectionCard.svelte';
  import Grid from '../components/ui/Grid.svelte';
  import LoadMoreButton from '../components/ui/LoadMoreButton.svelte';
  import PageNav from '../components/Navigation/PageNav.svelte';

	export let data: any;
	const count = data.count;
	let objects = data.items;
	let page = 0;

	$: if (page) loadMore();

	const loadMore = async () => {
    objects = createUniqueArray(objects, await getPaginatedCollectionItems('', page, 15, false))
	};
</script>

<svelte:head>
	<title>wwwabbit</title>
	<meta name="description" content="Wwwabbit" />
</svelte:head>
<section>
  <PageNav currentPath="/" objectType="" />
	<Grid>
    {#each objects as object}
    {#if object.objectType === 'block'}
      <BlockCard block={object} />
    {:else}
      <CollectionCard collection={object} />
    {/if}
  {/each}
  </Grid>
  {#if objects.length < count}
    <LoadMoreButton onClick={() => (page += 1)} />
  {/if}
</section>
