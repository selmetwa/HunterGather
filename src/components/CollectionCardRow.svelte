<script lang="ts">
	import { scale, fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	export let author = '';
	export let title = '';
	export let collectionId = '';
	export let userId = '';
	export let date = '';
	export let count = 0;
	export let toggleCollectingModal: () => void;
	export let togglePreview: (e: any) => void;

	let hovering = false;
	let requested = false;
  const isMobile = window.innerWidth <= 1100;

	const enter = () => {
		hovering = true;
		if (!requested) {
			requested = true;
		}
	};

	const leave = () => (hovering = false);
</script>

<div class="border bg-gray-200 border-gray-300 relative" on:mouseenter={enter} on:mouseleave={leave} in:fade>
	<a href={`/collection/${collectionId}`}>
		<div class="flex items-center gap-4 flex-row py-4">
			<div
				class="ml-3 h-16 w-16 rounded-md border bg-gray-300 flex items-center justify-center font-sans font-medium text-gray-500"
			>
				{count}
			</div>
			<div class="flex flex-col pr-12 overflow-hidden">
				<a href={`/collection/${collectionId}`} class="flex flex-wrap break-words">{title}</a>
				<a href={`/profile/blocks/${userId}`} class="text-blue-400 underline flex flex-wrap"
					>{author}</a
				>
        <p class="font-sans text-gray-400">{date}</p>
			</div>
		</div>
	</a>
	{#if hovering && !isMobile}
		<div
			in:scale={{ duration: 150, easing: quintOut, opacity: 0 }}
			class="absolute top-0 right-0 m-auto z-50 p-6 cursor-default rounded-md"
		>
			<div class="w-full flex gap-4">
				<button
					type="button"
					class="font-sans group relative flex w-full justify-center rounded-sm border border-transparent bg-gray-300 py-2 px-4 text-md font-medium text-gray-500 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:gray-400 focus:ring-offset-2 drop-shadow-sm ease-in-out duration-300"
					id="collect-button"
					on:click={toggleCollectingModal}>Collect</button
				>
				<button
					type="button"
					class="font-sans group z-50 relative flex w-full justify-center rounded-sm border border-transparent bg-gray-300 py-2 px-4 text-md font-medium text-gray-500 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:gray-400 focus:ring-offset-2 drop-shadow-sm ease-in-out duration-300"
					on:click={togglePreview}>Preview</button
				>
			</div>
		</div>
	{/if}
</div>
