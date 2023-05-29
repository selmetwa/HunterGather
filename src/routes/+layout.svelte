<script lang="ts">
	import { page } from '$app/stores';
	import { invalidateAll } from '$app/navigation';
	import { supabaseClient } from '$lib/supabase';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	import {
    authModal,
		previewPanel,
		modalStore,
		collectionIds,
		collectingModal,
		isDeleteModalOpen
	} from '../store/store';
	import Header from '../components/Header.svelte';
	import CreateModal from '../components/CreateModal/CreateModal.svelte';
	import CollectingModal from '../components/CollectingModal/CollectingModal.svelte';
	import PreviewPanel from '../components/PreviewPanel/PreviewPanel.svelte';
	import DeleteModal from '../components/DeleteModal/DeleteModal.svelte';
  import AuthModal from '../components/AuthModal/AuthModal.svelte';
	import '../app.css';

	export let data;

	let modalIsOpen = false;
	let collectingModalIsOpen = false;
	let userId = $page?.data?.session?.user?.id;

	modalStore.subscribe((value) => {
		modalIsOpen = value;
	});

	collectingModal.subscribe((value) => {
		collectingModalIsOpen = value;
	});

	onMount(async () => {
		if (userId) {
			const { data } = await supabaseClient.from('collections').select().eq('userId', userId);
			collectionIds.set(data);
		}

		const {
			data: { subscription }
		} = supabaseClient.auth.onAuthStateChange(() => {
			invalidateAll();
		});

		return () => {
			subscription.unsubscribe();
		};
	});
</script>

<div class="bg-gray-50 flex flex-row overflow-hidden w-screen">
	<main class="flex flex-col w-full">
		<Header />
    {#if $authModal}
      <AuthModal />
    {/if}
		{#if modalIsOpen}
			<CreateModal />
		{/if}
		{#if collectingModalIsOpen}
			<CollectingModal />
		{/if}
		{#key data.pathname}
			<div
				class={`${$previewPanel ? 'w-6/12' : 'w-full'} h-[calc(100vh-70px)] overflow-auto`}
				in:fade={{ duration: 300, delay: 400 }}
				out:fade={{ duration: 300 }}
			>
				<slot />
			</div>
		{/key}
		{#if $previewPanel}
			<PreviewPanel />
		{/if}
		{#if $isDeleteModalOpen}
			<DeleteModal />
		{/if}
	</main>
</div>
