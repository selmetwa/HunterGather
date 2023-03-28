<script lang="ts">
	import LoadingSpinner from './LoadingSpinner.svelte';

	export let text: string;
	export let type: 'button' | 'submit' | 'reset' | null | undefined;
	export let inProgress = false;
</script>

<button
	{type}
	class="font-bold font-sans group relative flex w-full justify-center rounded-md border border-transparent bg-blue-500 py-2 px-4 text-lg font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:blue-600 focus:ring-offset-2 drop-shadow-sm ease-in-out duration-300"
>
	{#if inProgress}
		<LoadingSpinner />
	{:else}
		{text}
	{/if}
</button>
