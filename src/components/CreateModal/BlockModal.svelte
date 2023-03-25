<script lang="ts">
  // import { PUBLIC_API_URL } from '$env/static/public';
  // import { modalStore } from '../../store/store';

  // import Modal from "../Modal.svelte";
  import Input from '../Input.svelte'
  import Button from '../Button.svelte'

  export let onClose: any;
  let title = '';

  const updateTitle = (e: any) => {
    title = e.target.value;
    return true
  }
</script>


<main class="2xl:w-3/12 xl:w-4/12 lg:w-6/12 md:w-8/12 sm:w-8/12 bg-white p-8 m-auto rounded mt-20">
  <div class="w-full max-w-md space-y-4 flex items-center justify-between">
    <div class="flex-col">
      <h2 class="font-sans text-left text-2xl font-light tracking-tight text-gray-400">Create Block</h2>
    </div>
    <i class="fa-solid fa-xmark text-2xl text-gray-400 hover:text-gray-300 hover:transition-all cursor-pointer" on:click={onClose}></i>
  </div>
  <div class="flex-grow border-t border-gray-200"></div>
  <form class="mt-8 space-y-6">
    <Input type="text" text="URL" value={''} onChange={updateTitle} placeholder='url' />
    <Input type="text" text="Placeholder" value={''} onChange={updateTitle} placeholder='placeholder' />
    <Button text="Submit" type="submit" />
  </form>
</main>

<style>
  main {
		width: 100%;
		margin: auto;
	}
</style>