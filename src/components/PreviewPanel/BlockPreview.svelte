<script lang="ts">
	export let object: any;
	$: ({ url, src, title } = object);
</script>

<div>
	<div class="content mt-10 mx-auto">
    <h1>{title}</h1>
		<a href={url} class="text-blue-500 line-clamp-1" target="_blank" rel="noreferrer">{url}</a>
		{#if url && src}
			<object
				{title}
				data={url}
				style="width: 100%; display: block;"
				class="h-[500px] lg:h-[600px] 2xl:h-[800px] border border-gray-400"
			>
				<a href={url} target="_blank" rel="noreferrer">
					<img alt={title} {src} class="h-auto object-cover" />
				</a>
			</object>
		{/if}
	</div>
</div>
