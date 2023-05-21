<script>
  import { previewPanel } from "../store/store";

  let gridRules = '';
	previewPanel.subscribe((isPreviewPanelOpen) => {
		gridRules = isPreviewPanelOpen
			? 'grid-cols-2'
			: 'sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5';
	});
</script>

<section>
	<div class="sm:px-8 md:px-16 xl:px-24">
    <div class={`grid gap-2 md:gap-4 ${gridRules}`}>
      <slot />
    </div>
  </div>
</section>