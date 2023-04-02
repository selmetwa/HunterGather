<script lang="ts">
	import { supabaseClient } from '$lib/supabase';
	import { onMount } from 'svelte';

	import Masonry from '../../../components/Masonry.svelte';
	import BlockCard from '../../../components/BlockCard.svelte';
	import CollectionCard from '../../../components/CollectionCard.svelte';
	export let data: any;

  $: objects = [];
	$: ({ collectionId } = data);

  $: if (collectionId) {
    loadData()
  }

  let isMounted = false;
  const loadData = async () => {
		const { data: blocks } = await supabaseClient
			.from('blocks')
			.select()
			.contains('collectionIds', [`${collectionId}`]);
		const { data: collections } = await supabaseClient
			.from('collections')
			.select()
			.contains('collectionIds', [`${collectionId}`]);

		const interweave = (arr1: any, arr2: any) => {
			return arr1.reduce((acc: any, current: any, index: number) => {
				return [...acc, current, ...arr2.splice(0, arr1[index + 1] ? 2 : arr2.length)];
			}, []);
		};


    console.log({ objects})

    if (!isMounted) {
      objects = interweave(blocks, collections);
    } else {
      objects = [];
      setTimeout(() => {
        objects = interweave(blocks, collections);
      }, 100)
    }
  }

	onMount(async () => {
    loadData();
    isMounted = true;
	});
</script>
{#key collectionId}
<p>{collectionId}</p>
<div class="xl:p-x-24 lg:p-x-16 sm:p-8">
	<Masonry gridGap={'0.75rem'} colWidth={'minmax(Min(20em, 100%), 1fr)'} items={objects}>
		{#each objects as object}
			{#if object.objectType === 'block'}
				<BlockCard block={object} />
			{:else}
				<CollectionCard collection={object} />
			{/if}
		{/each}
	</Masonry>
</div>
{/key}

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
