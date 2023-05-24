<script lang="ts">
  export let handleFilter: (filterString: string) => void;

  $: filterString = '';

  const onChange = (event: Event) => {
    const element = event.currentTarget as HTMLInputElement
    const value = element.value;
    filterString = value
  }

  const onClick = () => {
    handleFilter(filterString)
  }

  const onKeyDown = (event: any) => {
		if (event.key === 'Enter') {
      handleFilter(filterString)
		}
  }
</script>

<div class="font-sans text-gray-400 flex items-center justify-center mt-4 md:mt-2">
	<div class="border rounded overflow-hidden flex">
		<input
			type="text"
			class="px-4 py-2"
			placeholder="Filter by title"
      bind:value={filterString}
      on:change={onChange}
      on:keydown={onKeyDown}
		/>
		<button class="flex items-center justify-center px-4 border-l" on:click={onClick}>
			<span class="font-sans text-gray-400">Filter</span>
		</button>
	</div>
</div>