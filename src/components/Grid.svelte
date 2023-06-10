<script>
	import { fade, slide } from 'svelte/transition';
	import { previewPanel, objectView } from '../store/store';

	let gridRules = '';
	previewPanel.subscribe((isPreviewPanelOpen) => {
		gridRules = isPreviewPanelOpen
			? 'sm:grid-cols-1 md:grid-cols-2'
			: 'sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5';
	});

</script>


<section>
	{#if $objectView === 'card'}
		<div class="px-8 md:px-16 xl:px-24 mb-12">
			<div class={`grid gap-12 md:gap-4 ${gridRules}`}>
				<slot />
			</div>
		</div>
  {:else if $objectView === 'two-up'}
  <div class="px-8 md:px-16 xl:px-24 mb-12">
    <div class={`grid gap-12 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3`}>
      <slot />
    </div>
  </div>
	{:else if $objectView === 'row'}
		<div class="px-2 md:px-16 xl:px-24 flex flex-col gap-2 mb-12">
			<slot />
		</div>
	{/if}
</section>
