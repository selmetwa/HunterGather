<script lang="ts">
  import { modalStore } from '../../store/store';
  import Modal from "../Modal.svelte";
  import Tabs from '../Tabs.svelte';
  import CollectionModal from './CollectionModal.svelte';
  import BlockModal from './BlockModal.svelte';

  let activeTab = 'block';

  const toggleTab = (e: any) => {
		activeTab = e.target.value;
	};

  const onClose = () => {
    modalStore.update(() => false)
    return true;
  };
  
  const tabs = [{
    name: 'Block',
    val: 'block'
  },
  {
    name: 'Collection',
    val: 'collection'
  }
];
</script>

<Modal>
  <Tabs tabs={tabs} activeTab={activeTab} toggleTab={toggleTab}  />
  {#if activeTab === 'block'}
    <BlockModal onClose={onClose} />
    {:else}
      <CollectionModal onClose={onClose} /> 
  {/if}
</Modal>
