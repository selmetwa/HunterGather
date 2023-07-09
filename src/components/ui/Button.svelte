<script lang="ts">
	import LoadingSpinner from './LoadingSpinner.svelte';

	export let text: string;
	export let type: 'button' | 'submit' | 'reset' | null | undefined;
	export let inProgress = false;
</script>

<button
	{type}
	class="group relative flex w-full justify-center rounded-sm border border-gray-500 bg-action-400 hover:bg-action-500 py-2 px-4 text-md font-medium text-gray-800 focus:outline-none focus:ring-2 focus:gray-300 focus:ring-offset-2 drop-shadow-sm ease-in-out duration-300"
>
	{#if inProgress}
		<LoadingSpinner />
	{:else}
		{text}
	{/if}
</button>
