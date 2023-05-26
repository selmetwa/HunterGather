<script lang="ts">
	import { goto } from '$app/navigation';

	export let objectType = '';
	export let searchTerm = '';

	$: checkIfAll = (objectType === undefined) || (objectType === '') ? 'font-medium' : 'font-light';
	$: checkIfBlocks = objectType === 'blocks' ? 'font-medium' : 'font-light';
	$: checkIfCollections = objectType === 'collections' ? 'font-medium' : 'font-light';

	const updatePath = async (event: Event) => {
    const element = event.currentTarget as HTMLInputElement
    const value = element.value;

    const path = !!value ? `-${value}` : '';
    await goto(`/search/${encodeURIComponent(searchTerm.trim().toLowerCase())}${path}`)
	};
</script>

<div class="my-2 whitespace-nowrap">
	<button
		class={`text-blue-400 font-sans ${checkIfAll} color-blue cursor-pointer`}
		value=""
		on:click={updatePath}>All</button
	>
	/
	<button
		class={`text-blue-400 font-sans ${checkIfBlocks} color-blue cursor-pointer`}
		value="blocks"
		on:click={updatePath}>Blocks</button
	>
	/
	<button
		class={`text-blue-400 font-sans ${checkIfCollections} color-blue cursor-pointer`}
		value="collections"
		on:click={updatePath}>Collections</button
	>
</div>
