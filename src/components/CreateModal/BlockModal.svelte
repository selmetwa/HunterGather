<script lang="ts">
	import { PUBLIC_API_URL } from '$env/static/public';

	import { collectionIds } from '../../store/store';
	import Input from '../Input.svelte';
	import Button from '../Button.svelte';
	import Pill from '../Pill.svelte';
	import ErrorMessage from '../ErrorMessage.svelte';
	import SuccessMessage from '../SuccessMessage.svelte';

	export let onClose: any;
	let inProgress = false;
	let successMessage = '';
	let errorMessage = '';
	let url = '';
	let toggledCollectionIds: string | any[] = [];
	let ids: any[] = [];

	collectionIds.subscribe((value) => {
    console.log({ value })
		ids = value;
	});

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
			setTimeout(() => {
				successMessage = '';
			}, 2000);
		}, 1000);
	};

	const onSubmit = async () => {
		inProgress = true;

		const res = await fetch(`${PUBLIC_API_URL}/api/blocks`, {
			method: 'POST',
			headers: { accept: 'application/json' },
			body: JSON.stringify({
				url,
				collectionIds: toggledCollectionIds
			})
		});

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
<main class="2xl:w-3/12 xl:w-4/12 lg:w-6/12 md:w-8/12 sm:w-8/12 bg-white p-8 m-auto rounded mt-20 height-auto">
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
		<Input type="text" text="URL" value={url} onChange={updateUrl} placeholder="url" />
    {#if !!ids.length}
      <div>
        <p class="text-gray-400">Add to collection(s)</p>
        {#each ids as obj}
          <Pill
            val={obj.collectionId}
            text={obj.title}
            onClick={onPillClick}
            isIncluded={toggledCollectionIds.includes(obj.collectionId)}
          />
        {/each}
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
