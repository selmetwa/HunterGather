<script lang="ts">
	import { supabaseClient } from '$lib/supabase';
	import { onMount } from 'svelte';

	import Modal from '../Modal.svelte';
	import { collectionIds, collectingModal, objectToCollect } from '../../store/store';
	import Button from '../Button.svelte';
	import Pill from '../Pill.svelte';
	import ErrorMessage from '../ErrorMessage.svelte';
	import SuccessMessage from '../SuccessMessage.svelte';

	let inProgress = false;
	let successMessage = '';
	let errorMessage = '';
	let url = '';
	let toggledCollectionIds: string | any[] = [];
	let ids: any[] = [];
	let originalIds: string[] = [];
	let objectWeAreCollecting: any;

	objectToCollect.subscribe((value) => {
		objectWeAreCollecting = value;
	});
	collectionIds.subscribe((value) => {
		ids = value;
	});

	const handleResponse = (error: any) => {
		// handle error
		if (error) {
			setTimeout(() => {
				inProgress = false;
				errorMessage = 'Something went wrong';
				url = '';
			}, 1000);

			return;
		}

		errorMessage = '';
		setTimeout(() => {
			inProgress = false;
			successMessage = `Object has been updated successfully.`;
			url = '';

			/**
			 * close modal and redirect user somewhere
			 */
			setTimeout(() => {
				successMessage = '';
			}, 2000);
		}, 1000);
	};

	onMount(async () => {
		const { objectType } = objectWeAreCollecting;

		let data;
		let all;
		if (objectType === 'block') {
			const { data } = await supabaseClient
				.from('blocks')
				.select()
				.eq('blockId', objectWeAreCollecting.blockId);
			all = data && data[0] && data && data[0].collectionIds;
		}

		if (objectType === 'collection') {
			const { data } = await supabaseClient
				.from('collections')
				.select()
				.eq('collectionId', objectWeAreCollecting.collectionId);
			all = data && data[0] && data && data[0].collectionIds;
		}

		const realIds = ids.map((i) => i.collectionId);
		const filtered = all.filter((id: string) => realIds.includes(id));
		toggledCollectionIds = filtered;

		originalIds = all.filter((id: string) => !realIds.includes(id));
	});

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

	const onClose = (e: any) => {
		if (e.target.id === 'close-modal-root') {
			collectingModal.set(false);
			objectToCollect.set({});
		}
	};

	const onSubmit = async () => {
		const a = [...originalIds, ...toggledCollectionIds];
		inProgress = true;
		let data, error;

		if (objectWeAreCollecting.objectType === 'block') {
			const { data: d, error: e } = await supabaseClient
				.from('blocks')
				.update({ collectionIds: a })
				.eq('blockId', objectWeAreCollecting.blockId)
				.select();

			data = d;
			error = e;
		}

		if (objectWeAreCollecting.objectType === 'collection') {
			const { data: d, error: e } = await supabaseClient
				.from('collections')
				.update({ collectionIds: a })
				.eq('collectionId', objectWeAreCollecting.collectionId)
				.select();

			data = d;
			error = e;
		}

		handleResponse(error);
	};
</script>

<Modal {onClose}>
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
					Save to collection(s)
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

		{#if objectWeAreCollecting.src}
			<div class="preview w-full bg-blue-100 mt-6">
				<img src={objectWeAreCollecting.src} alt={objectWeAreCollecting.title} />
				<h3>{objectWeAreCollecting.title}</h3>
			</div>
		{/if}

		<form class="mt-8 space-y-6" on:submit={onSubmit}>
			<div>
				{#each ids as obj}
					<Pill
						val={obj.collectionId}
						text={obj.title}
						onClick={onPillClick}
						isIncluded={toggledCollectionIds.includes(obj.collectionId)}
					/>
				{/each}
			</div>
			<Button
				text={`Update collection${toggledCollectionIds.length > 1 ? 's' : ''}`}
				type="submit"
				{inProgress}
			/>
		</form>
	</main>
</Modal>

<style>
	main {
		width: 100%;
		margin: auto;
	}

	.preview {
		display: grid;
		grid-template-columns: 1fr 2fr;
		text-align: center;
		align-items: center;
		gap: 16px;
		text-align: left;
		padding: 8px;
	}

	img {
		border-radius: 3px;
	}
</style>
