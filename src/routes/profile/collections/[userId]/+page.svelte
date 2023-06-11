<script lang="ts">
	import { onMount } from 'svelte';

	import { createUniqueArray } from '../../../../utils/createUniqueArray';
	import getPaginatedCollectionsByUserId from '../../../../queries/user/getPaginatedCollectionsByUserId';
	import getCollectionsCountByUserId from '../../../../queries/user/getCollectionsCountByUserId';
	import CollectionCard from '../../../../components/Collections/CollectionCard.svelte';
	import Grid from '../../../../components/ui/Grid.svelte';
	import LoadMoreButton from '../../../../components/ui/LoadMoreButton.svelte';
	import ProfileHeader from '../../ProfileHeader.svelte';
	import ObjectViewButtons from '../../../../components/Navigation/ObjectViewButtons.svelte';
  import FilterBar from '../../../../components/ui/FilterBar.svelte';

	interface Data {
		collections: Array<any>;
		userId: string;
	}

	export let data: Data;
	let collections = data.collections;
	let masterCollections = data.collections;
	let page = 0;

	$: count = 0;
	$: if (page) loadMore();

	const loadMore = async () => {
    masterCollections = createUniqueArray(
			masterCollections,
			await getPaginatedCollectionsByUserId(data.userId, page, 10)
		);

    collections = createUniqueArray(collections, masterCollections)
	};

  const handleFilter = (filterString: string) => {
    if (filterString.length === 0) {
      collections = masterCollections
    }

    const filtered = masterCollections.filter(obj => {
      if (obj.title && obj.title.toLowerCase().includes(filterString.toLowerCase())) {  
        return true;
      }
      return false;
    });

    collections = []
    setTimeout(() => {
      collections = filtered
    }, 10)
  }

	onMount(async () => {
		count = await getCollectionsCountByUserId(data.userId);
	});
</script>

<ProfileHeader userId={data.userId} />
<section>
	<div
		class="my-8 sm:px-8 md:px-16 xl:px-24 flex justify-between items-center flex-col md:flex-row mb-12"
	>
		<div>
			<a
				href={`/profile/blocks/${data.userId}`}
				class="text-blue-400 font-sans font-light color-blue">Blocks</a
			>
			/ <a href="#top" class="text-blue-400 font-sans font-medium color-blue">Collections</a>
      <FilterBar {handleFilter} />
		</div>
		<ObjectViewButtons />
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
