<script>
	// @ts-nocheck
	import Device from 'svelte-device-info';
	import { page } from '$app/stores';
	import { createLoadObserver } from '../../../utils/watchImage';

	import getCollection from '../../../queries/collections/getCollection';
	import getUserById from '../../../queries/user/getUserById';
	import {
		authModal,
		collectingModal,
		objectToCollect,
		previewPanel,
		deleteModalObject,
		isDeleteModalOpen
	} from '../../../store/store';
	import CollectionCard from '../../../components/Collections/CollectionCard.svelte';
	import LoadingSpinner from '../../../components/ui/LoadingSpinner.svelte';
  import { supabaseClient } from '$lib/supabase';
	import { onMount } from 'svelte';
  import { getScreenshot } from '../../../utils/getScreenshot';

	export let data;

	const userId = $page?.data?.session?.user?.id;
	const block = data && data.block && data.block[0];

	const activeSession = $page?.data?.session;
	const isOwner = userId === block.userId;
	const isMobile = Device.isMobile;

	$: collections = [];
	let author;
	let authorId;
	let title;
	$: url = '';

	$: if (block) loadData();

  $: screenshot = '';

	const openCollectingModal = () => {
		if (activeSession) {
			collectingModal.set(true);
			objectToCollect.set(block);
		} else {
			authModal.set(true);
		}
	};

	const loadData = async () => {
		const user = await getUserById(block.userId);

		title = block.title;
		author = user && user[0] && user[0].name;
		authorId = user && user[0] && user[0].id;
		url = block.url;
    screenshot = (await getScreenshot(block.src)) || '';
  
		// fetch collections
		let collectionIds = block.collectionIds;
		collectionIds.forEach(async (id) => {
			const collection = await getCollection(id);
			if (collection[0] !== undefined) {
				collections.push(collection[0]);
			}
			collections = collections;
		});
	};

	let gridRules = '';
	previewPanel.subscribe((isPreviewPanelOpen) => {
		gridRules = isPreviewPanelOpen ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4';
	});

	const openDeleteModal = () => {
		deleteModalObject.set({ type: 'block', object: block });
		isDeleteModalOpen.set(true);
	};

	$: didImageLoad = false;

	const onload = createLoadObserver(() => {
		setTimeout(() => {
			didImageLoad = true;
		}, 300);
	});
</script>

<div class="px-8 md:px-16 xl:px-24 mb-24">
	<div class={`content my-16 gap-8 flex flex-col flex-col-reverse lg:grid ${gridRules} w-full`}>
		<div class="col-span-1 lg:col-span-2 2xl:col-span-3 lg:order-1">
			{#if isMobile}
				<a href={url} target="_blank" rel="noreferrer">
					{#if !didImageLoad}
						<div class="h-full w-full flex items-center justify-center">
							<div class="flex items-center">
								<LoadingSpinner />
								<p class="text-gray-400 text-xl">Loading image</p>
							</div>
						</div>
					{/if}
					<img
						alt={title}
						src={screenshot}
						class={`h-auto w-[350px] object-fit border-2 border-gray-200 ${
							!didImageLoad ? 'hidden' : ''
						}`}
						use:onload
					/>
				</a>
			{:else if url && screenshot}
				<object
					{title}
					data={url}
					style="width: 100%; display: block;"
					class="h-[500px] lg:h-[600px] 2xl:h-[700px] border-4 border-gray-300 relative"
				>
					<a href={url} target="_blank" rel="noreferrer">
						{#if !didImageLoad}
							<div class="h-full w-full flex items-center justify-center">
								<div class="flex items-center">
									<LoadingSpinner />
									<p class="text-gray-400 text-xl">Loading image</p>
								</div>
							</div>
						{/if}
						<img
							alt={title}
							src={screenshot}
							class={`h-auto m-auto min-h-[500px] max-h-[700px] object-fit border-l-4 border-r-4 border-gray-300  ${
								!didImageLoad ? 'hidden' : ''
							}`}
							use:onload
						/>
					</a>
				</object>
			{/if}
		</div>
		<div
			class="col-span-1 lg:col-span-1 lg:order-2 bg-gray-100 border-4 border-gray-300 p-4 w-full minHeight"
		>
			<a href={url} class="text-blue-500" target="_blank" rel="noreferrer">{url?.slice(0, 45)}...</a
			>
			{#if title?.length > 60}
				<h1 class="text-2xl font-bold mt-2">{title?.slice(0, 60)}...</h1>
			{:else}
				<h1 class="text-2xl font-bold mt-2">{title}</h1>
			{/if}
			<p class="mt-2">
				Added by: <a href={`/profile/blocks/${authorId}`} class="text-blue-500">{author}</a>
			</p>
			<div class="flex lg:flex-row gap-2">
				<button
					on:click={openCollectingModal}
					class="font-medium font-sans group relative flex w-full justify-center rounded-sm border border-gray-500 py-2 px-4 text-md text-gray-800 bg-action-400 hover:bg-action-500 focus:outline-none focus:ring-2 focus:gray-300 focus:ring-offset-2 drop-shadow-sm ease-in-out duration-300 mt-6"
					>Collect</button
				>
				{#if isOwner}
					<button
						on:click={openDeleteModal}
						class="font-bold font-sans group relative flex w-full justify-center rounded-sm border border-gray-500 py-2 px-4 text-md font-medium text-gray-800 bg-[#F49690] hover:bg-[#F2857D] focus:outline-none focus:ring-2 focus:gray-300 focus:ring-offset-2 drop-shadow-sm ease-in-out duration-300 mt-6"
						>Delete</button
					>
				{/if}
			</div>

			{#if collections.length > 0}
				<div class="collections mt-4 flex flex-col gap-2">
					<h1>This block is included in the following collections</h1>
					{#each collections as col}
						<CollectionCard collection={col} isRow={true} />
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.minHeight {
		height: min-content;
	}
</style>
