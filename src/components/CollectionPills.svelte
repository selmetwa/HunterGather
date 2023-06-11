<script lang="ts">
	import Pill from './Pill.svelte';

	export let collectionIds: any;
	export let toggledCollectionIds: any;
	export let onPillClick: any;
</script>

{#if !!collectionIds.length}
	<p class="text-gray-400">Add to collection(s)</p>
		<div class="vertical-scroll">
			{#each collectionIds as obj}
				<Pill
					val={obj.collectionId}
					text={obj.title}
					onClick={onPillClick}
					isIncluded={toggledCollectionIds.includes(obj.collectionId)}
				/>
			{/each}
		</div>
{/if}

<style>
  .vertical-scroll {
    max-height: 150px;
    overflow: scroll;
    overflow-x: hidden;
  }
</style>
