<script lang="ts">
	import { supabaseClient } from '$lib/supabase';
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	import { collectingModal, objectToCollect } from '../store/store';

	export let collection: any;
	let hovering = false;
	let requested = false;

	const enter = () => {
		hovering = true;
		if (!requested) {
			requested = true;
		}
	};

	const leave = () => (hovering = false);

	const { collectionId, title, userId } = collection;
	let author = 'author';
	let count = 0;

	onMount(async () => {
		const { data } = await supabaseClient.from('users').select().eq('id', userId);
		const { count: queryCount } = await supabaseClient
			.from('blocks')
			.select('*', { count: 'exact', head: true })
			.contains('collectionIds', [`${collectionId}`]);
		author = data && data[0] && data[0].name;

    if (queryCount) count = queryCount;
	});

	const toggleCollectingModal = () => {
		collectingModal.set(true);
		objectToCollect.set(collection);
	};
</script>

<div on:mouseenter={enter} on:mouseleave={leave}>
	<div class="card bg-white">
		{#if hovering}
			<div
				in:scale={{ duration: 150, easing: quintOut, opacity: 0 }}
				class="absolute border shadow-md top-0 m-auto z-50 bg-white shadow-xl p-6 w-full cursor-default"
			>
				<div class="mb-4">
					<h3 class="font-bold">{title}</h3>
				</div>
				<div class="w-full flex gap-4">
					<button
						type="button"
						class="font-sans group z-50 relative flex w-full justify-center rounded-sm border border-transparent bg-gray-200 py-2 px-4 text-md font-medium text-gray-500 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:gray-300 focus:ring-offset-2 drop-shadow-sm ease-in-out duration-300"
						on:click={toggleCollectingModal}>Collect</button
					>
				</div>
			</div>
		{/if}
		<a href={`/collection/${collectionId}`} class="link">
			<div class="content">
				<h1>{title}</h1>
				<p class="mt-2">{author}</p>
				<p>{count}</p>
			</div>
		</a>
	</div>
</div>

<style>
	.card {
		border: 1px solid #ccc;
		position: relative;
    aspect-ratio: 4/3;
    display: flex;
    align-items: center;
    justify-content: center;
	}

  .link {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

	.content {
    position: relative;
    height: min-content;
		text-align: center;
	}

	h1 {
		font-size: 32px;
    overflow:hidden;
    line-height: 2rem;
    -webkit-box-orient: vertical;
    display: block;
    display: -webkit-box;
    overflow: hidden !important;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    width: 85%;
    margin: auto;
	}
</style>
