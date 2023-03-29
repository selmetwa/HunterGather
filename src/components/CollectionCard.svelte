
<script lang="ts">
	import { supabaseClient } from '$lib/supabase';
  import { onMount } from 'svelte';
  export let collection: any;

  const { collectionId, title, userId } = collection;
  let author = 'author';
  let count = 0;

  onMount(async () => {
    const { data } = await supabaseClient.from('users').select().eq('id', userId);
	  const { count: queryCount } = await supabaseClient.from('blocks').select('*', { count: 'exact', head: true }).contains("collectionIds", [`${collectionId}`]);
    author = data && data[0] && data[0].name;
    count = queryCount
	});

  console.log({ collection })
</script>

<a href={`/collection/${collectionId}`}>
  <div class="card bg-white">
    <h1>{title}</h1>
    <p>{author}</p>
    <p>{count}</p>
  </div>
</a>

<style>
	.card {
		border: 1px solid #ccc;
    padding: 60px;
    text-align: center;
	}

  h1 {
    font-size: 32px;
  }
</style>