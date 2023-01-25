<script lang="ts">
	import Input from '../../../components/Input.svelte';
	import Button from '../../../components/Button.svelte';
	import ProfileHeader from './ProfileHeader.svelte';

  interface Data {
    name: String,
    github: String,
    portfolio_site: String,
    twitter: String
  }
	export let data: Data;

	let isModalOpen = false;
</script>

<ProfileHeader {data} />
{#if isModalOpen}
	<main>
		<form action="?/updateInfo" method="POST" class="mt-8 space-y-6">
			<Input type="text" text="name" iconType="solid" icon="user" />
			<Input type="text" text="twitter" iconType="brands" icon="twitter" />
			<Input type="text" text="github" iconType="brands" icon="github" />
			<Input type="text" text="personal_site" iconType="solid" icon="window-maximize" />
			<Button text="Submit" type="submit" />
		</form>
	</main>
{/if}

<style>
	main {
		width: 50%;
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
