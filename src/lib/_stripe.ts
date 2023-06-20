import Stripe from 'stripe';
import { PUBLIC_STRIPE_SECRET_KEY } from '$env/static/public';

const stripe = new Stripe(PUBLIC_STRIPE_SECRET_KEY, {
	apiVersion: '2020-08-27'
});

export default stripe;