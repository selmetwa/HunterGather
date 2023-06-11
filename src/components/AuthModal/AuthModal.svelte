<script>
	import { authModal } from '../../store/store';
	import Modal from '../ui/Modal.svelte';

	const onClose = () => {
		authModal.set(false);
	};
</script>

<Modal {onClose}>
	<main
		class="2xl:w-3/12 xl:w-4/12 lg:w-6/12 md:w-8/12 sm:w-8/12 bg-white p-8 m-auto rounded mt-20 height-auto"
	>
		<div class="w-full max-w-md space-y-4 flex items-center justify-between">
			<div class="flex-col">
				<h2 class="font-sans text-left text-2xl font-light tracking-tight text-gray-400">
					Join HunterGather
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
		<p class="text-gray-400 mt-4 text-xl font-light">
			You must have a registered account to complete this action
		</p>

		<a href="/register">
			<button
				class="font-medium font-sans group relative flex rounded-md border border-transparent bg-action-400 hover:bg-action-500 py-2 px-4 text-lg font-medium text-white focus:outline-none focus:ring-2 focus:gray-300 focus:ring-offset-2 drop-shadow-sm ease-in-out duration-300 whitespace-nowrap mx-auto my-4"
			>
				Register Now
			</button>
		</a>
		<div class="relative flex py-4 items-center">
			<a href="/login" class="m-auto font-light text-gray-400 text-xl"
				>already have an account? <span class="font-medium text-action-400">Login</span></a
			>
		</div>
	</main>
</Modal>

<style>
	main {
		width: 100%;
		margin: auto;
	}
</style>
