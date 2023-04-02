import { v4 as uuidv4 } from 'uuid';
import { error, json } from '@sveltejs/kit';
import Urlbox from 'urlbox';
import { PUBLIC_URLBOX_PUBLISHABLE_KEY, PUBLIC_URLBOX_SECRET_KEY } from '$env/static/public';
import getTitleAtUrl from 'get-title-at-url';

import type { RequestHandler } from './$types';
import { supabaseClient } from '$lib/supabase';

export const POST: RequestHandler = async ({ locals, request }) => {

}