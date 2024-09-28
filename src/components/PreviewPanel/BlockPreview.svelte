<script lang="ts">
	import { createLoadObserver } from '../../utils/watchImage';
	import LoadingSpinner from '../ui/LoadingSpinner.svelte';
	import { onMount } from 'svelte';
	import { getScreenshot } from '../../utils/getScreenshot';

	export let object: any;

	$: ({ url, src, title } = object);
	$: didImageLoad = false;

	$: screenshot = '';

	async function fetchScreenshot(url: string) {
		try {
			const screenshot = await getScreenshot(url);
			return screenshot;
		} catch (error) {
			console.error('Error getting screenshot:', error);
		}
	}

	onMount(async () => {
		if (src) {
			screenshot = (await fetchScreenshot(src)) || '';
		}
	});

	const onload = createLoadObserver(() => {
		setTimeout(() => {
			didImageLoad = true;
		}, 500);
	});

  $: if (src) {
    screenshot = ''
    didImageLoad = false;

    fetchScreenshot(src).then((res) => {
      screenshot = res ?? '';
      didImageLoad = true;
    });
  }
</script>

<div>
	<div class="content mt-10 mx-auto">
		<h1>{title}</h1>
		<a href={url} class="text-blue-500 line-clamp-1" target="_blank" rel="noreferrer">{url}</a>

    {#if !didImageLoad}
    <div class="h-full w-full flex items-center justify-center">
      <div class="flex items-center">
        <LoadingSpinner />
        <p class="text-gray-400 text-xl">Loading image</p>
      </div>
    </div>
  {/if}
		{#if url && screenshot}
			<object
				{title}
				data={url}
				style="width: 100%; display: block;"
				class="h-[500px] lg:h-[600px] 2xl:h-[800px] border border-gray-400"
			>
      <a href={url} target="_blank" rel="noreferrer">
        {#if !didImageLoad}
          <div class="h-full w-full flex items-center justify-center">
            <div class="flex items-center">
              <LoadingSpinner />
              <p class="text-gray-400 text-xl">Loading image</p>
            </div>
          </div>
        {/if}
        <img
          alt={title}
          src={screenshot}
          class={`h-auto m-auto min-h-[500px] max-h-[700px] object-fit border-l-4 border-r-4 border-gray-300  ${
            !didImageLoad ? 'hidden' : ''
          }`}
          use:onload
        />
      </a>
			</object>
		{/if}
	</div>
</div>
