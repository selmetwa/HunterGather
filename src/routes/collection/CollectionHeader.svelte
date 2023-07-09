<script lang="ts">
	import { page } from '$app/stores';
	import { supabaseClient } from '$lib/supabase';
	export let collection: any;
	export let count: number;
	import {
		authModal,
		collectingModal,
		objectToCollect,
		deleteModalObject,
		isDeleteModalOpen
	} from '../../store/store';

	$: ({ title, collectionId, description, userId } = collection && collection[0]);
	const activeSession = $page?.data?.session;

	let author = 'author';
	let isOwner = false;

	$: if (collectionId) {
		loadData();
	}

	const loadData = async () => {
		const { data } = await supabaseClient.from('users').select().eq('id', userId);
		author = data && data[0] && data[0].name;
		isOwner = userId === $page?.data?.session?.user?.id;
	};

	const toggleCollectingModal = () => {
		if (activeSession) {
			collectingModal.set(true);
			objectToCollect.set(collection[0]);
		} else {
			authModal.set(true);
		}
	};

	const openDeleteModal = () => {
		deleteModalObject.set({ type: 'collection', object: { id: collectionId } });
		isDeleteModalOpen.set(true);
	};
</script>

<header class="header bg-gray-100 flex flex-col items-center p-8">
	<h1 class="text-gray-500 font-sans text-3xl xl:text-5xl md:text-4xl font-bold">{title}</h1>
	<p class="text-gray-500 font-sans text-1xl xl:text-2xl md:text-2xl font-light my-2">
		{description}
	</p>
	<h3 class="text-gray-500 font-sans text-xl xl:text-xl md:text-2xl font-light my-2">
		Created by: <a class="text-blue-400 underline" href={`/profile/blocks/${userId}`}>{author}</a>
	</h3>
	<h3 class="text-gray-500 font-sans text-1xl xl:text-2xl md:text-2xl font-light my-2">
		{count} items
	</h3>
	<div class="flex lg:flex-row gap-2 my-2">
		<button
			type="button"
			class="font-bold font-sans group relative flex w-full justify-center rounded-sm border border-gray-500 py-2 px-4 whitespace-nowrap font-medium text-gray-800 ease-in-out duration-300 cursor-pointer bg-action-400 hover:bg-action-500 w-min"
			on:click={toggleCollectingModal}>Embed Collection</button
		>
		{#if isOwner}
			<button
				on:click={openDeleteModal}
				class="font-bold font-sans group relative flex w-full justify-center rounded-sn border border-gray-500 py-2 px-4 font-medium whitespace-nowrap text-gray-800 bg-[#F49690] hover:bg-[#F2857D] ease-in-out duration-300 cursor-pointer bg-red-400 hover:bg-red-500 w-min"
				>Delete Collection</button
			>
		{/if}
	</div>
</header>
