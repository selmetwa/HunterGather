<script>
	// @ts-nocheck
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { supabaseClient } from '$lib/supabase';

  import getCollection from '../../../queries/collections/getCollection';
  import getUserById from '../../../queries/user/getUserById';
	import { collectingModal, objectToCollect, previewPanel, deleteModalObject, isDeleteModalOpen } from '../../../store/store';
	import CollectionCard from '../../../components/CollectionCard.svelte';

	export let data;
	const userId = $page?.data?.session?.user?.id;

	const block = data && data.block && data.block[0];
	const activeSession = $page?.data?.session;
	const isOwner = userId === block.userId;

	$: collections = [];
	let author;
	let authorId;
	let title;
	let src;
	let url;

	$: if (block) loadData();

	const openCollectingModal = () => {
		if (activeSession) {
			collectingModal.set(true);
			objectToCollect.set(block);
		} else {
			alert('You must have a registered account to do that');
		}
	};

	const loadData = async () => {
    const user = await getUserById(block.userId)

		title = block.title;
		author = user && user[0] && user[0].name;
		authorId = user && user[0] && user[0].id;
		src = block.src;
		url = block.url;

		// fetch collections
		let collectionIds = block.collectionIds;
		collectionIds.forEach(async (id) => {
      const collection = await getCollection(id)
			collections.push(collection[0]);
			collections = collections;
			console.log({ collection });
		});
	};

	console.log({ collections });

	let gridRules = '';
	previewPanel.subscribe((isPreviewPanelOpen) => {
		gridRules = isPreviewPanelOpen ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4';
	});

  const openDeleteModal = () => {
    deleteModalObject.set({type: 'block', object: block});
    isDeleteModalOpen.set(true)
  }
</script>

<div class="w-full h-full overflow-x-hidden overflow-hidden opacity-100 bg-gray-100">
	<div class={`content px-4 lg:px-8 my-16 gap-10 grid ${gridRules}`}>
		<div
			class="col-span-1 lg:col-span-2 2xl:col-span-3 lg:order-1 bg-gray-100 border-4 border-gray-300"
		>
			{#if url && src}
				<object
					{title}
					data={url}
					style="width: 100%; display: block;"
					class="h-[500px] lg:h-[600px] 2xl:h-[800px]"
				>
					<p class="text-gray-500 m-4">Cannot embed this website, heres a picture</p>
					<a href={url} target="_blank">
						<img alt={title} {src} class="lg:w-[800px] 2xl:w-[1000px]" />
					</a>
				</object>
			{/if}
		</div>
		<div
			class="col-span-1 lg:col-span-1 lg:order-2 bg-gray-200 border-4 border-gray-300 p-4 w-full"
		>
			<a href={url} class="text-blue-500" target="_blank">{url?.slice(0,45)}...</a>
			<h1 class="text-2xl font-bold mt-2">{title}</h1>
			<p class="mt-2">
				Added by: <a href={`/profile/blocks/${authorId}`} class="text-blue-500">{author}</a>
			</p>
			<div class="flex lg:flex-row gap-2">
				<button
					on:click={openCollectingModal}
					class="font-bold font-sans group relative flex w-full justify-center rounded-md border border-transparent bg-action py-2 px-4 text-lg font-medium text-white bg-action-400 hover:bg-action-500 focus:outline-none focus:ring-2 focus:gray-300 focus:ring-offset-2 drop-shadow-sm ease-in-out duration-300 mt-6"
					>Collect</button
				>
				{#if isOwner}
					<button
						on:click={openDeleteModal}
						class="font-bold font-sans group relative flex w-full justify-center rounded-md border border-transparent bg-action py-2 px-4 text-lg font-medium text-white bg-red-400 hover:bg-red-500 focus:outline-none focus:ring-2 focus:gray-300 focus:ring-offset-2 drop-shadow-sm ease-in-out duration-300 mt-6"
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
