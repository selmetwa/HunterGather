import type { RequestEvent, RequestHandler } from '@sveltejs/kit';
import stripe from '../../lib/_stripe';
import { PUBLIC_PRODUCT_ID } from '$env/static/public';

export const POST: RequestHandler = async (event: RequestEvent) => {
	const req = event.request;

	const formData = await req.json();
	const productId = PUBLIC_PRODUCT_ID;

	if (typeof productId !== 'string') {
		return {
			status: 400,
			headers: {},
			body: JSON.stringify({
				error: {
					message: 'productId is required'
				}
			})
		};
	}

	try {
		const session = await stripe.checkout.sessions.create({
			mode: 'subscription',
			payment_method_types: ['card'],
			line_items: [
				{
					price: productId,
					quantity: 1
				}
			],
			success_url: `http://${event.url.host}/success?sessionId={CHECKOUT_SESSION_ID}`,
			cancel_url: `http://${event.url.host}/pricing`
		});
		return {
			status: 200,
			headers: {},
			body: JSON.stringify({
				sessionId: session.id
			})
		};
	} catch (err) {
		return {
			status: 500,
			headers: {},
			body: JSON.stringify({
				error: err
			})
		};
	}
}