<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
	import { supabaseClient } from '$lib/supabase';
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	import { 
    collectingModal, 
    objectToCollect, 
    previewPanel,
    previewPanelObject
  } from '../store/store';

  const activeSession = $page?.data?.session;
	export let collection: any;
  export let isRow = false;
	let hovering = false;
	let requested = false;

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

	let author = 'author';
	let count = 0;

	onMount(async () => {
		const { data } = await supabaseClient.from('users').select().eq('id', userId);
		const { count: queryCount } = await supabaseClient
			.from('blocks')
			.select('*', { count: 'exact', head: true })
			.contains('collectionIds', [`${collectionId}`]);
		author = data && data[0] && data[0].name;

    if (queryCount) count = queryCount;
	});

	const toggleCollectingModal = () => {
    if (activeSession) {
      collectingModal.set(true);
		  objectToCollect.set(collection);
    } else {
      alert('You must have a registered account to do that')
    }
	};

  const togglePreview = () => {
    const isMobile = window.innerWidth <= 1100;
    if (isMobile) {
      goto(`/collection/${collectionId}`)
      return
    }
  
    previewPanel.set(true);
    previewPanelObject.set({
      type: 'collection',
      object: { id: collectionId }
    });
  }
</script>

	<div class={`${isRow ? 'row bg-gray-200 border border-gray-300 flex row py-4' : 'card aspect-4/3'} transition-all bg-gray-100 border-2 border-gray-300 hover:bg-gray-200 relative`} on:mouseenter={enter} on:mouseleave={leave}>
		{#if hovering && !isRow}
			<div
				in:scale={{ duration: 150, easing: quintOut, opacity: 0 }}
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
        <div class={`${isRow ? 'row-content flex flex-row px-4 justify-between border' : 'text-center'}`}>
          <div>
            <h1 class={`${isRow ? 'whitespace-nowrap text-ellipsis line-clamp-1 truncate' : 'whitespace-normal m-auto'} font-sans text-gray-500 font-semibold text-xl w-10/12`}>{title}</h1>
            {#if !isRow}
              <p class={`${isRow ? 'mt-0' : 'mt-2'} font-sans text-gray-500`}>{author}</p>
            {/if}
          </div>
          <p class="font-sans text-gray-600">{count}</p>
        </div>
      </a>
	</div>
