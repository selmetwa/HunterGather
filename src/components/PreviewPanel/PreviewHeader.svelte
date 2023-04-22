<script>
	import { goto } from '$app/navigation';
	import { previewPanel } from '../../store/store';

	export let url = '';
	export let id = '';
	export let type = '';

	const onClose = () => previewPanel.set(false);

	const sendToFullPage = () => {
		onClose();
		goto(`/${type}/${id}`);
	};

  console.log({ url, id, type })
</script>

<header class="py-4 px-10 flex justify-between border-b border-gray-200">
	<div class="flex gap-4">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<i
			on:click={sendToFullPage}
			class="fa-solid
  fa-up-right-and-down-left-from-center
  text-xl text-gray-400
  hover:text-gray-300
  hover:transition-all
  cursor-pointer"
		/>
		{#if url}
			<a href={url} target="_blank">
				<i
					class="fa-solid fa-up-right-from-square text-xl text-gray-400 hover:text-gray-300 hover:transition-all cursor-pointer"
				/>
			</a>
		{/if}
	</div>

	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<i
		class="fa-solid fa-xmark text-2xl text-gray-400 hover:text-gray-300 hover:transition-all cursor-pointer"
		id="close-modal-root"
		on:click={onClose}
	/>
</header>
