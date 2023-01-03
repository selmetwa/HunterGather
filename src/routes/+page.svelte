<script>
// @ts-nocheck
  import { userSession } from "../store/store";

   /**
	 * @type {{ session: { user: { email: any; }; }; }}
	 */
    export let data;
    console.log({ data })
    userSession.set(data)
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Wwwabbit" />
</svelte:head>

<section>
  <h1>Wwwabbit</h1> 
</section>

<style>
	h1 {
		width: 100%;
	}
</style>
