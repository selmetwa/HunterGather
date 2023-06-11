<script lang="ts">
	import Device from 'svelte-device-info';
	import { modalStore, previewPanel, previewPanelObject } from '../../store/store';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import { createCollection } from '../../queries/collections/createCollection';
	import Input from '../ui/Input.svelte';
	import Button from '../ui/Button.svelte';
	import ErrorMessage from '../ui/ErrorMessage.svelte';
	import SuccessMessage from '../ui/SuccessMessage.svelte';
	import CollectionPills from '../Collections/CollectionPills.svelte';

	export let onClose: any;
	export let collectionIds: any;

	let inProgress = false;
	let errorMessage = '';
	let successMessage = '';
	let title = '';
	let description = '';
	let toggledCollectionIds: string | any[] = [];

	const updateTitle = (e: any) => {
		title = e.target.value;
		return true;
	};

	const updateDescription = (e: any) => {
		description = e.target.value;
		return true;
	};

	const handleResponse = (res: any, responseData: any) => {
		const { status } = res;

		// handle error
		if (status === 500) {
			setTimeout(() => {
				inProgress = false;
				errorMessage = responseData.message;
				title = '';
				description = '';
				toggledCollectionIds = [];
			}, 1000);

			return;
		}

		setTimeout(() => {
			inProgress = false;
			successMessage = `Collection ${title} has been created successfully.`;
			title = '';
			description = '';
			toggledCollectionIds = [];

			const isMobile = Device.isMobile;

			setTimeout(() => {
				const { collectionId } = responseData[0];

				if (isMobile) {
					modalStore.set(false);
					goto(`/collection/${collectionId}`);
					return;
				}

				successMessage = '';
				previewPanel.set(true);
				previewPanelObject.set({ type: 'collection', object: { id: collectionId } });
				modalStore.set(false);
			}, 2000);
		}, 1000);
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

	const onClick = async () => {
		inProgress = true;
		const res = await createCollection(
			title,
			description,
			toggledCollectionIds,
			$page?.data?.session?.user?.id
		);
		// handleResponse(res);
		const responseData = await res.json();
		handleResponse(res, responseData);
	};
</script>

<main class="2xl:w-3/12 xl:w-4/12 lg:w-6/12 md:w-8/12 sm:w-8/12 bg-white p-8 m-auto rounded mt-20">
	{#if errorMessage}
		<ErrorMessage message={errorMessage} />
	{/if}
	{#if successMessage}
		<SuccessMessage message={successMessage} />
	{/if}
	<div class="w-full max-w-md space-y-4 flex items-center justify-between">
		<div class="flex-col">
			<h2 class="font-sans text-left text-2xl font-light tracking-tight text-gray-400">
				Create Collection
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
	<form class="mt-8 space-y-6" on:submit={onClick}>
		<Input
			type="text"
			text="Title"
			value={title}
			onChange={updateTitle}
			placeholder="Collection Title"
			isRequired={true}
			maxlength={50}
		/>
		<Input
			type="text"
			text="Description (Optional)"
			value={description}
			onChange={updateDescription}
			placeholder="What is this collection about"
			maxlength={150}
		/>
		<CollectionPills {collectionIds} {onPillClick} {toggledCollectionIds} />
		<Button text="Create Collection" type="submit" {inProgress} />
	</form>
</main>

<style>
	main {
		width: 100%;
		margin: auto;
	}
</style>
