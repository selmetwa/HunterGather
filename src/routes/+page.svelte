<script lang="ts">
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
		<div
			class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4"
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
