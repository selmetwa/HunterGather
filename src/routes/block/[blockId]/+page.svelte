<script>
  // @ts-nocheck
    import { page } from '$app/stores';
    import { supabaseClient } from '$lib/supabase';
    import { blockPreviewPanel, blockPreviewObject, collectingModal, objectToCollect } from '../../../store/store';
    import CollectionCard from "../../../components/CollectionCard.svelte";
    import Button from '../../../components/Button.svelte';
    // let block = {};

    export let data;

    const block = data && data.block && data.block[0];
    const activeSession = $page?.data?.session;
    let author;
    let authorId;
    let title;
    $: collections = [];
    let src;
    let url;
    // export let block;
  
    blockPreviewObject.subscribe(v => {
      objectToCollect.set(v);
    });
  
    const openCollectingModal = () => {

      if(activeSession) {
        collectingModal.set(true);
        objectToCollect.set(block);
      } else {
        alert('You must have a registered account to do that')
      }
    }
  
    const onClose = () => {
      // blockPreviewPanel.set(false)
      collectingModal.set(false);
    };
  
    // console.log({ block });
  
    $: if(block) loadData();
  
  
    const loadData = async () => {
      // const { collectionIds, blockId, title, url, src, userId} = block;
      const { data: user, error: userError } = await supabaseClient.from('users').select().eq('id', block.userId);
  
      title = block.title;
      author = user && user[0] && user[0].name;
      authorId = user && user[0] && user[0].id;
      src = block.src;
      url = block.url;
      console.log({ user });
  
      // fetch collections
      let collectionIds = block.collectionIds;
  
      collectionIds.forEach(async id => {
        let { data: collection } = await supabaseClient.from('collections').select().eq('collectionId', id);
  
        collections.push(collection[0]);
        collections = collections;
        console.log({ collection });
      })
    }
    
    console.log({ collections });
  </script> 
  
  
  <div class="w-full h-screen overflow-x-hidden	overflow-hidden opacity-100 bg-gray-100">
    <div class="content">
      <div>
        <embed src={url} class="sm:w-[600px] sm:h-[600px] md:w-[800px] lg:w-[800px] 2xl:w-[1200px] lg:h-[600px] 2xl:h-[800px] border border-gray-400">
      </div>
      <div>
        <a href={url} class="text-blue-500" target="_blank">{url}</a>
        <h1 class="text-2xl font-bold mt-2">{title}</h1>
        <p class="mt-2">
          Added by: <a href={`/profile/${authorId}`} class="text-blue-500">{author}</a>
        </p>
        <button on:click={openCollectingModal} class="font-bold font-sans group relative flex w-full justify-center rounded-md border border-transparent bg-action py-2 px-4 text-lg font-medium text-white bg-action-400 hover:bg-action-500 focus:outline-none focus:ring-2 focus:gray-300 focus:ring-offset-2 drop-shadow-sm ease-in-out duration-300 mt-6">Collect</button>
  
        {#if collections.length > 0}
          <div class="collections mt-4">
            <h1>This block is included in the following collections</h1>
            {#each collections as col}
              <CollectionCard collection={col} isRow={true} />
            {/each}
          </div>
        {/if}
      </div>
      <!-- <div class="column bg-gray-200">
        <h1 class="text-2xl font-bold">{title}</h1>
        <p class="mt-2">
          Added by: <a href={`/profile/${authorId}`} class="text-gray-500">{author}</a>
        </p>
  

        
        <button on:click={onClose}>close</button>
      </div> -->
    </div>
  </div>
  
  <style>
    .content {
      display: grid;
      grid-template-columns: 2fr 1fr;
      /* max-width: 1500px; */
      gap: 50px;
      padding: 40px;
    }

    /* @media only screen and (max-width: 1500px) {
      .content {
        max-width: 1280px;
      }
    }
  
    @media only screen and (max-width: 900px) {
      .content {
        max-width: 700px;
        grid-template-columns: 1fr;
        gap: 30px;
        padding: 15px;
      }
    } */
    @media only screen and (max-width: 1100px) {
      .content {
        /* max-width: 700px; */
        grid-template-columns: 1fr;
        gap: 30px;
        padding: 15px;
      }
    }
    .column {
      height: 100%;
      padding: 20px;
    }
  
    .collections {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
  </style>