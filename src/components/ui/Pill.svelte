<script lang="ts">
	export let text = '';
	export let val = '';
	export let onClick: any;
	export let isIncluded: boolean;
</script>

<button
	type="button"
	value={val}
	class={`${
		isIncluded
			? 'border border-gray-400 text-gray-800 bg-action-400'
			: 'border border-gray-400 bg-gray-100 text-gray-500'
	} mt-2 py-2 px-4 no-underline rounded-sm font-sans font-semibold text-sm btn-primary focus:outline-none mr-2 text`}
	on:click={onClick}
>
	{text}
</button>

<style>
	.text {
		max-width: 300px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
