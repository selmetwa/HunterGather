<script lang="ts">
	import { page } from '$app/stores';
  import { onMount } from 'svelte';
	import { modalStore } from '../../store/store';
	import Modal from '../Modal.svelte';
	import Tabs from '../Tabs.svelte';
	import CollectionModal from './CollectionModal.svelte';
	import BlockModal from './BlockModal.svelte';
  import getCollectionsByUserId from '../../queries/user/getCollectionsByUserId';

	let activeTab = 'block';
	$: collectionIds = [];

  onMount(async() => {
    collectionIds = await getCollectionsByUserId(($page?.data?.session?.user?.id || '')) as []
  })

	const toggleTab = (e: any) => {
		activeTab = e.target.value;
	};

	const onClose = (e: any) => {
    if (e.target.id === 'close-modal-root') {
      modalStore.update(() => false);
    }

		return true;
	};

	const tabs = [
		{
			name: 'Block',
			val: 'block'
		},
		{
			name: 'Collection',
			val: 'collection'
		}
	];
</script>

<Modal {onClose}>
	<Tabs {tabs} {activeTab} {toggleTab} />
	{#if activeTab === 'block'}
		<BlockModal {onClose} {collectionIds} />
	{:else}
		<CollectionModal {onClose} {collectionIds} />
	{/if}
</Modal>
