<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import {
		collectingModal,
		objectToCollect,
		previewPanel,
		previewPanelObject
	} from '../store/store';

  import BlockCardRow from './BlockCardRow.svelte';
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
			alert('You must have a registered account to do that');
		}
	};

	const togglePreview = (e: any) => {
		const isMobile = window.innerWidth <= 1100;
		if (isMobile) {
			goto(`/block/${block.blockId}`);
			return;
		}

		if (e.target.id !== 'collect-button') {
			previewPanel.set(true);
			previewPanelObject.set({
				type: 'block',
				object: block
			});
		}
	};

  let test = true
</script>

{#if test}
  <BlockCardRow {title} {blockId} {src} {url} {toggleCollectingModal} {togglePreview} />
  {:else}
  <div>
    <div class="relative" on:mouseenter={enter} on:mouseleave={leave}>
    <a href={`/block/${blockId}`} class="relative">
      <img class="w-full aspect-4/3 border-2 border-gray-300" {src} alt={title} />
    </a>
    {#if hovering}
      <div
        in:scale={{ duration: 150, easing: quintOut, opacity: 0 }}
        class="absolute border shadow-md top-0 m-auto z-50 bg-white shadow-xl p-6 w-full cursor-default rounded-md"
      >
        <div class="w-full flex gap-4">
          <button
            type="button"
            class="font-sans group relative flex w-full justify-center rounded-sm border border-transparent bg-gray-200 py-2 px-4 text-md font-medium text-gray-500 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:gray-300 focus:ring-offset-2 drop-shadow-sm ease-in-out duration-300"
            id="collect-button"
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
    </div>
    <div class="py-2 inline-block">
      <a href={`/block/${blockId}`} class="flex items-center justify-center h-full w-full">
        <h2 class="text-gray-500 text-left line-clamp-2">{title}</h2>
      </a>
    </div>
  </div>
{/if}
