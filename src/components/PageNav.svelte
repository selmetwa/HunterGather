<script lang="ts">
  import { objectView } from '../store/store';
	import ObjectTypeNav from './ObjectTypeNav.svelte';
	import ObjectTypeNavSearch from './ObjectTypeNavSearch.svelte';
	import SearchBar from './SearchBar.svelte';

	export let currentPath = '';
	export let objectType = '';
	export let searchTerm = '';
	export let count = 0;
	export let isSearchPage = false;

  const toggleCardView = () => {
    objectView.set('card')
  }

  const toggleRowView = () => {
    objectView.set('row')
  }
</script>

<div class="my-8 sm:px-8 md:px-16 xl:px-24 flex justify-between items-center flex-col md:flex-row">
	{#if isSearchPage}
		<h1 class="font-sans text-left text-3xl font-light tracking-tight text-gray-400 my-6">
			{count} Search Results for <span class="text-action-400">{searchTerm}</span>
		</h1>
		<div>
			<ObjectTypeNavSearch {objectType} {searchTerm} />
			<div class="flex flex-row justify-between items-center">
        <div class="flex flex-row gap-4 mr-4">
          <button on:click={toggleCardView}>
            <i class={`fa-solid fa-table-cells-large fa-xl ${$objectView === 'card' ? 'text-blue-400' : 'text-gray-400'}`}></i>
          </button>
          <button on:click={toggleRowView}>
            <i class={`fa-solid fa-list fa-xl ${$objectView === 'row' ? 'text-blue-400' : 'text-gray-400'}`}></i>
          </button>
        </div>
				<SearchBar {objectType} />
			</div>
		</div>
	{:else}
    <ObjectTypeNav {currentPath} />
    <div class="flex flex-row justify-between items-center">
      <div class="flex flex-row gap-4 mr-4">
        <button on:click={toggleCardView}>
          <i class={`fa-solid fa-table-cells-large fa-xl ${$objectView === 'card' ? 'text-blue-400' : 'text-gray-400'}`}></i>
        </button>
        <button on:click={toggleRowView}>
          <i class={`fa-solid fa-list fa-xl ${$objectView === 'row' ? 'text-blue-400' : 'text-gray-400'}`}></i>
        </button>
      </div>
      <SearchBar {objectType} />
    </div>
	{/if}
</div>
