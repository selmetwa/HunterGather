<script>
	import { enhance } from "$app/forms";

// @ts-nocheck

	import { supabaseClient } from "$lib/supabase";


  // import type { PageData } from "./$types";

  /**
	 * @type {{ session: { user: { email: any; }; }; }}
	 */
   export let data;

   const submitLogout = async ({ cancel }) => {
     const { error } = await supabaseClient.auth.signOut();
    
     console.log('logout via client')
     if (error) {
       console.log('error')
     }

     cancel();
   }
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Wwwabbit" />
</svelte:head>

<section>
  {#if data.session}
  <p>welcome, {data.session.user.email}</p>
  <form action="/logout" method="POST" use:enhance={submitLogout}>
    <button type="submit">logout</button>
  </form>
  {:else}
    no session
  {/if}
  <h1>Wwwabbit</h1> 
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}
</style>
