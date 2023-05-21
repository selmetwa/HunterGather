<script lang="ts">
  export let searchQuery = '';
  export let updateSearch = (e: any) => null;
  export let handleSearch: () => void;
  export let handleSearchByPress: (str: string) => void;

  function submit(event: any) {
    if (event.key === 'Enter') {
      handleSearchByPress(searchQuery)
    }
  }
</script>

<div class="font-sans text-gray-400 flex items-center justify-center">
  <div class="border rounded overflow-hidden flex">
    <input type="text" class="px-4 py-2" placeholder="Search..." on:change={updateSearch} bind:value={searchQuery} on:keydown={submit} >
    <button class="flex items-center justify-center px-4 border-l" on:click={handleSearch}>
      <i class="fa-solid fa-magnifying-glass fa-md text-gray-400"></i>    
    </button>
  </div>
</div>