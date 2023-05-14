<script lang="ts">
	import { v4 as uuidv4 } from 'uuid';
	import { PUBLIC_API_URL } from '$env/static/public';
	import { supabaseClient } from '$lib/supabase';
	import { onMount } from 'svelte';

	export let data;
	export let handleToggleModal: () => boolean;

	let error: String;
	let avatar: String | ArrayBuffer | null | undefined;
	let fileinput: any;

	const name = data?.data[0]?.name;
	const github = data?.data[0]?.github;
	const twitter = data?.data[0]?.twitter;
	const personalSite = data?.data[0]?.personal_site;
	const avatarId = data?.data[0]?.avatar_id;

	async function uploadAvatar(avatar: any) {
		const avatarId = uuidv4();
		const { data, error } = await supabaseClient.storage.from('avatars').upload(avatarId, avatar);

		const res = await fetch(`${PUBLIC_API_URL}/api/profile`, {
			method: 'POST',
			body: JSON.stringify(avatarId)
		});

		const json = await res.json();
	}

	const onFileSelected = (e: any) => {
		let image = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			avatar = e.target?.result;
			uploadAvatar(image);
		};
	};

	onMount(async () => {
		const { data, error: err }: { data: Blob | null; error: any } = await supabaseClient.storage
			.from('avatars')
			.download(avatarId);

		let reader = new FileReader();
		error = err;
		if (!error && data) {
			reader.readAsDataURL(data);
			reader.onload = (e) => {
				avatar = e.target?.result;
			};
		}
	});
</script>

<section class="bg-gray-100 py-12 flex justify-center items-center">
  <div class="flex  items-center gap-4 flex-col md:flex-row">
    	<div class="avatar-section">
		{#if error}
			<h1>something went wrong</h1>
		{/if}
		{#if avatar}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<img
				class="h-24 w-24 rounded-md"
				src={avatar?.toString()}
				alt="d"
				on:click={() => {
					fileinput.click();
				}}
			/>
		{:else}
			<img class="avatar" alt="" />
		{/if}
		<input
			style="display:none"
			type="file"
			accept=".jpg, .jpeg, .png"
			on:change={(e) => onFileSelected(e)}
			bind:this={fileinput}
		/>
	</div>
    <div>
      <h1 class="text-gray-500 font-sans text-2xl xl:text-3xl md:text-2xl font-light w-min whitespace-nowrap">{name}</h1>
      <div class="flex flex-row text-center whitespace-nowrap	gap-2 my-1">
        {#if github}
          <a href={github} target="_blank" class="underline font-semibold text-blue-400">Github</a>
        {/if}
        {#if twitter}
          <a href={twitter} target="_blank" class="underline font-semibold text-blue-400">Twitter</a>
        {/if}
        {#if personalSite}
          <a href={personalSite} target="_blank" class="underline font-semibold text-blue-400"
            >Personal Site</a
          >
        {/if}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <i class="fa-solid fa-pen text-blue-400" on:click={handleToggleModal} />
      </div>
    </div>
  </div>

</section>

<style>
	img {
		object-position: 50% 50%;
		object-fit: cover;
		background-color: gainsboro;
		aspect-ratio: 1/1;
	}

	img:hover {
		filter: opacity(0.9);
		cursor: pointer;
		transition: filter 300ms ease-in-out;
	}
</style>
