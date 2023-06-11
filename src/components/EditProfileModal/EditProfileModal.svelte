<script lang="ts">
	import Modal from '../ui/Modal.svelte';
	import Input from '../ui/Input.svelte';
	import Button from '../ui/Button.svelte';

	export let name: string;
	export let twitter: string;
	export let github: string;
	export let personalSite: string;
	export let handleToggleModal: (e: Event) => void;
</script>

<Modal onClose={handleToggleModal}>
	<main class="w-full bg-white p-8 m-auto rounded mt-2">
		<div class="w-full max-w-md space-y-4 flex items-center justify-between">
			<div class="flex-col">
				<h2 class="font-sans text-left text-2xl font-light tracking-tight text-gray-400">
					Update Profile Info
				</h2>
			</div>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<i
				class="fa-solid fa-xmark text-2xl text-gray-400 hover:text-gray-300 hover:transition-all cursor-pointer"
				id="close-modal-root"
				on:click={handleToggleModal}
			/>
		</div>
		<div class="flex-grow border-t border-gray-200" />
		<form action="?/updateInfo" method="POST" class="mt-8 space-y-6">
			<Input type="text" text="name" iconType="solid" icon="user" value={name} placeholder="name" />
			<Input
				type="text"
				text="twitter"
				iconType="brands"
				icon="twitter"
				value={twitter}
				placeholder="twitter"
			/>
			<Input
				type="text"
				text="github"
				iconType="brands"
				icon="github"
				value={github}
				placeholder="github"
			/>
			<Input
				type="text"
				text="personal_site"
				iconType="solid"
				icon="window-maximize"
				value={personalSite}
				placeholder="you.com"
			/>
			<Button text="Submit" type="submit" />
		</form>
	</main>
</Modal>
