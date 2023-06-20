<script>
	import { paywallModal } from '../../store/store';
	import Modal from '../ui/Modal.svelte';
	import StripeProvider from '../../lib/StripeProvider.svelte';
  import Pay from './Pay.svelte';

	const onClose = () => {
		paywallModal.set(false);
	};
</script>

<Modal {onClose}>
	<main
		class="2xl:w-3/12 xl:w-4/12 lg:w-6/12 md:w-8/12 sm:w-8/12 bg-white p-8 m-auto rounded mt-20 height-auto"
	>
		<StripeProvider>
      <Pay />
		</StripeProvider>
	</main>
</Modal>

<style>
	main {
		width: 100%;
		margin: auto;
	}
</style>
