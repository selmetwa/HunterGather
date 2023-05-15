<script>
	// @ts-nocheck

	import { onMount } from 'svelte';
	import { previewPanelObject } from '../../store/store';

	import BlockPreview from './BlockPreview.svelte';
	import CollectionPreview from './CollectionPreview.svelte';
	import PreviewHeader from './PreviewHeader.svelte';

	$: type = '';
	$: object = {};
	$: id = '';
	$: url = '';

	onMount(() => {
		previewPanelObject.subscribe((value) => {
			console.log({ value });
			type = value.type;
			object = value.object;
			url = value.type === 'block' ? value.object.url : '';
			id = value.type === 'block' ? value.object.blockId : value.object.id;
		});
	});
</script>

<section
	class="fixed right-0 bottom-0 w-6/12 h-screen overflow-x-hidden z-20 overflow-hidden opacity-100 flex flex-col bg-gray-100 panel-wrapper"
>
	<PreviewHeader {id} {type} {url} />
	<div class="overflow-scroll pb-20 px-14">
		{#if type === 'block'}
			<BlockPreview {object} />
		{/if}
		{#if type === 'collection'}
			<CollectionPreview collectionId={object.id} />
		{/if}
	</div>
</section>
