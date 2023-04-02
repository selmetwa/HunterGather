<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { supabaseClient } from '$lib/supabase';
	import { onMount } from 'svelte';
	import { PUBLIC_API_URL } from '$env/static/public';

	import { modalStore, collectionIds, collectingModal } from '../store/store';

	import Header from '../components/Header.svelte';
	import CreateModal from '../components/CreateModal/CreateModal.svelte';
  import CollectingModal from '../components/CollectingModal/CollectingModal.svelte';
	import '../app.css';

	let modalIsOpen = false;
  let collectingModalIsOpen = false;

	modalStore.subscribe((value) => {
		modalIsOpen = value;
	});

  collectingModal.subscribe((value) => {
    collectingModalIsOpen = value
  });

	onMount(async () => {
    const res = await fetch(`${PUBLIC_API_URL}/api/collections`, {
      method: 'GET',
      headers: { accept: 'application/json' }
    });

    const data = await res.json();
    collectionIds.set(data)

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

<div class="bg-gray-50">
	<main>
		<Header />
		{#if modalIsOpen}
			<CreateModal />
		{/if}
    {#if collectingModalIsOpen}
      <CollectingModal />
    {/if}
		<slot />
	</main>
</div>

<style>
	main {
		height: 100vh;
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		background-color: #eff6ff;
	}
</style>
