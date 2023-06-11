<script lang="ts">
	import { scale, fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import Device from 'svelte-device-info';

	export let src = '';
	export let title = '';
	export let blockId = '';
	export let url = '';
	export let toggleCollectingModal: () => void;
	export let togglePreview: (e: any) => void;

	let hovering = false;
	let requested = false;
	const isMobile = Device.isMobile;

	const enter = () => {
		hovering = true;
		if (!requested) {
			requested = true;
		}
	};

	const leave = () => (hovering = false);
</script>

<div
	class="border border-gray-200 bg-white py-4 relative"
	on:mouseenter={enter}
	on:mouseleave={leave}
	in:fade
>
	<a href={`/block/${blockId}`} class="relative">
		<div class="flex items-center gap-4 flex-row">
			<img class="ml-3 h-16 w-16 rounded-md border border-gray-200" {src} alt="d" />
			<div class="flex flex-col pr-12 overflow-hidden">
				<a href={`/block/${blockId}`} class="flex flex-wrap break-words">{title}</a>
				<a href={url} class="text-blue-400 underline flex flex-wrap break-words overflow-hidden"
					>{url}</a
				>
			</div>
		</div>
	</a>
	{#if hovering && !isMobile}
		<div
			transition:scale={{ duration: 400, easing: quintOut, opacity: 0 }}
			class="absolute top-0 right-0 m-auto z-50 p-6 cursor-default rounded-md"
		>
			<div class="w-full flex gap-4">
				<button
					type="button"
					class="font-sans group relative flex w-full justify-center rounded-sm border border-transparent bg-gray-200 py-2 px-4 text-md font-medium text-gray-500 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:gray-300 focus:ring-offset-2 drop-shadow-sm ease-in-out duration-300"
					id="collect-button"
					on:click={toggleCollectingModal}>Collect</button
				>
				<button
					type="button"
					class="font-sans group z-50 relative flex w-full justify-center rounded-sm border border-transparent bg-gray-200 py-2 px-4 text-md font-medium text-gray-500 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:gray-300 focus:ring-offset-2 drop-shadow-sm ease-in-out duration-300"
					on:click={togglePreview}>Preview</button
				>
			</div>
		</div>
	{/if}
</div>
