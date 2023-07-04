<script lang="ts">
	import { goto } from '$app/navigation';
	import { getContext } from 'svelte';
	import { product } from '../../constants/plans';
	import { previewPanel } from '../../store/store';
	import { page } from '$app/stores';
  import { PUBLIC_PRICE_ID } from '$env/static/public';

	const { getStripe } = getContext('stripe') as any;
	const activeSession = $page?.data?.session;

	const stripe = getStripe();

	async function choosePlan() {
		if (product.id) {
			const url = `${window.location.origin}/stripe/checkout-session`;
			const res = await fetch(`${window.location.origin}/api/checkout-session`, {
				method: 'POST',
				headers: { accept: 'application/json' },
				body: JSON.stringify({ priceId: PUBLIC_PRICE_ID })
			});

			const { sessionId } = await res.json();
			stripe.redirectToCheckout({
				sessionId
			});
		} else {
			goto('/');
		}
	}
</script>

<section class="modal-wrapper">
	<main
		class={`${
			$previewPanel ? 'xl:w-6/12 sm:w-8/12' : '2xl:w-3/12 xl:w-4/12 lg:w-6/12 md:w-8/12 sm:w-8/12'
		} bg-white mb-20 p-8 m-auto rounded drop-shadow-md mt-20 overflow-hidden`}
	>
		<div class="w-full max-w-md space-y-4">
			<h2 class="font-sans text-left text-2xl font-light tracking-tight text-gray-400">
				HunterGather Premium
			</h2>

			<div class="flex-grow border-t border-gray-200" />
			<div class="text-blue-400 font-semibold text-xl">$4.00 a Month</div>
			<p class="text-gray-400 font-light text-lg">
				Subscribe for the ability to contribute unlimited blocks & collections
			</p>

			{#if activeSession}
				<button
					on:click={() => choosePlan()}
					class="font-bold font-sans group relative flex w-full justify-center rounded-md border border-transparent bg-action-400 hover:bg-action-500 py-2 px-4 text-lg font-medium text-white focus:outline-none focus:ring-2 focus:gray-300 focus:ring-offset-2 drop-shadow-sm ease-in-out duration-300"
				>
					Subscribe
				</button>
				<p class="text-gray-400 font-light text-lg">
					Or if you want to continue contributing to the site but don't want to pay $4/mo just email me at <span
						class="text-blue-400">selmetwa@gmail.com</span
					>
				</p>
			{:else}
				<p class="text-gray-400 font-light text-lg">
					You need an account to subscribe <a href="login" class="text-blue-400">Login</a> or <a href="register" class="text-blue-400">Register</a>
				</p>
			{/if}
		</div>
	</main>
</section>
