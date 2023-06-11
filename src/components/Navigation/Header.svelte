<script>
	import { page } from '$app/stores';
	import { modalStore, previewPanel } from '../../store/store';

	const activeSession = $page?.data?.session;
	let userId = $page?.data?.session?.user?.id;
	let previewPanelIsOpen = false;

	previewPanel.subscribe((v) => (previewPanelIsOpen = v));
	const toggleModal = () => {
		modalStore.update(() => true);
	};
</script>

<nav
	class={`py-4 bg-gray-100 ${
		previewPanelIsOpen ? 'w-6/12' : 'w-full'
	} border-b-4 border-gray-200 md:border-0`}
>
	<div
		class="flex flex-col md:flex-row md:flex-wrap items-center md:justify-between px-8 md:px-16 xl:px-24"
	>
		<a href="/" class="flex items-center mt-4 md:mt-0">
			<span class="text-gray-500 self-center text-xl font-semibold whitespace-nowrap">HunterGather
        </span
			>
		</a>
		<div class={`md:block md:w-auto`} id="navbar-default">
			<ul
				class="flex flex-row-reverse md:flex-row mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 gap-x-3"
			>
				{#if activeSession}
					<li class="font-medium">
						<button
							on:click={toggleModal}
							class="font-medium font-sans group relative flex w-full justify-center rounded-md underline md:no-underline my-2 md:my-0 md:py-2 md:px-4 font-medium text-action-400 md:text-white ease-in-out duration-300 cursor-pointer md:bg-action-400 md:hover:bg-action-500"
						>
							Contribute
						</button>
					</li>
					<li class="block py-2 text-gray-500 rounded md:border-0 underline">
						<form action="/logout" method="POST">
							<button type="submit" class="font-medium font-sans underline"
								>Logout</button
							>
						</form>
					</li>
					<li>
						<a
							href={`/profile/blocks/${userId}`}
							class="block py-2 font-medium text-gray-500 rounded md:border-0 underline"
						>
							Profile
						</a>
					</li>
				{:else}
					<li>
						<a href="/login" class="block py-2 text-gray-500 rounded md:border-0 underline">Login</a
						>
					</li>
					<li>
						<a href="/register" class="block py-2 text-gray-500 rounded md:border-0 underline"
							>Register</a
						>
					</li>
				{/if}
			</ul>
		</div>
	</div>
</nav>
