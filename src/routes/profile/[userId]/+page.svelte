<script lang="ts">
	import { myBlocks } from '../../../store/store';

	import Input from '../../../components/Input.svelte';
	import Button from '../../../components/Button.svelte';
	import Modal from '../../../components/Modal.svelte';
	import Masonry from '../../../components/Masonry.svelte';
	import ProfileHeader from './ProfileHeader.svelte';
	import Tabs from '../../../components/Tabs.svelte';

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

	const handleToggleModal = () => (isModalOpen = !isModalOpen);

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
</script>

<ProfileHeader {data} {handleToggleModal} />
{#if isModalOpen}
	<Modal onClose={handleToggleModal}>
		<main
			class="2xl:w-3/12 xl:w-4/12 lg:w-6/12 md:w-8/12 sm:w-8/12 bg-white p-8 m-auto rounded mt-20"
		>
			<div class="w-full max-w-md space-y-4 flex items-center justify-between">
				<div class="flex-col">
					<h2 class="font-sans text-left text-2xl font-light tracking-tight text-gray-400">
						Update Profile Info
					</h2>
				</div>
				<i
					class="fa-solid fa-xmark text-2xl text-gray-400 hover:text-gray-300 hover:transition-all cursor-pointer"
					on:click={handleToggleModal}
				/>
			</div>
			<div class="flex-grow border-t border-gray-200" />
			<form action="?/updateInfo" method="POST" class="mt-8 space-y-6">
				<Input
					type="text"
					text="name"
					iconType="solid"
					icon="user"
					value={name}
					placeholder="name"
				/>
				<Input
					type="text"
					text="twitter"
					iconType="brands"
					icon="twitter"
					value={twitter}
					placeholder="twitter"
				/>
				<Input
					type="text"
					text="github"
					iconType="brands"
					icon="github"
					value={github}
					placeholder="github"
				/>
				<Input
					type="text"
					text="personal_site"
					iconType="solid"
					icon="window-maximize"
					value={personalSite}
					placeholder="you.com"
				/>
				<Button text="Submit" type="submit" />
			</form>
		</main>
	</Modal>
{/if}
<section>

  <div class="m-8 2xl:w-3/12 xl:w-4/12 lg:w-6/12 md:w-8/12 sm:w-8/12">
    <Tabs tabs={tabs} activeTab={activeTab} toggleTab={toggleTab} />
  </div>
  {#if activeTab === 'block'}
  <Masonry gridGap={'0.75rem'} colWidth={'minmax(Min(20em, 100%), 1fr)'} items={blocks}>
		{#each blocks as o}
			<div class="_card _padding">
				<header>
					<h3>{o.title}</h3>
				</header>
				<img src={o.src} />
			</div>
		{/each}
	</Masonry>
    {:else}
    <Masonry gridGap={'0.75rem'} colWidth={'minmax(Min(20em, 100%), 1fr)'} items={collections}>
      {#each collections as o}
      <a href={`/collection/${o.collectionId}`}>
        <div class="_card _padding">
          <header>
            <h3>{o.title}</h3>
          </header>
        </div>
      </a>
      {/each}
    </Masonry>
  {/if}

</section>

<style>
	main {
		width: 100%;
		margin: auto;
	}

	._padding {
		padding: 12px;
	}

	._card {
		border: 1px solid #ccc;
	}

	img {
		width: 100%;
		height: auto;
	}
</style>
