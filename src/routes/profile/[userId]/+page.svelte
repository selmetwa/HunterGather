<script lang="ts">
	import { previewPanel } from '../../../store/store';

	import Input from '../../../components/Input.svelte';
	import Button from '../../../components/Button.svelte';
	import Modal from '../../../components/Modal.svelte';
	import ProfileHeader from './ProfileHeader.svelte';
	import Tabs from '../../../components/Tabs.svelte';
	import BlockCard from '../../../components/BlockCard.svelte';
	import CollectionCard from '../../../components/CollectionCard.svelte';
  import EditProfileModal from '../../../components/EditProfileModal/EditProfileModal.svelte';

	interface Data {
		data: any;
		name: String;
		blocks: Array<any>;
		collections: Array<any>;
		github: String;
		portfolio_site: String;
		twitter: String;
	}
	export let data: Data;
	const name = data?.data[0]?.name;
	const github = data?.data[0]?.github;
	const twitter = data?.data[0]?.twitter;
	const personalSite = data?.data[0]?.personal_site;
	const blocks = data && data.blocks;
	const collections = data && data.collections;

	let isModalOpen = false;

	const handleToggleModal = (e: any) => {
    if (['close-modal-root', 'open-modal-root'].includes(e.target.id)) {
      isModalOpen = !isModalOpen
    }
  }

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

<ProfileHeader {data} {handleToggleModal} />
{#if isModalOpen}
  <EditProfileModal {handleToggleModal} user={data?.data[0]} />
{/if}

<section>
	<div class="m-8 2xl:w-3/12 xl:w-4/12 lg:w-6/12 md:w-8/12 sm:w-8/12">
		<Tabs {tabs} {activeTab} {toggleTab} />
	</div>
	{#if activeTab === 'block'}
		<div class="xl:p-x-24 lg:p-x-16 sm:p-8">
			<div class={`grid gap-4 ${gridRules}`}>
				{#each blocks as block}
					<BlockCard {block} />
				{/each}
			</div>
		</div>
	{:else}
		<div class="xl:p-x-24 lg:p-x-16 sm:p-8">
			<div class={`grid gap-4 ${gridRules}`}>
				{#each collections as collection}
					<CollectionCard {collection} />
				{/each}
			</div>
		</div>
	{/if}
</section>