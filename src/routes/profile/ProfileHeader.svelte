<script lang="ts">
	import { page } from '$app/stores';
	import { v4 as uuidv4 } from 'uuid';
	import { supabaseClient } from '$lib/supabase';
	import { onMount } from 'svelte';

	import getBlocksCountByUserId from '../../queries/user/getBlocksCountByUserId';
	import getCollectionsCountByUserId from '../../queries/user/getCollectionsCountByUserId';
	import getUserById from '../../queries/user/getUserById';
	import EditProfileModal from '../../components/EditProfileModal/EditProfileModal.svelte';

	export let userId: string;

	let error: String;
	let avatar: String | ArrayBuffer | null | undefined;
	let fileinput: any;

	let isModalOpen = false;

	$: name = '';
	$: github = '';
	$: twitter = '';
	$: avatarId = '';
	$: personalSite = '';
	$: profileId = '';
	$: objectsCount = 0;
  $: isSubscriber = false;

	$: if (avatarId) {
		loadAvatar();
	}

	$: if (userId) {
		loadData();
	}

	async function uploadAvatar(avatar: any) {
		const avatarId = uuidv4();
		const { data, error } = await supabaseClient.storage.from('avatars').upload(avatarId, avatar);
		const { data: updateData, error: updateError } = await supabaseClient
			.from('users')
			.update({
				avatar_id: avatarId
			})
			.eq('id', userId);
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
	};

	const loadData = async () => {
		const user = await getUserById(userId || '');
		const blocksCount = await getBlocksCountByUserId(userId);
		const collectionsCount = await getCollectionsCountByUserId(userId);
		objectsCount = blocksCount + collectionsCount;
    isSubscriber = user && user[0].is_subscriber
		name = user && user[0].name;
		github = user && user[0].github;
		twitter = user && user[0].twitter;
		avatarId = (user && !!user[0].avatar_id && user[0].avatar_id) || '';
		personalSite = user && user[0].personal_site;
		profileId = user && user[0].id;
	};

	onMount(async () => {
		loadData();
	});

	const handleToggleModal = (e: any) => {
		if (['close-modal-root', 'open-modal-root'].includes(e.target.id)) {
			isModalOpen = !isModalOpen;
		}
	};
</script>

<section class="bg-gray-100 py-12 flex flex-col justify-center items-center">
	<div>
		<div class="flex items-center gap-4 flex-col md:flex-row">
			<div class="avatar-section">
				{#if error}
					<!-- <div class="h-24 w-24 rounded-md bg-gray-200"></div> -->
					<p>something went wrong</p>
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
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div
						class="avatar h-24 w-24 rounded-md bg-gray-200"
						on:click={() => {
							fileinput.click();
						}}
					/>
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
				<h1
					class="text-gray-500 font-sans text-2xl xl:text-3xl md:text-2xl font-light w-min whitespace-nowrap"
				>
					{name}
				</h1>
				<div class="flex flex-row text-center whitespace-nowrap gap-2 my-1">
					{#if github}
						<a
							href={github}
							target="_blank"
							rel="noreferrer"
							class="underline font-semibold text-blue-400">Github</a
						>
					{/if}
					{#if twitter}
						<a
							href={twitter}
							target="_blank"
							rel="noreferrer"
							class="underline font-semibold text-blue-400">Twitter</a
						>
					{/if}
					{#if personalSite}
						<a
							href={personalSite}
							target="_blank"
							rel="noreferrer"
							class="underline font-semibold text-blue-400">Personal Site</a
						>
					{/if}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					{#if $page?.data?.session?.user?.id === profileId}
						<i
							class="fa-solid fa-pen text-blue-400"
							id="open-modal-root"
							on:click={handleToggleModal}
						/>
					{/if}
				</div>
			</div>
		</div>
    {#if ($page?.data?.session?.user?.id === profileId) && !isSubscriber}
    <div>
      <p class="mt-4 text-light text-gray-400">{objectsCount} / 200 Objects used</p>
      <progress id="file" max="200" value={objectsCount} class="mt-1" />
      <a href="/pricing" class="text-blue-400 text-light underline">Subscribe for unlimited</a>
    </div>
    {/if}

	</div>
</section>

{#if isModalOpen}
	<EditProfileModal {handleToggleModal} {name} {github} {personalSite} {twitter} />
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

	progress {
		border-radius: 3px;
		height: 22px;
    width: 100%;
	}
	progress::-webkit-progress-bar {
		background-color: #cbd5e1;
		border-radius: 3px;
	}
	progress::-webkit-progress-value {
		background-color: #3b82f6;
		border-radius: 3px;
	}
	progress::-moz-progress-bar {
		/* style rules */
	}
</style>
