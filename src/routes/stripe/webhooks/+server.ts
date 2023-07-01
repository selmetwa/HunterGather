import Stripe from 'stripe'
import { error, json } from '@sveltejs/kit'
import { env } from '$env/dynamic/private'
import { PUBLIC_STRIPE_SECRET_KEY } from '$env/static/public';

import stripe from '../../../lib/_stripe'
// init api client
// const stripe = new Stripe(PUBLIC_STRIPE_SECRET_KEY, {})

// endpoint to handle incoming webhooks
export async function POST({ request, params }) {
  // extract body
  const body = await request.text()
  // get the signature from the header
  const signature = request.headers.get('stripe-signature')

  // var to hold event data
  let event

  // verify it
  try {
    event = stripe.webhooks.constructEvent(body, signature, 'whsec_70115fc2ad3551b26318f8fd01d09bc161cd7a7ef5357c9c581a534a9f277083')
  } catch (err) {
    // signature is invalid!
    console.warn('⚠️  Webhook signature verification failed.', err.message)

    // return, because it's a bad request
    throw error(400, 'Invalid request')
  }

  // signature has been verified, so we can process events
  // full list of events: https://stripe.com/docs/api/events/list
  if (event.type == 'checkout.session.completed') {
    // get data object
    const charge = event.data.object
    // TODO: fulfill the order here
  }

  // return a 200 with an empty JSON response
  return json()
}