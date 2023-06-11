<script lang="ts">
  import type { Block } from '../../types/block';
  import type { Collection } from '../../types/collection'
	import { onMount } from 'svelte';
	import { previewPanelObject } from '../../store/store';
	import { slide } from 'svelte/transition';

	import BlockPreview from './BlockPreview.svelte';
	import CollectionPreview from './CollectionPreview.svelte';
	import PreviewHeader from './PreviewHeader.svelte';

	$: type = '';
	$: object = {} as Block | Collection;
	$: id = '';
	$: url = '';

  const collection = object.objectType === 'collection' && object as Collection;
  const block = object.objectType === 'block' && object as Block;

	onMount(() => {
		previewPanelObject.subscribe((value: any) => {
			type = value.type;
			object = value.object;
			url = value.type === 'block' ? value.object.url : '';
			id = value.type === 'block' ? value.object.blockId : value.object.id;
		});
	});
</script>

<section
	transition:slide
	class="fixed right-0 bottom-0 w-6/12 h-screen overflow-x-hidden z-20 overflow-hidden opacity-100 flex flex-col bg-gray-100 panel-wrapper"
>
	<PreviewHeader {id} {type} {url} />
	<div class="overflow-scroll pb-20 px-14">
		{#if block}
			<BlockPreview {object} />
		{/if}
		{#if collection}
			<CollectionPreview collectionId={collection?.collectionId} />
		{/if}
	</div>
</section>
