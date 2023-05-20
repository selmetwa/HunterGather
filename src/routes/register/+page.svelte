<script lang="ts">
  import { page } from '$app/stores';

  import { previewPanel } from '../../store/store';
  import Button from '../../components/Button.svelte';
  import Input from '../../components/Input.svelte';

  const error = $page?.form?.error;
	export let data: any;

  console.log({ data });
</script>

<div class="wrapper">
  <main class={`${$previewPanel ? 'xl:w-6/12 sm:w-8/12' : '2xl:w-3/12 xl:w-4/12 lg:w-6/12 md:w-8/12 sm:w-8/12'} bg-white mb-20 p-8 m-auto rounded drop-shadow-md mt-20 overflow-hidden`}>
    <div class="w-full max-w-md space-y-4">
      <h2 class="font-sans text-left text-2xl font-light tracking-tight text-gray-400">Register new account</h2>
      <div class="flex-grow border-t border-gray-200"></div>
    </div>
    {#if error}
      <p class="mt-4 space-y-6 text-rose-400">Error: {error}</p>
    {/if}
    <form action="?/register" method="POST" class="mt-8 space-y-6">
      <Input type="text" text="name" iconType="solid" icon="user" placeholder='name' />
      <Input type="text" text="email" iconType="solid" icon="at" placeholder='email' />
      <Input type="password" text="password" iconType="solid" icon="lock" placeholder='**********' />
      <Button text="Register" type="submit" />
    </form>
    <div class="relative flex py-4 items-center">
      <a href="/login" class="m-auto	font-light text-gray-400">already have an account? <span class="font-semibold text-action-400">Login</span></a>
    </div>
  </main>
</div>

<style>
  .wrapper {
    background: linear-gradient(#f3f4f6 50%, #fff 50%);
    overflow: hidden!important;
  }
</style>