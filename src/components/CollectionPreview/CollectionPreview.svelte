<script lang="ts">
	import { supabaseClient } from '$lib/supabase';
  import { previewPanel  } from '../../store/store';
	import { goto } from '$app/navigation';

	import BlockCard from '../BlockCard.svelte';
	import CollectionCard from '../CollectionCard.svelte';

  export let collectionId = '';

	$: objects = [];
	$: title = '';

	$: if (collectionId) {
		objects = [];
		loadData();
	}

	const loadData = async () => {
		console.log({ objects });
		const { data: collection } = await supabaseClient
			.from('collections')
			.select()
			.eq('collectionId', collectionId);

		title = collection && collection[0] && collection[0].title;
		console.log({ collection });

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

		objects = interweave(blocks, collections);
	};

	const close = () => {
		previewPanel.set(false);
	};

	const sendToFullPage = () => {
		close();
		goto(`/collection/${collectionId}`);
	};
</script>

<div class="overflow-scroll">
	<header class="flex justify-between border-b border-gray-200 py-4 px-10">
		<div class="flex gap-4">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<i
				on:click={sendToFullPage}
				class="fa-solid fa-up-right-and-down-left-from-center text-xl text-gray-400 hover:text-gray-300 hover:transition-all cursor-pointer" />
		</div>

		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<i
			class="fa-solid fa-xmark text-2xl text-gray-400 hover:text-gray-300 hover:transition-all cursor-pointer"
			id="close-modal-root"
			on:click={close}
		/>
	</header>
  <h1 class="font-sans text-left text-2xl font-light tracking-tight text-gray-400 ml-14 my-8">{title} Preview</h1>
	{#if !!objects.length}
		<div class={`grid gap-4 grid-cols-2 px-14`}>
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
</div>

 
