<script lang="ts">
	import PreviewHeader from './PreviewHeader.svelte';
  export let object: any;
	$: ({ url, blockId, src, title } = object);
</script>

<div>
	<PreviewHeader {blockId} {url} {src} />
	<div class="content mt-10 mx-auto">
		<a href={url} class="text-blue-500" target="_blank">{url}</a>
		{#if url && src}
			<object
				{title}
				data={url}
				class="lg:w-[650px] 2xl:w-[800px] lg:h-[600px] 2xl:h-[800px] border border-gray-400"
			>
				<p class="text-gray-500 m-4">Cannot embed this website, heres a picture</p>
				<img
					alt={title}
					{src}
					class="lg:w-[650px] 2xl:w-[800px] lg:h-[600px] 2xl:h-[800px] border border-gray-400"
				/>
			</object>
		{/if}
	</div>
</div>

