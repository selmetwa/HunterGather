<script lang="ts">
	import { goto } from '$app/navigation';
  import { createUniqueArray } from '../utils/createUniqueArray';
  import getPaginatedCollectionItems from '../queries/collections/getPaginatedCollectionItems';
	import BlockCard from '../components/BlockCard.svelte';
	import CollectionCard from '../components/CollectionCard.svelte';
  import ObjectTypeNav from '../components/ObjectTypeNav.svelte';
  import Grid from '../components/Grid.svelte';
  import LoadMoreButton from '../components/LoadMoreButton.svelte';
  import SearchBar from '../components/SearchBar.svelte';

	export let data: any;
	const count = data.count;
	let objects = data.items;
	let page = 0;
	let inProgress = false;
  $: searchQuery = '';

	$: if (page) loadMore();

	const loadMore = async () => {
		inProgress = true;
    objects = createUniqueArray(objects, await getPaginatedCollectionItems('', page, 15, false))
		inProgress = false;
	};

  const handleSearch = () => {
    goto(`/search/${encodeURIComponent(searchQuery.trim().toLowerCase())}`)
  }

  const handleSearchByPress = (q: string) => {
    goto(`/search/${encodeURIComponent(q.trim().toLowerCase())}`)
  }
</script>

<svelte:head>
	<title>wwwabbit</title>
	<meta name="description" content="Wwwabbit" />
</svelte:head>
<section>
  <div class="my-8 sm:px-8 md:px-16 xl:px-24 flex justify-between">
    <ObjectTypeNav currentPath='/' />
    <SearchBar {searchQuery} updateSearch={(e) => searchQuery = e.target.value} {handleSearch} {handleSearchByPress} />
  </div>
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
