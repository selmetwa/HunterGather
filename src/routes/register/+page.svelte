<script lang="ts">
  import { page } from '$app/stores';

  import Button from '../../components/Button.svelte';
  import Input from '../../components/Input.svelte';

  const error = $page?.form?.error;
</script>

<body>
  <main class="2xl:w-3/12 xl:w-4/12 lg:w-6/12 md:w-8/12 sm:w-8/12 bg-white p-8 m-auto rounded drop-shadow-md mt-20">
    <div class="w-full max-w-md space-y-4">
      <h2 class="font-sans text-left text-2xl font-light tracking-tight text-gray-400">Register new account</h2>
      <div class="flex-grow border-t border-gray-200"></div>
    </div>
    {#if error}
      <p class="mt-4 space-y-6 text-rose-400">Error: {error}</p>
    {/if}
    <form action="?/register" method="POST" class="mt-8 space-y-6">
      <Input type="text" text="name" iconType="user" />
      <Input type="text" text="email" iconType="at" />
      <Input type="password" text="password" iconType="lock" />
      <Button text="Register" type="submit" />
    </form>
    <div class="relative flex py-4 items-center">
      <a href="/login" class="m-auto	font-light text-gray-400">already have an account? <span class="font-semibold text-blue-400">Login</span></a>
    </div>
  </main>
</body>

<style>
  body {
    background: linear-gradient(#3b82f6 50%, #eff6ff 50%);
    height: 60%;
  }
</style>