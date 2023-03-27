
<script lang="ts">
  export let text = '';
  export let val = '';
  export let onClick: any;
  export let isIncluded: boolean;
</script>

<button 
  type="button"
  value={val}
  class={`${isIncluded ? 'bg-blue-500 text-white' : 'bg-blue-100 text-gray-400'} mt-2 py-2 px-4 no-underline rounded-full text-white font-sans font-semibold text-sm border-blue btn-primary focus:outline-none mr-2`}
  on:click={onClick}
>
  {text}
</button>
