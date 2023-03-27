<script lang="ts">
	import { PUBLIC_API_URL } from '$env/static/public';

  import  { collectionIds } from '../../store/store'
  import Input from '../Input.svelte'
  import Button from '../Button.svelte'
  import Pill from '../Pill.svelte';
	import ErrorMessage from '../ErrorMessage.svelte';
	import SuccessMessage from '../SuccessMessage.svelte';

  export let onClose: any;
  // let error = false;
	let inProgress = false;
	let successMessage = '';
  let errorMessage = ''
  let url = '';
  let toggledCollectionIds: string | any[] = [];
  let ids: any[] = [];

  let a = '';

  collectionIds.subscribe((value) => {
    ids = value;
  });

  const updateUrl = (e: any) => {
    url = e.target.value;
    return true
  }

  const handleResponse = (res: any, responseData: any) => {
		const { status } = res;

		// handle error
		if (status === 500) {
			setTimeout(() => {
				inProgress = false;
        // error = true;
        errorMessage = responseData.message
        console.log({ responseData });
				url = '';
        toggledCollectionIds = [];
			}, 1000);
      
      return
		}

		errorMessage = '';
		setTimeout(() => {
			inProgress = false;
			successMessage = `Block has been created successfully.`;
			url = '';
      toggledCollectionIds = [];

      /**
       * close modal and redirect user somewhere
      */
			setTimeout(() => {
				successMessage = '';
			}, 2000);
		}, 1000);
	};

  const onSubmit = async () => {
		inProgress = true;

  
    const res = await fetch(`${PUBLIC_API_URL}/api/blocks`, {
			method: 'POST',
			headers: { accept: 'application/json' },
			body: JSON.stringify({
				url,
				collectionIds: toggledCollectionIds
			})
		});

    const responseData = await res.json();
    a = responseData && responseData[0] && responseData[0].src;
    console.log({ res, responseData, a })
    handleResponse(res, responseData)
  }

  const onPillClick = (e: any) => {
    const copy = [...toggledCollectionIds];
    const id = e.target.value;
    if (copy.includes(id)) {
      const index = copy.indexOf(id);
      copy.splice(index, 1);
    } else {
      copy.push(id);
    }

    toggledCollectionIds = copy
  }
</script>

<!-- 
  1. fetch all collections on server
  3. save in a store
  2. get in client
  3. make table in supabase for blocks
  4. make dropdown of collections
-->

<main class="2xl:w-3/12 xl:w-4/12 lg:w-6/12 md:w-8/12 sm:w-8/12 bg-white p-8 m-auto rounded mt-20 height-auto">
  {#if errorMessage}
  <ErrorMessage message={errorMessage} />
{/if}
{#if successMessage}
  <SuccessMessage message={successMessage} />
{/if}
  <div class="w-full max-w-md space-y-4 flex items-center justify-between">
    <div class="flex-col">
      <h2 class="font-sans text-left text-2xl font-light tracking-tight text-gray-400">Create Block</h2>
    </div>
    <i class="fa-solid fa-xmark text-2xl text-gray-400 hover:text-gray-300 hover:transition-all cursor-pointer" on:click={onClose}></i>
  </div>
  <div class="flex-grow border-t border-gray-200"></div>
  <form class="mt-8 space-y-6" on:submit={onSubmit}>
    <Input type="text" text="URL" value={url} onChange={updateUrl} placeholder='url' />
    <div>
      {#each ids as obj}
        <Pill 
          val={obj.collectionId}
          text={obj.title}
          onClick={onPillClick}
          isIncluded={toggledCollectionIds.includes(obj.collectionId)}
        />
      {/each}
    </div>
    <Button text="Create Block" type="submit" {inProgress} />
  </form>
  <img src={a} />
</main>

<style>
  main {
		width: 100%;
		margin: auto;
	}
</style>