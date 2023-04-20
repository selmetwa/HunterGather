<script lang="ts">
  interface Tab {
    name: string,
    val: string
  }
	export let tabs: Array<Tab>;
	export let activeTab: string;
  export let toggleTab: any;
</script>

<section class="flex">
	{#each tabs as tab}
		<button
			value={tab.val}
			class={`${
				activeTab === tab.val ? 'bg-gray-300 text-black-500 font-bold' : 'bg-gray-100 text-gray-400'
			} rounded-md my-2 mx-2 m font-sans group relative flex w-full justify-center border border-transparent  py-2 px-4 font-medium ease-in-out duration-300 cursor-pointer`}
			on:click={(e) => toggleTab(e)}
		>
			{tab.name}
		</button>
	{/each}
</section>
