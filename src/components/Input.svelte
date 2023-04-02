<script lang="ts">
	export let type: string;
	export let text: string;
	export let iconType = '';
	export let value = '';
	export let icon = '';
	export let placeholder = '';
	export let isRequired = false;
	export let maxlength = 1000;
	export let onChange = (e: any) => true;

	const hasIcon = !!(iconType && icon);
</script>

<div>
	<label for="" class="text-gray-400">{text}</label>
	<div class="input-wrapper">
		{#if iconType && icon}
			<i class={`fa-${iconType} fa-${icon} fa-md`} />
		{/if}
		<input
			on:change={onChange}
			{value}
			{placeholder}
			{type}
			{maxlength}
			name={text}
			required={isRequired ? true : false}
			class={`${
				hasIcon ? 'hasIcon' : 'noIcon'
			} font-sans mt-1 relative block text-gray-400 w-full appearance-none rounded border border-gray-300 px-3 py-3 text-gray-500 placeholder-gray-200 focus:z-5 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-md drop-shadow-sm ease-in-out duration-300`}
		/>
	</div>
</div>

<style>
	.input-wrapper {
		position: relative;
	}

	i {
		position: absolute;
		top: calc((4em / 1.25 - 1em) / 2);
		left: 12px;
		z-index: 10;
		color: #60a5fa;
	}

	input.hasIcon {
		padding-left: calc((calc(1em * 1.5) - 0.125em) * 1.5 + 0.25 * 0.25em);
	}
</style>
