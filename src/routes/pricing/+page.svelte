<script>
  import StripeProvider from '../../lib/StripeProvider.svelte';
  import Pricing from '../../components/Pricing/index.svelte';
</script>

<StripeProvider>
  <Pricing></Pricing>
</StripeProvider>
