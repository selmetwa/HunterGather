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

<h1>Thank you for subscriber to HunterGather premium</h1>