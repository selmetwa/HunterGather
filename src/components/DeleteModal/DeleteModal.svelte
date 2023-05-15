<script lang="ts">
	import { isDeleteModalOpen, deleteModalObject } from '../../store/store';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { supabaseClient } from '$lib/supabase';
	import ErrorMessage from '../ErrorMessage.svelte';
	import SuccessMessage from '../SuccessMessage.svelte';
	import Modal from '../Modal.svelte';
	import LoadingSpinner from '../LoadingSpinner.svelte';

	let inProgress = false;
	let successMessage = '';
	let errorMessage = '';

	$: type = '';
	$: object = {};
	$: id = '';
	$: url = '';

	onMount(() => {
		deleteModalObject.subscribe((value) => {
			console.log({ value });
			type = value.type;
			object = value.object;
			url = value.type === 'block' ? value.object.url : '';
			id = value.type === 'block' ? value.object.blockId : value.object.id;
		});
	});

	const onClose = (e: any) => {
		if (e.target.id === 'close-modal-root') {
			console.log('close');
			isDeleteModalOpen.set(false);
			deleteModalObject.set({ type: '', object: {} });
		}
	};

	const handleResponse = (error: any) => {
		// handle error
		if (error) {
			setTimeout(() => {
				inProgress = false;
				errorMessage = 'Something went wrong deleting ' + type;
				url = '';
			}, 1000);

			return;
		}

		errorMessage = '';
		setTimeout(() => {
			inProgress = false;
			successMessage = `Object has been deleted successfully, you will be redirected to the homepage now.`;
			url = '';

			setTimeout(() => {
				successMessage = '';
				isDeleteModalOpen.set(false);
				deleteModalObject.set({ type: '', object: {} });
				goto('/');
			}, 3000);
		}, 1000);
	};

	const deleteObject = async () => {
		inProgress = true;
		successMessage = '';
		errorMessage = '';

		let table = type === 'block' ? 'blocks' : 'collections';
		let column = type === 'block' ? 'blockId' : 'collectionId';
		const { data, error } = await supabaseClient.from(table).delete().eq(column, id).select();
		console.log({ data, error });

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
					Delete {type}
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
		<p class="text-sans text-gray-400 font-light mt-4">
			Are you sure you want to delete this {type}? This is a destructive action and cannot be
			undone.
		</p>
		<button
			on:click={deleteObject}
			class="font-bold font-sans group relative flex w-full justify-center rounded-md border border-transparent bg-action py-2 px-4 text-lg font-medium text-white bg-red-400 hover:bg-red-500 focus:outline-none focus:ring-2 focus:gray-300 focus:ring-offset-2 drop-shadow-sm ease-in-out duration-300 mt-6"
		>
			{#if inProgress}
				<LoadingSpinner />
			{:else}
				Delete
			{/if}
		</button>
	</main>
</Modal>

<style>
	main {
		width: 100%;
		margin: auto;
	}
</style>
