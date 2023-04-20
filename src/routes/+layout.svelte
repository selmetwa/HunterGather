<script lang="ts">
  import { page } from '$app/stores';
	import { invalidateAll } from '$app/navigation';
	import { supabaseClient } from '$lib/supabase';
	import { onMount } from 'svelte';
	import { PUBLIC_API_URL } from '$env/static/public';

	import { blockPreviewPanel, modalStore, collectionIds, collectingModal } from '../store/store';

	import Header from '../components/Header.svelte';
	import CreateModal from '../components/CreateModal/CreateModal.svelte';
  import CollectingModal from '../components/CollectingModal/CollectingModal.svelte';
  import BlockPreview from '../components/BlockPreview/BlockPreview.svelte';
	import '../app.css';

	let modalIsOpen = false;
  let collectingModalIsOpen = false;
  let blockDetailIsOpen = false;
  let userId = $page?.data?.session?.user?.id;

  blockPreviewPanel.subscribe((value) => {
    blockDetailIsOpen = value;
  });

	modalStore.subscribe((value) => {
		modalIsOpen = value;
	});

  collectingModal.subscribe((value) => {
    collectingModalIsOpen = value
  });

	onMount(async () => {

    if (userId) {
      const { data } = await supabaseClient
        .from('collections')
        .select()
        .eq('userId', userId);

      console.log({ data })
      collectionIds.set(data)
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

<div class="bg-gray-50">
	<main>
		<Header />
		{#if modalIsOpen}
			<CreateModal />
		{/if}
    {#if collectingModalIsOpen}
      <CollectingModal />
    {/if}
    <div class={`${blockDetailIsOpen ? 'w-6/12' : 'w-full'}`}>
      <slot blockDetailIsOpen={blockDetailIsOpen} />
    </div>
    {#if blockDetailIsOpen}
      <BlockPreview />
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
