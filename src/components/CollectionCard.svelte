<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { supabaseClient } from '$lib/supabase';
	import { onMount } from 'svelte';
	import { scale, fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
  import Device from 'svelte-device-info';

	import getCollectionCount from '../queries/collections/getCollectionCount';
	import CollectionCardRow from './CollectionCardRow.svelte';
	import {
    authModal,
		collectingModal,
		objectToCollect,
		previewPanel,
		previewPanelObject,
    objectView
	} from '../store/store';
  import { formatDate } from '../utils/formatDate';
	export let collection: any;
  export let isRow = false;

	const activeSession = $page?.data?.session;
  const isMobile = Device.isMobile;
	let hovering = false;
	let requested = false;
	let author = 'author';
	let count = 0;
	let date = '';

	const enter = () => {
		hovering = true;
		if (!requested) {
			requested = true;
		}
	};

	const leave = () => (hovering = false);
	const collectionId = collection?.collectionId;
	const title = collection?.title;
	const userId = collection?.userId;

	onMount(async () => {
		const { data } = await supabaseClient.from('users').select().eq('id', userId);
		author = data && data[0] && data[0].name;

		count = await getCollectionCount(collectionId);
	});

	const toggleCollectingModal = () => {
		if (activeSession) {
			collectingModal.set(true);
			objectToCollect.set(collection);
		} else {
      authModal.set(true)
		}
	};

	const togglePreview = () => {
		if (isMobile) {
			goto(`/collection/${collectionId}`);
			return;
		}

		previewPanel.set(true);
		previewPanelObject.set({
			type: 'collection',
			object: { id: collectionId }
		});
	};
</script>

{#if ($objectView === 'row' || isRow)}
	<CollectionCardRow {count} {collectionId} {title} {author} {userId} {toggleCollectingModal} {togglePreview} date={formatDate(collection?.created_at)} />
{:else}
	<div
		class="card aspect-4/3 transition-all bg-gray-100 border-2 border-gray-300 hover:bg-gray-200 relative"
		on:mouseenter={enter}
		on:mouseleave={leave}
    in:fade
	>
		{#if hovering && !isMobile}
			<div
      transition:scale={{ duration: 400, easing: quintOut, opacity: 0 }}
      class="absolute border shadow-md top-0 m-auto z-50 bg-white shadow-xl p-6 w-full cursor-default rounded-md"
			>
				<div class="w-full flex gap-4">
					<button
						type="button"
						class="font-sans group z-50 relative flex w-full justify-center rounded-sm border border-transparent bg-gray-200 py-2 px-4 text-md font-medium text-gray-500 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:gray-300 focus:ring-offset-2 drop-shadow-sm ease-in-out duration-300"
						on:click={toggleCollectingModal}>Collect</button
					>
					<button
						type="button"
						class="font-sans group z-50 relative flex w-full justify-center rounded-sm border border-transparent bg-gray-200 py-2 px-4 text-md font-medium text-gray-500 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:gray-300 focus:ring-offset-2 drop-shadow-sm ease-in-out duration-300"
						on:click={togglePreview}>Preview</button
					>
				</div>
			</div>
		{/if}
		<a href={`/collection/${collectionId}`} class="flex items-center justify-center h-full w-full">
			<div
				class="text-center"
			>
				<div>
					<h1
						class="font-sans text-gray-500 font-semibold text-xl w-10/12 whitespace-normal m-auto break-words"
					>
						{title}
					</h1>
					<p class="font-sans text-gray-500">{author}</p>
				</div>
        <div class="absolute top-0 right-0 h-6 w-6 p-4 bg-gray-300 flex items-center justify-center">
          <p class="font-sans font-medium text-gray-500">{count}</p>
        </div>
        {#if collection.created_at}
          <p class="font-sans font-light text-gray-400">{formatDate(collection.created_at)}</p>
        {/if}
			</div>
		</a>
	</div>
{/if}
