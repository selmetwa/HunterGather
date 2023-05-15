<script lang="ts">
  export let object: any;
	$: ({ url, src, title } = object);
</script>

<div>
	<div class="content mt-10 mx-auto">
		<a href={url} class="text-blue-500 line-clamp-1" target="_blank">{url}</a>
		{#if url && src}
			<object
				{title}
				data={url}
        style="width: 100%; display: block;"
        class="h-[500px] lg:h-[600px] 2xl:h-[800px] border border-gray-400"
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

