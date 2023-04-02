
<script lang="ts">
	import { supabaseClient } from '$lib/supabase';
	import { onMount } from 'svelte';
  export let text = '';
  // export let collectionId = '';
  // export let objectId = ''; // item we're collecting
  // export let isToggled: boolean;

  let isIncluded = false;

</script>

<button 
  type="button"
  class={`${isIncluded ? 'bg-blue-500 text-white' : 'bg-blue-100 text-gray-400'} mt-2 py-2 px-4 no-underline rounded-full text-white font-sans font-semibold text-sm border-blue btn-primary focus:outline-none mr-2`}
>
  {text}
</button>
