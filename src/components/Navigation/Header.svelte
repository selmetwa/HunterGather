<script>
	import { page } from '$app/stores';
	import { modalStore, previewPanel, paywallModal, hasReachedLimit } from '../../store/store';

	const activeSession = $page?.data?.session;
	let userId = $page?.data?.session?.user?.id;
	let previewPanelIsOpen = false;

	previewPanel.subscribe((v) => (previewPanelIsOpen = v));
	const toggleModal = () => {
		if ($hasReachedLimit) {
			paywallModal.set(true);
			return;
		}

		modalStore.update(() => true);
	};
</script>

<nav class="py-4 bg-gray-100 border-b-4 border-gray-200 md:border-0 w-full">
	<div class="flex flex-col md:flex-row items-center md:justify-between px-8 md:px-16 xl:px-24">
		<a href="/" class="flex items-center mt-4 md:mt-0">
			<span class="text-gray-500 self-center text-xl font-semibold whitespace-nowrap"
				>HunterGather
			</span>
		</a>
		<div id="navbar-default">
			<ul
				class="flex flex-row-reverse gap-4 lg:gap-0 md:flex-row mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0"
			>
				{#if activeSession}
					<li class="font-medium">
						<button
							on:click={toggleModal}
							class="font-medium font-sans group relative flex w-full justify-center rounded-sm underline md:no-underline my-2 md:my-0 md:py-2 md:px-4 font-medium text-action-600 md:border md:border-gray-500 md:text-gray-800 ease-in-out duration-300 cursor-pointer md:bg-action-400 md:hover:bg-action-500"
						>
							Contribute
						</button>
					</li>
					<li class="block py-2 text-gray-500 rounded md:border-0 underline">
						<form action="/logout" method="POST">
							<button type="submit" class="font-medium font-sans underline">Logout</button>
						</form>
					</li>
					<li>
						<a
							href="/about"
							class="block py-2 text-gray-500 rounded md:border-0 underline font-sans">About</a
						>
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
						<a
							href="/about"
							class="block py-2 text-gray-500 rounded md:border-0 underline font-sans">About</a
						>
					</li>
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
