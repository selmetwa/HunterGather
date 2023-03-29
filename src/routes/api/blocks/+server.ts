import { v4 as uuidv4 } from 'uuid';
import { error, json } from '@sveltejs/kit';
import Urlbox from 'urlbox';
import { PUBLIC_URLBOX_PUBLISHABLE_KEY, PUBLIC_URLBOX_SECRET_KEY } from '$env/static/public';
import getTitleAtUrl from 'get-title-at-url';

import type { RequestHandler } from './$types';
import { supabaseClient } from '$lib/supabase';

// Plugin your API key and secret
const urlbox = Urlbox(PUBLIC_URLBOX_PUBLISHABLE_KEY, PUBLIC_URLBOX_SECRET_KEY);

// create block
export const POST: RequestHandler = async ({ locals, request }) => {
	const data = await request.json();
	const userId = locals?.session?.user?.id;
	const blockId = uuidv4();

	const { url, collectionIds } = data;

  let title = '';

  // handle potential invalid url
  try {
	  const { title: responseTitle } = await getTitleAtUrl(url);
    title = responseTitle;
  } catch (e) {
    throw error(500, {
      message: "Invalid Url"
    });
  }

	// Set your options
	const options = {
		url: url,
		format: 'png',
		quality: 100
	};

	const imgUrl = urlbox.buildUrl(options);

	const insert = {
		blockId: blockId,
		userId: userId,
		src: imgUrl,
		url: url,
		title: title,
    objectType: 'block',
		collectionIds: collectionIds
	};

	const { data: responseData, error: responseError } = await supabaseClient.from('blocks').insert(insert).select();

	if (responseError) {
    throw error(500, {
      message: "Something went wrong."
    });
	}

	return json(responseData);
};
