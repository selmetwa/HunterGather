<script lang="ts">
	import { scale, fade } from 'svelte/transition';

	interface Tab {
		name: string;
		val: string;
	}
	export let tabs: Array<Tab>;
	export let activeTab: string;
	export let toggleTab: any;
</script>

<section class="flex">
	{#each tabs as tab}
		<button
			value={tab.val}
      transition:fade
			class={`${
				activeTab === tab.val ? 'border-2 text-action-400 border-action-400 font-bold' : 'text-gray-400 border-2 border-gray-100'
			} bg-gray-100 rounded-md my-2 mx-2 m font-sans group relative flex w-full justify-center py-2 px-4 font-medium ease-in-out duration-300 cursor-pointer`}
			on:click={(e) => toggleTab(e)}
		>
			{tab.name}
		</button>
	{/each}
</section>
