<script lang="ts">
	import BlockCard from '../components/BlockCard.svelte';
	import CollectionCard from '../components/CollectionCard.svelte';
	import { blockPreviewPanel } from '../store/store';
	export let data: any;
	const { items } = data;

  // let panelIsOpen

  let gridRules: string
  blockPreviewPanel.subscribe(v => {
    gridRules = v ? 'grid-cols-2' : 'sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'
  })
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Wwwabbit" />
</svelte:head>
<section class={`@container border`}>
	<div class="xl:p-x-24 lg:p-x-16 md:p-x-16 sm:p-16">
		<div
			class={`grid gap-4 ${gridRules}`}
		>
			{#each items as item}
				{#if item.objectType === 'block'}
					<BlockCard block={item} />
				{:else}
					<CollectionCard collection={item} />
				{/if}
			{/each}
		</div>
	</div>
</section>