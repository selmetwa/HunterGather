<script lang="ts">
	import { supabaseClient } from '$lib/supabase';
	import { onMount } from 'svelte';

	import { previewPanel } from '../../../store/store';
	import BlockCard from '../../../components/BlockCard.svelte';
	import CollectionCard from '../../../components/CollectionCard.svelte';
	import CollectionHeader from '../CollectionHeader.svelte';

	export let data: any;

	$: objects = [];
	$: ({ collectionId, collection } = data);

	$: if (collectionId) {
		loadData();
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

		if (!isMounted) {
			objects = interweave(blocks, collections);
		} else {
			objects = [];
			setTimeout(() => {
				objects = interweave(blocks, collections);
			}, 100);
		}
	};

	onMount(async () => {
		loadData();
		isMounted = true;
	});

	let gridRules: string
	previewPanel.subscribe(isOpen => {
	  gridRules = isOpen ? 'grid-cols-2' : 'sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'
	})
</script>

<CollectionHeader {collection} />
<main class="2xl:w-3/12 xl:w-4/12 lg:w-6/12 md:w-8/12 sm:w-8/12 bg-white p-4 lg:p-24 m-auto rounded mt-20">
	{#if !!objects.length}
		<div class={`grid gap-4 w-full ${gridRules}`}>
			{#each objects as object}
				{#if object.objectType === 'block'}
					<BlockCard block={object} />
				{:else}
					<CollectionCard collection={object} />
				{/if}
			{/each}
		</div>
	{:else}
		<div class="flex items-center border-2 border-gray-300 background-gray-200 text-center p-20">
			<p class="text-gray-400 m-auto">مـَفيش (māfeesh) / there is nothing</p>
		</div>
	{/if}
</main>

<style>
	main {
		width: 100%;
		margin: auto;
	}
</style>
