<script lang="ts">
  import { invalidateAll } from '$app/navigation';
  import { supabaseClient } from '$lib/supabase';
  import { onMount } from 'svelte';

  import Header from '../components/Header.svelte'
  import "../app.css";

  onMount(() => {
		const {
			data: { subscription }
		} = supabaseClient.auth.onAuthStateChange(() => {
			console.log('Auth state change detected');
			invalidateAll();
		});
		return () => {
			subscription.unsubscribe();
		};
	});
</script>

<div class="bg-gray-50">
  <Header />
	<main>
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
