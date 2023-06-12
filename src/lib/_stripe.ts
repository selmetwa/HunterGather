import Stripe from 'stripe';
import { PUBLIC_STRIPE_SECRET_KEY_TEST } from '$env/static/public';

const stripe = new Stripe(PUBLIC_STRIPE_SECRET_KEY_TEST, {
	apiVersion: '2020-08-27'
});

export default stripe;