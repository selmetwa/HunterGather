<script lang="ts">
	import { PUBLIC_API_URL } from '$env/static/public';

	import Input from '../Input.svelte';
	import Button from '../Button.svelte';
	import ErrorMessage from '../ErrorMessage.svelte';
	import SuccessMessage from '../SuccessMessage.svelte';

	export let onClose: any;
	let error = false;
	let inProgress = false;
	let successMessage = '';
	let title = '';
	let description = '';

	const updateTitle = (e: any) => {
		title = e.target.value;
		return true;
	};

	const updateDescription = (e: any) => {
		description = e.target.value;
		return true;
	};

	const handleResponse = (res: any) => {
		const { status } = res;

		// handle error
		if (status === 500) {
			setTimeout(() => {
				inProgress = false;
        error = true;
				title = '';
				description = '';
			}, 1000);
      
      return
		}

		error = false;
		setTimeout(() => {
			inProgress = false;
			successMessage = `Collection ${title} has been created successfully.`;
			title = '';
			description = '';

      /**
       * close modal and redirect user somewhere
      */
			setTimeout(() => {
				successMessage = '';
			}, 2000);
		}, 1000);
	};

	const onClick = async () => {
		inProgress = true;

		const res = await fetch(`${PUBLIC_API_URL}/api/collections`, {
			method: 'POST',
			headers: { accept: 'application/json' },
			body: JSON.stringify({
				title,
				description
			})
		});

		handleResponse(res);
	};
</script>

<main class="2xl:w-3/12 xl:w-4/12 lg:w-6/12 md:w-8/12 sm:w-8/12 bg-white p-8 m-auto rounded mt-20">
	{#if error}
		<ErrorMessage />
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
		<i
			class="fa-solid fa-xmark text-2xl text-gray-400 hover:text-gray-300 hover:transition-all cursor-pointer"
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
			placeholder="Cool Portfolio Sites"
			isRequired={true}
		/>
		<Input
			type="text"
			text="Description"
			value={description}
			onChange={updateDescription}
			placeholder="Collection of cool portfolios"
		/>
		<Button text="Create Collection" type="submit" {inProgress} />
	</form>
</main>

<style>
	main {
		width: 100%;
		margin: auto;
	}
</style>
