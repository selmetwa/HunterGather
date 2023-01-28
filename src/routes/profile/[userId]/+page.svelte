<script lang="ts">
	import Input from '../../../components/Input.svelte';
	import Button from '../../../components/Button.svelte';
	import Modal from '../../../components/Modal.svelte';
	import ProfileHeader from './ProfileHeader.svelte';

  interface Data {
    name: String,
    github: String,
    portfolio_site: String,
    twitter: String
  }
	export let data: Data;
	const name = data?.data[0]?.name;
	const github = data?.data[0]?.github;
	const twitter = data?.data[0]?.twitter;
	const personalSite = data?.data[0]?.personal_site;

	let isModalOpen = false;

  const handleToggleModal = () => isModalOpen = !isModalOpen;
</script>

<ProfileHeader {data} handleToggleModal={handleToggleModal} />
{#if isModalOpen}
  <Modal onClose={handleToggleModal}>
    <main class="2xl:w-3/12 xl:w-4/12 lg:w-6/12 md:w-8/12 sm:w-8/12 bg-white p-8 m-auto rounded mt-20">
      <div class="w-full max-w-md space-y-4">
        <h2 class="font-sans text-left text-2xl font-light tracking-tight text-gray-400">Update Info</h2>
        <div class="flex-grow border-t border-gray-200"></div>
      </div>
      <form action="?/updateInfo" method="POST" class="mt-8 space-y-6">
        <Input type="text" text="name" iconType="solid" icon="user" value={name} />
        <Input type="text" text="twitter" iconType="brands" icon="twitter" value={twitter} />
        <Input type="text" text="github" iconType="brands" icon="github" value={github} />
        <Input type="text" text="personal_site" iconType="solid" icon="window-maximize" value={personalSite} />
        <Button text="Submit" type="submit" />
      </form>
    </main>
  </Modal>
{/if}

<style>
	main {
		width: 100%;
		margin: auto;
	}

	.upload{
		display:flex;
	  height:50px;
		width:50px;
		cursor:pointer;
	}
	.avatar{
		display:flex;
		height:200px;
		width:200px;
	}
</style>
