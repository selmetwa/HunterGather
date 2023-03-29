<script lang="ts">
	import { supabaseClient } from '$lib/supabase';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	export let block: any;

	const { src, title, url, blockId, userId } = block;

	let hovering = false;
	let requested = false;
	let resolve = null;

	const enter = () => {
		hovering = true;
		if (!requested) {
			requested = true;
		}
	};

	const leave = () => (hovering = false);

	let author = '';

	onMount(async () => {
		const { data } = await supabaseClient.from('users').select().eq('id', userId);
		author = data && data[0] && data[0].name;
	});
</script>

<div>
	<div class="card" on:mouseenter={enter} on:mouseleave={leave}>
		<img class="w-full" {src} alt={title} />

		{#if hovering}
			<div
				in:scale={{ duration: 150, easing: quintOut, opacity: 0 }}
				class="absolute border shadow-md top-0 m-auto z-50 bg-white shadow-xl p-6 w-full cursor-default"
			>
				<div class="mb-4">
					<h3 class="font-bold">{title}</h3>
          <p class="mt-2 ">Posted by: <a href={`/profile/${userId}`} class="text-blue-400">{author}</a></p>
				</div>
				<div class="w-full flex gap-4">
					<a href={url} target="_blank" class="w-full">
						<button
							type="button"
							class="font-sans group relative flex w-full justify-center rounded-sm border border-transparent bg-gray-200 py-2 px-4 text-md font-medium text-gray-500 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:gray-300 focus:ring-offset-2 drop-shadow-sm ease-in-out duration-300"
							>Source</button
						>
					</a>
					<button
						type="button"
						class="font-sans group relative flex w-full justify-center rounded-sm border border-transparent bg-gray-200 py-2 px-4 text-md font-medium text-gray-500 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:gray-300 focus:ring-offset-2 drop-shadow-sm ease-in-out duration-300"
						>Collect</button
					>
				</div>
			</div>
		{/if}
	</div>
	<div class="py-2">
    <h2>{title}</h2>
	</div>
</div>

<style>
	.card {
		position: relative;
		border: 1px solid #ccc;
	}

	.card:hover {
		cursor: pointer;
	}

	img {
		width: 100%;
		height: auto;
	}
</style>
