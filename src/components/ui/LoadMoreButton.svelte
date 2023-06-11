<script lang="ts">
	export let onClick: () => void;
</script>

<button
	class="font-bold font-sans group relative flex w-min justify-center rounded-md border border-transparent bg-action-400 hover:bg-action-500 py-2 px-4 text-lg font-medium text-white focus:outline-none focus:ring-2 focus:gray-300 focus:ring-offset-2 drop-shadow-sm ease-in-out duration-300 mt-24 whitespace-nowrap mx-auto my-24"
	on:click={onClick}
>
	Load More
</button>
