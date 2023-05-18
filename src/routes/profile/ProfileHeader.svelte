<script lang="ts">
	import { page } from '$app/stores';
	import { v4 as uuidv4 } from 'uuid';
	import { PUBLIC_API_URL } from '$env/static/public';
	import { supabaseClient } from '$lib/supabase';
	import { onMount } from 'svelte';

  import getUserById from '../../queries/user/getUserById';
  import EditProfileModal from '../../components/EditProfileModal/EditProfileModal.svelte';

	// export let data;
  // export let user: any;

	let error: String;
	let avatar: String | ArrayBuffer | null | undefined;
	let fileinput: any;

	let userId = $page?.data?.session?.user?.id;
  let isModalOpen = false;
  // const { name, github, twitter } = user;
  // const avatarId = user.avatar_id;
  // const personalSite = user.personal_site;
  // const profileId = user.id;

  $: name = '';
  $: github = '';
  $: twitter = '';
  $: avatarId = '';
  $: personalSite = '';
  $: profileId = '';

  $: if (avatarId) {
    loadAvatar()
  }

  // console.log({ user })
	async function uploadAvatar(avatar: any) {
		const avatarId = uuidv4();
		const { data, error } = await supabaseClient.storage.from('avatars').upload(avatarId, avatar);
    const { data: updateData, error: updateError } = await supabaseClient
      .from('users')
      .update({ 
        avatar_id: avatarId,
      })
      .eq('id', userId)
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

  const loadAvatar = async () => {
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
  }


	onMount(async () => {
    const user = await getUserById(userId || '')
    console.log({ user })
    name =  user && user[0].name;
    github = user && user[0].github;
    twitter = user && user[0].twitter;
    avatarId = user && user[0].avatar_id;
    personalSite = user && user[0].personal_site;
    profileId = user && user[0].id;
	});

  const handleToggleModal = (e: any) => {
    if (['close-modal-root', 'open-modal-root'].includes(e.target.id)) {
      isModalOpen = !isModalOpen
    }
  }
</script>

<section class="bg-gray-100 py-12 flex justify-center items-center">
  <div class="flex  items-center gap-4 flex-col md:flex-row">
    	<div class="avatar-section">
		{#if error}
      <div class="h-24 w-24 rounded-md bg-gray-200"></div>
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
        {#if userId === profileId}
          <i class="fa-solid fa-pen text-blue-400" id="open-modal-root" on:click={handleToggleModal} />
        {/if}
      </div>
    </div>
  </div>

</section>
{#if isModalOpen}
  <EditProfileModal {handleToggleModal} {name} {github} {personalSite} {twitter}  />
{/if}
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
