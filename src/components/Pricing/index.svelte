<script lang="ts">
	import { goto } from '$app/navigation';
	import { getContext } from 'svelte';
	import { product } from '../../constants/plans';

	const { getStripe } = getContext('stripe') as any;

	const stripe = getStripe();

	async function choosePlan() {
		if (product.id) {
			console.log(JSON.stringify({ priceId: "price_1NDCMJEgb1PPyyWRPBFWSEsE" }));

      const url = `${window.location.origin}/stripe/checkout-session`
      console.log({ url })
			const res = await fetch(`${window.location.origin}/api/checkout-session`, {
				method: 'POST',
        headers: { accept: 'application/json' },
				body: JSON.stringify({ priceId: "price_1NDCMJEgb1PPyyWRPBFWSEsE" })
			});

			const { sessionId } = await res.json();
			stripe.redirectToCheckout({
				sessionId
			});
		} else {
			console.log('error');
			goto('/');
		}
	}
</script>

<!-- <svelte:head>
  <script src="https://js.stripe.com/v3/"></script>
</svelte:head> -->
<!-- <StripeProvider> -->
<section class="plans">
	<div class="plan">
		<div class="top">
			<div class="about">
				<h2 class="title">HunterGather</h2>
				<div class="description">stuff</div>
			</div>
			<div class="price">
				<span class="dollars">$4.00</span>
			</div>
			<button on:click={() => choosePlan()}>Choose</button>
			<!-- <button>Choose</button> -->
		</div>
		<div class="divider" />
		<div class="bottom">unlimited stuff</div>
	</div>
</section>

<!-- </StripeProvider> -->

<style>
	.plans {
		display: flex;
		flex-direction: column;
		color: rgb(23, 31, 31);
	}

	.plan {
		border: 1px solid black;
		border-radius: 0.5rem;
		margin: 1rem;
		width: 16rem;
		background: rgba(255, 255, 255, 0.2);
	}

	.plan .top {
		padding: 1rem 1.5rem;
	}

	.plan .bottom {
		padding: 1rem 1.5rem;
	}

	.about {
		height: 110px;
	}

	.title {
		font-size: 1.25rem;
	}

	.description {
		color: rgb(71, 97, 97);
		margin-bottom: 0.5rem;
	}

	.price {
		margin-bottom: 0.75rem;
	}

	.dollars {
		font-size: 1.5rem;
	}

	button {
		cursor: pointer;
		background: rgb(23, 31, 31);
		color: white;
		font-weight: bold;
		padding: 0.5rem 0.75rem;
		border-radius: 0.5rem;
		border: none;
		width: 100%;
		transition: background 0.2s ease-in-out;
	}

	button:hover {
		background: var(--accent-color);
	}

	button:focus {
		outline: 2px solid var(--accent-color);
		outline-offset: 2px;
	}

	.divider {
		border-top: 1px solid var(--text-color);
	}

	ul {
		color: rgb(71, 97, 97);
		padding-left: 1rem;
	}

	li {
		margin-bottom: 0.5rem;
	}

	@media (min-width: 640px) {
		.plans {
			flex-direction: row;
		}
	}
</style>
