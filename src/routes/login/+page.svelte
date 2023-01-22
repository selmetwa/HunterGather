<script>
// @ts-nocheck
  import { page } from '$app/stores';

  import { enhance } from '$app/forms';
	import { supabaseClient } from '$lib/supabase';

  import Button from '../../components/Button.svelte';
  import Input from '../../components/Input.svelte';

	const signInWithProvider = async (provider) => {
		const { data, error } = await supabaseClient.auth.signInWithOAuth({
			provider: provider
		});

    console.log({
      data,
      error
    })
	};

	const submitSocialLogin = async ({ action, cancel }) => {
		switch (action.searchParams.get('provider')) {
			case 'google':
				await signInWithProvider('google');
				break;
			case 'github':
				await signInWithProvider('github');
				break;
			default:
				break;
		}
		cancel();
	};

  const error = $page?.form?.error;
</script>
<body>
    <main class="2xl:w-3/12 xl:w-4/12 lg:w-6/12 md:w-8/12 sm:w-8/12 bg-white	p-8 m-auto rounded drop-shadow-md mt-20">
      <div class="w-full max-w-md space-y-4">
        <h2 class="font-sans text-left text-2xl font-light tracking-tight text-gray-400">Sign in to your account</h2>
        <div class="flex-grow border-t border-gray-200"></div>
      </div>
      {#if error}
        <p class="mt-4 space-y-6 text-rose-400">Error: {error}</p>
      {/if}
      <form action="?/login" method="POST" class="mt-4 space-y-6">
        <Input type="text" text="email" iconType="solid" icon="at" />
        <Input type="password" text="password" iconType="solid" icon="lock" />
        <Button text="Login" type="submit" />
      </form>
      <div class="relative flex py-4 items-center">
        <a href="/register" class="m-auto	font-light text-gray-400">not a member? <span class="font-semibold text-blue-400">Join</span></a>
      </div>
      <div class="relative flex py-4 items-center">
        <div class="flex-grow border-t border-gray-200"></div>
        <span class="flex-shrink font-light mx-4 text-gray-400">or continue with</span>
        <div class="flex-grow border-t border-gray-200"></div>
      </div>
      <form class="socials flex flex-row gap-4 h-12 " method="POST">
        <button formaction="?/login&provider=github" class="border border-gray-300 basis-1/2 bg-slate-50 rounded hover:bg-slate-100 ease-in-out duration-300	drop-shadow-sm">
          <i class="fa-brands fa-github fa-2xl"></i>
        </button>
        <button formaction="?/login&provider=google" class="border border-gray-300 basis-1/2 bg-slate-50 rounded hover:bg-slate-100 ease-in-out duration-300 drop-shadow-sm">
          <i class="fa-brands fa-google fa-2xl"></i>
        </button>
      </form>
    </main>
</body>

<style>
  body {
    background: linear-gradient(#3b82f6 50%, #eff6ff 50%);
    height: 60%;
  }
</style>