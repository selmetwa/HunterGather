<script lang="ts">
	import { page } from '$app/stores';
	import { invalidateAll } from '$app/navigation';
	import { supabaseClient } from '$lib/supabase';
	import { onMount } from 'svelte';

	import { previewPanel, modalStore, collectionIds, collectingModal } from '../store/store';

	import Header from '../components/Header.svelte';
	import CreateModal from '../components/CreateModal/CreateModal.svelte';
	import CollectingModal from '../components/CollectingModal/CollectingModal.svelte';
	import PreviewPanel from '../components/PreviewPanel/PreviewPanel.svelte';
	import '../app.css';

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

<div class="bg-gray-50 flex flex-row">
	<main>
		<Header />
		{#if modalIsOpen}
			<CreateModal />
		{/if}
		{#if collectingModalIsOpen}
			<CollectingModal />
		{/if}
		<div class={`${$previewPanel ? 'w-6/12' : 'w-full'}`}>
			<slot />
		</div>
		{#if $previewPanel}
			<PreviewPanel />
		{/if}
	</main>
</div>

<style>
	main {
		display: flex;
		flex-direction: column;
		background-color: #fafafa;
	}
</style>
