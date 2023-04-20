<script lang="ts">
	import { blockPreviewPanel } from '../../store/store';
	import { goto } from '$app/navigation';

	export let blockId: String;
	export let src: String;
	export let url: string;

	console.log({ blockId });
	const onClose = () => {
		blockPreviewPanel.set(false);
	};

	const sendToFullPage = () => {
		onClose();
		goto(`/block/${blockId}`);
	};
</script>

<header class="py-4 px-10 flex justify-between border-b border-gray-200">
	<div class="flex gap-4">
		<i
			on:click={sendToFullPage}
			class="fa-solid
    fa-up-right-and-down-left-from-center
    text-xl text-gray-400
    hover:text-gray-300
    hover:transition-all
    cursor-pointer"
		/>
		<a href={url} target="_blank">
			<i
				class="fa-solid fa-up-right-from-square text-xl text-gray-400 hover:text-gray-300 hover:transition-all cursor-pointer"
			/>
		</a>
	</div>

	<i
		class="fa-solid fa-xmark text-2xl text-gray-400 hover:text-gray-300 hover:transition-all cursor-pointer"
		id="close-modal-root"
		on:click={onClose}
	/>
</header>
