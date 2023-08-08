<script lang="ts">
	import { page } from '$app/stores';

	import { previewPanel } from '../../store/store';
	import Button from '../../components/ui/Button.svelte';
	import Input from '../../components/ui/Input.svelte';

	const error = $page?.form?.error;
</script>

<div>
	<main
		class={`${
			$previewPanel
				? 'xl:w-10/12 sm:w-10/12'
				: '2xl:w-5/12 xl:w-7/12 lg:w-10/12 md:w-10/12 sm:w-10/12'
		} bg-gray-100 lg:mb-20 m-auto rounded-sm border-2 border-gray-200 mt-0 lg:mt-20 overflow-hidden flex flex-col-reverse lg:flex-row gap-6`}
	>
		<div class="bg-gray-200 w-full lg:w-1/2 flex flex-col gap-4 p-8">
			<div class="my-auto flex flex-col gap-8">
				<div>
					<h3 class="font-sans text-left text-xl font-light tracking-tight text-gray-500">
						Social
					</h3>
					<p class="tracking-tight font-light text-left text-gray-400 text-md">
						See what other people are saving on the web.
					</p>
				</div>
				<div>
					<h3 class="font-sans text-left text-xl font-light tracking-tight text-gray-500">
						Visual
					</h3>
					<p class="tracking-tight font-light text-left text-gray-400 text-md">
						Screenshots of each page help jog your memory and quickly identify the page you're
						looking for.
					</p>
				</div>
				<div>
					<h3 class="font-sans text-left text-xl font-light tracking-tight text-gray-500">
						Chrome Extension
					</h3>
					<p class="tracking-tight font-light text-left text-gray-400 text-md">
						Gather websites quickly with the <a
							href="https://chrome.google.com/webstore/detail/huntergather/lengfeddnpliaoaglooakhimjkefeiej"
							target="_blank"
							rel="noreferrer"
							class="text-blue-400 underline">Chrome Extension</a
						>
					</p>
				</div>
				<div>
					<h3 class="font-sans text-left text-xl font-light tracking-tight text-gray-500">
						Collections
					</h3>
					<p class="tracking-tight font-light text-left text-gray-400 text-md">
						Group and organise websites with collections, and nested collections!
					</p>
				</div>
			</div>
      </div>
			<div class="w-full lg:w-1/2 p-8">
				<div class="w-full max-w-md space-y-4">
					<h2 class="font-sans text-left text-2xl font-light tracking-tight text-gray-400">
						Register new account
					</h2>
					<div class="flex-grow border-t border-gray-200" />
				</div>
				{#if error}
					<p class="mt-4 space-y-6 text-rose-400">Error: {error}</p>
				{/if}
				<form action="?/register" method="POST" class="mt-8 space-y-6">
					<Input type="text" text="name" iconType="solid" icon="user" placeholder="name" />
					<Input type="text" text="email" iconType="solid" icon="at" placeholder="email" />
					<Input
						type="password"
						text="password"
						iconType="solid"
						icon="lock"
						placeholder="**********"
					/>
					<Button text="Register" type="submit" />
				</form>
				<div class="relative flex py-4 items-center">
					<a href="/login" class="m-auto font-light text-gray-400"
						>already have an account? <span class="font-semibold text-blue-400">Login</span></a
					>
				</div>
			</div>
	</main>
</div>
