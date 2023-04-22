  <script lang="ts">
	// import { supabaseClient } from '$lib/supabase';
	// import { onMount } from 'svelte';
  import { page } from '$app/stores';
	import { scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { 
    collectingModal, 
    objectToCollect,
    previewPanel,
    previewPanelObject
  } from '../store/store';
	export let block: any;

	const { src, title, url, blockId, userId } = block;

  const activeSession = $page?.data?.session;
	let hovering = false;
	let requested = false;

	const enter = () => {
		hovering = true;
		if (!requested) {
			requested = true;
		}
	};

	const leave = () => (hovering = false);

	const toggleCollectingModal = () => {
    if (activeSession) {
      collectingModal.set(true);
  		objectToCollect.set(block);
    } else {
      alert('You must have a registered account to do that')
    }
	};

  const togglePreview = (e: any) => {
    if (e.target.id !== 'collect-button') {
      previewPanel.set(true);
		  previewPanelObject.set({
        type: 'block',
        object: block
      });
    }
  }
</script>

<div>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="card border border-gray-500" on:mouseenter={enter} on:mouseleave={leave}>
    <button on:click={togglePreview}>
      <img class="w-full" {src} alt={title} />
    </button>
		{#if hovering}
			<div
				in:scale={{ duration: 150, easing: quintOut, opacity: 0 }}
				class="absolute border-black shadow-md top-0 m-auto z-50 bg-white shadow-xl p-6 w-full cursor-default"
			>
				<div class="w-full flex gap-4">
					<a href={url} target="_blank" class="w-full">
						<button
							type="button"
							class="font-sans group relative flex w-full justify-center rounded-sm border border-transparent bg-gray-200 py-2 px-4 text-md font-medium text-gray-500 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:gray-300 focus:ring-offset-2 drop-shadow-sm ease-in-out duration-300"
							>Source</button
						>
					</a>
					<button
						type="button"
						class="font-sans group relative flex w-full justify-center rounded-sm border border-transparent bg-gray-200 py-2 px-4 text-md font-medium text-gray-500 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:gray-300 focus:ring-offset-2 drop-shadow-sm ease-in-out duration-300"
            id="collect-button"
						on:click={toggleCollectingModal}>Collect</button
					>
				</div>
			</div>
		{/if}
	</div>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="py-2">
    <button on:click={togglePreview}>
		  <h2 class="title text-text-100">{title}</h2>
    </button>
	</div>
</div>

<style>
	.card {
		position: relative;
	}

	.card:hover {
		cursor: pointer;
	}

	img {
		width: 100%;
		aspect-ratio: 4/3;
	}

	.title {
		overflow: hidden;
		line-height: 1.4rem;
		-webkit-box-orient: vertical;
		display: block;
		display: -webkit-box;
		overflow: hidden !important;
		text-overflow: ellipsis;
		-webkit-line-clamp: 2;
	}
</style>
