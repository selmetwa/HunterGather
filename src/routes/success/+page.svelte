<script lang="ts">
	import { supabaseClient } from '$lib/supabase';
  import { page } from '$app/stores';
  const beta = $page.url.searchParams.get('session_id');
	const userId = $page?.data?.session?.user?.id;

  console.log({ beta, userId })

  async function updateUser(beta: any, userId: any) {
    const { data, error } = await supabaseClient
      .from('users')
      .update({
        is_subscriber: true
      })
      .eq('id', userId)
      .select();
    
    console.log({ data })
  }

  $: if (beta || userId) {
    if (beta && userId) {
      updateUser(beta, userId)
    }
  }

</script>

{#if beta && userId}
<div class="h-[500px] w-screen border border-red-100 flex items-center justify-center flex-col">
  <h1 class="mt-12 font-sans text-left text-3xl font-light tracking-tight text-gray-400">Thank you for subscribing to HunterGather premium!</h1>
  <a href="/" class="text-blue-400 underline text-xl mt-6">Take me to the homepage</a>
</div>
{/if}
