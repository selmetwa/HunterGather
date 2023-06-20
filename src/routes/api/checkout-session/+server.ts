import type { RequestEvent, RequestHandler } from '@sveltejs/kit';
import { error, json } from '@sveltejs/kit';
import stripe from '../../../lib/_stripe';
import { PUBLIC_PRICE_ID } from '$env/static/public';

export const POST: RequestHandler = async (event: RequestEvent) => {
	const req = event.request;
  console.log({ req })
	const formData = await req.json();
	const priceId = PUBLIC_PRICE_ID;

	// if (typeof priceId !== 'string') {
	// 	return {
	// 		status: 400,
	// 		headers: {},
	// 		body: JSON.stringify({
	// 			error: {
	// 				message: 'priceId is required'
	// 			}
	// 		})
	// 	};
	// }

	try {
    const url = event.url.host
    console.log({ url })
		const session = await stripe.checkout.sessions.create({
			mode: 'subscription',
			payment_method_types: ['card'],
			line_items: [
				{
					price: priceId,
					quantity: 1
				}
			],
			success_url: `http://${event.url.host}/success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `http://${event.url.host}/pricing`
		});

    console.log({ session })
	  return json(
      {
        status: 200,
        headers: {},
        sessionId: session.id
      }
    );

		return {
			status: 200,
			headers: {},
			body: JSON.stringify({
				sessionId: session.id
			})
		};
	} catch (err) {
    console.log({ err })
		return {
			status: 500,
			headers: {},
			body: JSON.stringify({
				error: err
			})
		};
	}
}