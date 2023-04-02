<script lang="ts">
	import Masonry from '../components/Masonry.svelte';
	import BlockCard from '../components/BlockCard.svelte';
	import CollectionCard from '../components/CollectionCard.svelte';
	export let data: any;
	const { items } = data;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Wwwabbit" />
</svelte:head>
<section>
	<div class="xl:p-x-24 lg:p-x-16 sm:p-8">
		<Masonry gridGap={'0.75rem'} colWidth={'minmax(Min(20em, 100%), 1fr)'} {items}>
			{#each items as item}
				{#if item.objectType === 'block'}
					<BlockCard block={item} />
				{:else}
					<CollectionCard collection={item} />
				{/if}
			{/each}
		</Masonry>
	</div>
</section>
