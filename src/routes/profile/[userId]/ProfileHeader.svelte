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
		console.log({ avatar });

		const avatarId = uuidv4();
		const { data, error } = await supabaseClient.storage.from('avatars').upload(avatarId, avatar);

		console.log({
			data,
			error
		});
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
		const { data, error: err }: {data: Blob | null, error: any } = await supabaseClient.storage.from('avatars').download(avatarId);

		let reader = new FileReader();
    error = err;
    if (!error && data) {
      reader.readAsDataURL(data);
      reader.onload = (e) => {
        avatar = e.target?.result;
      };
    }
	});

	console.log({ avatar });
</script>

<section>
	<div class="avatar-section">
    <h1 class="text-blue-200 font-sans text-3xl xl:text-5xl md:text-4xl">{name}</h1>
    {#if error}
      <h1>something went wrong</h1>
    {/if}
		{#if avatar}
			<img
				class="avatar"
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

  <div class="text">
    {#if github}
      <a href={github} target="_blank" class="underline font-semibold text-blue-400">Github</a>
    {/if}
    {#if twitter}
      <a href={twitter} target="_blank" class="underline font-semibold text-blue-400">Twitter</a>
    {/if}
    {#if personalSite}
      <a href={personalSite} target="_blank" class="underline font-semibold text-blue-400">Personal Site</a>      
    {/if}
    <i class="fa-solid fa-pen text-blue-400" on:click={handleToggleModal}></i>
  </div>

</section>

<style>

  h1 {
    position: absolute;
    top: 70px;
    font-weight: 900;
  }

	.avatar-section {
		background: linear-gradient(#3b82f6 calc(200px - 50px), #eff6ff 50%);
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
	}

	.avatar {
		height: 100px;
		width: 100px;
		border-radius: 50%;
	}

  img {
    object-position: 50% 50%;
		object-fit: cover;
		background-color: gainsboro;
    aspect-ratio: 1/1;
  }

  img:hover {
    filter: opacity(.9);
    cursor: pointer;
    transition: filter 300ms ease-in-out;
  }

  .text {
    display: flex;
    flex-direction: row;
    gap: 10px;
    text-align: center;
    width: min-content;
    white-space: nowrap;
    margin: 12px auto;
  }
</style>
