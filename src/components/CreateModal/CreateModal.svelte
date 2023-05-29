<script lang="ts">
	import { page } from '$app/stores';
  import { onMount } from 'svelte';
	import { modalStore } from '../../store/store';
  import { createUniqueArray } from '../../utils/createUniqueArray';
	import Modal from '../Modal.svelte';
	import Tabs from '../Tabs.svelte';
	import CollectionModal from './CollectionModal.svelte';
	import BlockModal from './BlockModal.svelte';
  import getPaginatedCollectionsByUserId from '../../queries/user/getPaginatedCollectionsByUserId';
	import getCollectionsCountByUserId from '../../queries/user/getCollectionsCountByUserId';

	let activeTab = 'block';


  let p = 0;
	$: collectionIds = [];

  $: count = 0;
  $: if (p) loadMore();

  const loadMore = async () => {
    collectionIds = createUniqueArray(
      collectionIds,
      await getPaginatedCollectionsByUserId($page?.data?.session?.user?.id || '', p, 5)
    );
  };

  onMount(async() => {
    collectionIds = await getPaginatedCollectionsByUserId(($page?.data?.session?.user?.id || ''), p, 5)
    count = await getCollectionsCountByUserId($page?.data?.session?.user?.id);
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

  const nextPage = () => p += 1;
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
		<BlockModal {onClose} {collectionIds} {count} {nextPage} />
	{:else}
		<CollectionModal {onClose} {collectionIds} {count} {nextPage} />
	{/if}
</Modal>
