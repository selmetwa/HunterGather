<script lang="ts">
	import { loadStripe } from '@stripe/stripe-js';
	import type { Stripe } from '@stripe/stripe-js';
  import { PUBLIC_STRIPE_PUBLISHABLE_KEY } from '$env/static/public';
	import { onMount, setContext } from 'svelte';

	if (typeof PUBLIC_STRIPE_PUBLISHABLE_KEY !== 'string') {
		throw new Error('PUBLIC_STRIPE_PUBLISHABLE_KEY must be added to .env');
	}

	let stripe: any

	setContext('stripe', {
		getStripe: () => stripe
	});

	onMount(async () => {
		stripe = await loadStripe(PUBLIC_STRIPE_PUBLISHABLE_KEY);
	});
</script>

{#if stripe}
	<slot />
{/if}