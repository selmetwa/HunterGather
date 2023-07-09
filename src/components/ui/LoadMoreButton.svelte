<script lang="ts">
	export let onClick: () => void;
  // before 	class="font-bold font-sans group relative flex w-min justify-center rounded-md border border-transparent bg-action-400 hover:bg-action-500 py-2 px-4 text-lg font-medium text-white focus:outline-none focus:ring-2 focus:gray-300 focus:ring-offset-2 drop-shadow-sm ease-in-out duration-300 whitespace-nowrap mx-auto my-24"
  // class="group relative flex w-full justify-center rounded-sm border border-gray-500 bg-action-400 hover:bg-action-500 py-2 px-4 text-md font-medium text-gray-800 focus:outline-none focus:ring-2 focus:gray-300 focus:ring-offset-2 drop-shadow-sm ease-in-out duration-300"

</script>

<button
  class="group relative flex w-min justify-center rounded-sm border border-gray-500 bg-action-400 hover:bg-action-500 py-2 px-4 text-md font-medium text-gray-800 focus:outline-none focus:ring-2 focus:gray-300 focus:ring-offset-2 ease-in-out duration-300 whitespace-nowrap mx-auto my-24"
	on:click={onClick}
>
	Load More
</button>