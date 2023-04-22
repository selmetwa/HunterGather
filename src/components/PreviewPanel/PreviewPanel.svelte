<script>
// @ts-nocheck

	import { onMount } from 'svelte';
	import { previewPanelObject } from '../../store/store';

  import BlockPreview from '../BlockPreview/BlockPreview.svelte';
  import CollectionPreview from '../CollectionPreview/CollectionPreview.svelte';

	$: type = '';
	$: object = {};

	onMount(() => {
		previewPanelObject.subscribe((value) => {
			console.log({ value });
			type = value.type;
			object = value.object;
		});
	});
</script>

<section
	class="fixed right-0 bottom-0 w-6/12 h-screen overflow-x-hidden z-20 overflow-hidden opacity-100 flex flex-col bg-gray-100 panel-wrapper"
>
  {#if type === 'block'}
    <BlockPreview {object} />
  {/if}
  {#if type === 'collection'}
    <CollectionPreview collectionId={object.id} />
  {/if}
</section>

<style>
	.panel-wrapper {
		top: 88px;
	}
</style>