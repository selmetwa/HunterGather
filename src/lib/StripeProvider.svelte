<script lang="ts">
	import { loadStripe } from '@stripe/stripe-js';
	import type { Stripe } from '@stripe/stripe-js';
  import { PUBLIC_STRIPE_PUBLISHABLE_KEY_TEST } from '$env/static/public';
	import { onMount, setContext } from 'svelte';

	if (typeof PUBLIC_STRIPE_PUBLISHABLE_KEY_TEST !== 'string') {
		throw new Error('PUBLIC_STRIPE_PUBLISHABLE_KEY_TEST must be added to .env');
	}

	let stripe: any

  $: if (stripe) {
    console.log({ stripe })
  }

	setContext('stripe', {
		getStripe: () => stripe
	});

	onMount(async () => {
		console.log('StripeProvider onload');
		stripe = await loadStripe(PUBLIC_STRIPE_PUBLISHABLE_KEY_TEST);

    console.log({ stripe })
	});
</script>

{#if stripe}
	<slot />
{/if}