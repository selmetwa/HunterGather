<script lang="ts">
	import { page } from '$app/stores';
	import { supabaseClient } from '$lib/supabase';
	export let collection: any;
	import { collectingModal, objectToCollect } from '../../store/store';

	$: ({ title, collectionId, userId } = collection && collection[0]);
	const activeSession = $page?.data?.session;

	let author = 'author';
	let count = 0;

	$: if (collectionId) {
		loadData();
	}

	const loadData = async () => {
		const { data } = await supabaseClient.from('users').select().eq('id', userId);
		const { count: queryCount } = await supabaseClient
			.from('blocks')
			.select('*', { count: 'exact', head: true })
			.contains('collectionIds', [`${collectionId}`]);
		author = data && data[0] && data[0].name;

		if (queryCount) count = queryCount;
	};

	const toggleCollectingModal = () => {
		if (activeSession) {
			collectingModal.set(true);
			objectToCollect.set(collection[0]);
		} else {
			alert('You must have a registered account to do that');
		}
	};
</script>

<header class="header bg-gray-100 flex flex-col items-center">
  <h1 class="text-gray-500 font-sans text-3xl xl:text-5xl md:text-4xl font-medium">{title}</h1>
  <h3 class="text-gray-500 font-sans text-1xl xl:text-2xl md:text-2xl font-light my-2">
    Created by: {author}
  </h3>
  <h3 class="text-gray-500 font-sans text-1xl xl:text-2xl md:text-2xl font-light my-2">
    {count} items
  </h3>
  <button
    type="button"
    class="font-bold font-sans group relative flex w-full justify-center rounded-md border border-transparent py-2 px-4 font-medium text-white ease-in-out duration-300 cursor-pointer bg-action-400 hover:bg-action-500 w-min my-4"
    on:click={toggleCollectingModal}>Collect</button
  >
</header>
