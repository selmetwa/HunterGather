<script>
// @ts-nocheck
	import { blockPreviewObject } from '../../store/store';
  import PreviewHeader  from './PreviewHeader.svelte';
  let url;
  let blockId;
  let src;

  blockPreviewObject.subscribe(v => {
    url = v.url;
    src = v.src;
    blockId = v.blockId
  });
</script> 

<div class="fixed right-0 bottom-0 w-6/12 h-screen overflow-x-hidden z-20 overflow-hidden opacity-100 flex flex-col bg-gray-100 panel-wrapper">
  <PreviewHeader {blockId} {url} {src} />
  <div class="content mt-10 mx-auto">
    <a href={url} class="text-blue-500" target="_blank">{url}</a>
    <embed src={url} class="lg:w-[650px] 2xl:w-[800px] lg:h-[600px] 2xl:h-[800px] border border-gray-400">
  </div>
</div>

<style>
  .panel-wrapper {
    top: 88px;
  }
</style>