<script>
	// @ts-nocheck
	import { page } from '$app/stores';

	import { previewPanel } from '../../store/store';
	import Button from '../../components/ui/Button.svelte';
	import Input from '../../components/ui/Input.svelte';

	const error = $page?.form?.error;
</script>

<body>
	<section class="modal-wrapper">
		<main
			class={`${
				$previewPanel ? 'xl:w-6/12 sm:w-8/12' : '2xl:w-3/12 xl:w-4/12 lg:w-6/12 md:w-8/12 sm:w-8/12'
			} bg-white mb-20 p-8 m-auto rounded drop-shadow-md mt-20 overflow-hidden`}
		>
			<div class="w-full max-w-md space-y-4">
				<h2 class="font-sans text-left text-2xl font-light tracking-tight text-gray-400">
					Sign in to your account
				</h2>
				<div class="flex-grow border-t border-gray-200" />
			</div>
			{#if error}
				<p class="mt-4 space-y-6 text-rose-400">Error: {error}</p>
			{/if}
			<form action="?/login" method="POST" class="mt-4 space-y-6">
				<Input type="text" text="email" iconType="solid" icon="at" placeholder="email" />
				<Input
					type="password"
					text="password"
					iconType="solid"
					icon="lock"
					placeholder="password"
				/>
				<Button text="Login" type="submit" />
			</form>
			<div class="relative flex py-4 items-center">
				<a href="/register" class="m-auto font-light text-gray-400"
					>not a member? <span class="font-semibold text-action-400">Join</span></a
				>
			</div>
		</main>
	</section>
</body>
