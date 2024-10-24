<script lang="ts">
	import { fade } from 'svelte/transition';

	import ObjectTypeNav from './ObjectTypeNav.svelte';
	import ObjectTypeNavSearch from './ObjectTypeNavSearch.svelte';
	import SearchBar from './SearchBar.svelte';
	import ObjectViewButtons from './ObjectViewButtons.svelte';
	export let currentPath = '';
	export let objectType = '';
	export let searchTerm = '';
	export let count = 0;
	export let isSearchPage = false;
</script>

<div
	class="my-8 sm:px-8 md:px-16 xl:px-24 flex justify-between items-center flex-col md:flex-row"
	transition:fade|global
>
	{#if isSearchPage}
		<h1 class="font-sans text-left text-3xl font-light tracking-tight text-gray-400 my-6">
			{!!objectType ? `${count} ${objectType} matching` : `${count} search results for`}
			<span class="text-action-400">{searchTerm}</span>
		</h1>
		<div>
			<ObjectTypeNavSearch {objectType} {searchTerm} />
			<div class="flex flex-col md:flex-row justify-between items-center">
				<ObjectViewButtons />
				<SearchBar {objectType} />
			</div>
		</div>
	{:else}
		<ObjectTypeNav {currentPath} />
		<div class="flex flex-col md:flex-row justify-between items-center">
			<ObjectViewButtons />
			<SearchBar {objectType} />
		</div>
	{/if}
</div>
