<script lang="ts">
	import { onMount } from 'svelte';

	import { previewPanel } from '../../../../store/store';
	import BlockCard from '../../../../components/BlockCard.svelte';
	import Tabs from '../../../../components/Tabs.svelte';

	import { createUniqueArray } from '../../../../utils/createUniqueArray';
	import getBlocksByUserId from '../../../../queries/user/getBlocksByUserId';
	import getBlocksCountByUserId from '../../../../queries/user/getBlocksCountByUserId';
	import ProfileHeader from '../../ProfileHeader.svelte';

	interface Data {
		blocks: Array<any>;
		userId: string;
	}

	export let data: Data;
	let blocks = data.blocks;
	let page = 0;

	$: count = 0;
	$: if (page) loadMore();

	onMount(async () => {
		count = await getBlocksCountByUserId(data.userId);
	});

	const loadMore = async () => {
		blocks = createUniqueArray(blocks, await getBlocksByUserId(data.userId, page, 15));
	};

	let activeTab = 'block';
	const toggleTab = (e: any) => {
		activeTab = e.target.value;
	};
	const tabs = [
		{
			name: 'Blocks',
			val: 'block'
		},
		{
			name: 'Collections',
			val: 'collection'
		}
	];

	let gridRules: string;
	previewPanel.subscribe((isPreviewPanelOpen) => {
		gridRules = isPreviewPanelOpen
			? 'grid-cols-2'
			: 'sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5';
	});
</script>

<ProfileHeader />
<section>
	<!-- <div class="m-8 2xl:w-3/12 xl:w-4/12 lg:w-6/12 md:w-8/12 sm:w-8/12">
		<Tabs {tabs} {activeTab} {toggleTab} />
	</div> -->
  <div class="mt-8 ml-8">
    <a href="#top" class='text-blue-400 font-sans font-bold color-blue'>Blocks</a> / <a href={`/profile/collections/${data.userId}`} class='text-blue-400 font-sans font-light color-blue'>Collections</a>
  </div>
	<div class="xl:p-x-24 lg:p-x-16 sm:p-8">
		<div class={`grid gap-4 ${gridRules}`}>
			{#each blocks as block}
				<BlockCard {block} />
			{/each}
		</div>
	</div>
	{#if blocks.length < count}
		<button
			class="font-bold font-sans group relative flex w-min justify-center rounded-md border border-transparent bg-action-400 hover:bg-action-500 py-2 px-4 text-lg font-medium text-white focus:outline-none focus:ring-2 focus:gray-300 focus:ring-offset-2 drop-shadow-sm ease-in-out duration-300 my-24 whitespace-nowrap mx-auto"
			on:click={() => (page += 1)}
		>
			Load More
		</button>
	{/if}
</section>
