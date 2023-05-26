<script lang="ts">
	import { goto } from '$app/navigation';

	function submit(event: any) {
		if (event.key === 'Enter') {
			handleSearchByPress(searchQuery);
		}
	}

	export let searchQuery = '';
	export let objectType = '';

  const update = (event: Event) => {
    const element = event.currentTarget as HTMLInputElement
    const value = element.value
    searchQuery = value;
  }

	const handleSearch = async () => {
    if (searchQuery.length === 0) return

    const path = !!objectType ? `-${objectType}` : '';
		await goto(`/search/${encodeURIComponent(searchQuery.trim().toLowerCase())}${path}`);
	};

	const handleSearchByPress = async (q: string) => {
    if (q.length === 0) return

    const path = !!objectType ? `-${objectType}` : '';
		await goto(`/search/${encodeURIComponent(q.trim().toLowerCase())}${path}`);
	};
</script>

<div class="font-sans text-gray-400 flex items-center justify-center mt-4 md:mt-0">
	<div class="border rounded overflow-hidden flex">
		<input
			type="text"
			class="px-4 py-2"
			placeholder="Search..."
			on:change={update}
			bind:value={searchQuery}
			on:keydown={submit}
		/>
		<button class="flex items-center justify-center px-4 border-l" on:click={handleSearch}>
			<i class="fa-solid fa-magnifying-glass fa-md text-gray-400" />
		</button>
	</div>
</div>
