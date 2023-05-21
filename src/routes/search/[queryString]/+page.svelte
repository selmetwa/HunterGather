<script>
  export let data;
  import Grid from '../../../components/Grid.svelte';
  import BlockCard from '../../../components/BlockCard.svelte';
  import CollectionCard from '../../../components/CollectionCard.svelte';
  console.log({ data })

  const objects = data.a;
</script>
<h1>{data.searchTerm}</h1>
{#if !!objects.length > 0}
<Grid>
  {#each objects as object}
  {#if object.objectType === 'block'}
    <BlockCard block={object} />
  {:else}
    <CollectionCard collection={object} />
  {/if}
  {/each}
</Grid>
{:else}
<div class="flex items-center border-2 border-gray-300 background-gray-200 text-center p-20 w-8/12 m-auto">
  <p class="text-gray-400 m-auto">مـَفيش (māfeesh) / there is nothing</p>
</div>
{/if}
