<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { supabaseClient } from '$lib/supabase';
	import { onMount } from 'svelte';
	import { PUBLIC_API_URL } from '$env/static/public';

	import Header from '../components/Header.svelte';
	import CreateModal from '../components/CreateModal/CreateModal.svelte';
	import { modalStore, collectionIds } from '../store/store';
	import '../app.css';

	let modalIsOpen = false;

	modalStore.subscribe((value) => {
		modalIsOpen = value;
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
