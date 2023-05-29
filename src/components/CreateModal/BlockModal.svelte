<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import Device from 'svelte-device-info';

	import { previewPanel, previewPanelObject, objectToCollect, modalStore } from '../../store/store';

	import { createUniqueArray } from '../../utils/createUniqueArray';
	import getPaginatedCollectionsByUserId from '../../queries/user/getPaginatedCollectionsByUserId';
	import getCollectionsCountByUserId from '../../queries/user/getCollectionsCountByUserId';
	import getCollectionsByUserId from '../../queries/user/getCollectionsByUserId';
	import { createBlock } from '../../queries/blocks/createBlock';
	import Input from '../Input.svelte';
	import Button from '../Button.svelte';
	import Pill from '../Pill.svelte';
	import ErrorMessage from '../ErrorMessage.svelte';
	import SuccessMessage from '../SuccessMessage.svelte';
	import { onMount } from 'svelte';

	export let onClose: any;
	export let collectionIds: any;
	export let count: number;
	export let nextPage: any;
	let inProgress = false;
	let successMessage = '';
	let errorMessage = '';
	let url = '';
	let title = '';
	let toggledCollectionIds: string | any[] = [];
	// let ids: any[] = [];
	// let p = 0;

	// $: count = 0;
	// $: if (p) loadMore();

	// const loadMore = async () => {
	// 	ids = createUniqueArray(
	// 		ids,
	// 		await getPaginatedCollectionsByUserId($page?.data?.session?.user?.id || '', p, 5)
	// 	);
	// };

	// onMount(async () => {
	// 	ids = await getPaginatedCollectionsByUserId($page?.data?.session?.user?.id || '', 0, 5);
	// 	count = await getCollectionsCountByUserId($page?.data?.session?.user?.id);
	// });

	const updateTitle = (event: Event) => {
		const element = event.currentTarget as HTMLInputElement;
		const value = element.value;
		title = value;
	};

	const updateUrl = (e: any) => {
		url = e.target.value;
		return true;
	};

	const handleResponse = (res: any, responseData: any) => {
		const { status } = res;

		// handle error
		if (status === 500) {
			setTimeout(() => {
				inProgress = false;
				errorMessage = responseData.message;
				url = '';
				toggledCollectionIds = [];
			}, 1000);

			return;
		}

		errorMessage = '';

		setTimeout(() => {
			inProgress = false;
			successMessage = `Block has been created successfully.`;
			url = '';
			toggledCollectionIds = [];

			/**
			 * close modal and redirect user somewhere
			 */
			const isMobile = Device.isMobile;
			setTimeout(() => {
				if (isMobile) {
					modalStore.set(false);
					goto(`/block/${responseData[0].blockId}`);
					return;
				}
				successMessage = '';
				modalStore.set(false);
				previewPanel.set(true);
				objectToCollect.set(responseData[0]);
				previewPanelObject.set({ type: 'block', object: responseData[0] });
			}, 2000);
		}, 1000);
	};

	const onSubmit = async () => {
		inProgress = true;
		const res = await createBlock(title, url, toggledCollectionIds, $page?.data?.session?.user?.id);
		const responseData = await res.json();
		handleResponse(res, responseData);
	};

	const onPillClick = (e: any) => {
		const copy = [...toggledCollectionIds];
		const id = e.target.value;
		if (copy.includes(id)) {
			const index = copy.indexOf(id);
			copy.splice(index, 1);
		} else {
			copy.push(id);
		}

		toggledCollectionIds = copy;
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<main
	class="2xl:w-3/12 xl:w-4/12 lg:w-6/12 md:w-8/12 sm:w-8/12 bg-white p-8 m-auto rounded mt-20 height-auto"
>
	{#if errorMessage}
		<ErrorMessage message={errorMessage} />
	{/if}
	{#if successMessage}
		<SuccessMessage message={successMessage} />
	{/if}
	<div class="w-full max-w-md space-y-4 flex items-center justify-between">
		<div class="flex-col">
			<h2 class="font-sans text-left text-2xl font-light tracking-tight text-gray-400">
				Create Block
			</h2>
		</div>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<i
			class="fa-solid fa-xmark text-2xl text-gray-400 hover:text-gray-300 hover:transition-all cursor-pointer"
			id="close-modal-root"
			on:click={onClose}
		/>
	</div>
	<div class="flex-grow border-t border-gray-200" />
	<form class="mt-8 space-y-6" on:submit={onSubmit}>
		<Input
			type="text"
			text="Add a custom title, or let us scrape the page title for you"
			value={title}
			onChange={updateTitle}
			placeholder="Title"
		/>
		<Input type="text" text="URL" value={url} onChange={updateUrl} placeholder="url" />
		{#if !!collectionIds.length}
			<div>
				<p class="text-gray-400">Add to collection(s)</p>
				<div>
					{#each collectionIds as obj}
						<Pill
							val={obj.collectionId}
							text={obj.title}
							onClick={onPillClick}
							isIncluded={toggledCollectionIds.includes(obj.collectionId)}
						/>
					{/each}
					{#if collectionIds.length < count}
						<button on:click={nextPage} type="button" class="text-gray-400 font-medium">
							Load More
						</button>
					{/if}
				</div>
			</div>
		{/if}
		<Button text="Create Block" type="submit" {inProgress} />
	</form>
</main>

<style>
	main {
		width: 100%;
		margin: auto;
	}
</style>
