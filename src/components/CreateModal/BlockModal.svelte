<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import Device from 'svelte-device-info';
  import { PUBLIC_API_URL } from '$env/static/public';
	import { previewPanel, previewPanelObject, objectToCollect, modalStore } from '../../store/store';

	import Input from '../ui/Input.svelte';
	import Button from '../ui/Button.svelte';
	import ErrorMessage from '../ui/ErrorMessage.svelte';
	import SuccessMessage from '../ui/SuccessMessage.svelte';
	import CollectionPills from '../Collections/CollectionPills.svelte';

	export let onClose: any;
	export let collectionIds: any;

	let inProgress = false;
	let successMessage = '';
	let errorMessage = '';
	let url = '';
	let title = '';
	let toggledCollectionIds: string | any[] = [];

	const updateTitle = (event: Event) => {
		const element = event.currentTarget as HTMLInputElement;
		const value = element.value;
		title = value;
    return true
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
    const res = await fetch(`${window.location.origin}/api/blocks`, {
			method: 'POST',
			headers: { accept: 'application/json' },
			body: JSON.stringify({
        title,
				url,
				collectionIds: toggledCollectionIds
			})
		});
		// const res = await createBlock(title, url, toggledCollectionIds, $page?.data?.session?.user?.id);
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
		<CollectionPills {collectionIds} {onPillClick} {toggledCollectionIds} />
		<Button text="Create Block" type="submit" {inProgress} />
	</form>
</main>

<style>
	main {
		width: 100%;
		margin: auto;
	}
</style>
