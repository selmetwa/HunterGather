import { v4 as uuidv4 } from 'uuid';
import { error, json } from '@sveltejs/kit';
import Urlbox from 'urlbox';
import { PUBLIC_URLBOX_PUBLISHABLE_KEY, PUBLIC_URLBOX_SECRET_KEY } from '$env/static/public';
import getTitleAtUrl from 'get-title-at-url';
import { extract } from '@extractus/article-extractor'

// import type { RequestHandler } from './$types';
import { supabaseClient } from '$lib/supabase';

// Plugin your API key and secret
const urlbox = Urlbox(PUBLIC_URLBOX_PUBLISHABLE_KEY, PUBLIC_URLBOX_SECRET_KEY);

// create block
export const createBlock = async (
	title: string,
	url: string,
	collectionIds: string | any[],
	userId: string | undefined
) => {
	const blockId = uuidv4();

	let realTitle = '';
	// handle potential invalid url

	try {
		if (!title || title.length === 0) {
			const { title: responseTitle } = await getTitleAtUrl(url);
			realTitle = responseTitle;
		}
	} catch (e) {
		error(500, {
        			message: 'Invalid Url'
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
		title: realTitle || title,
		objectType: 'block',
		collectionIds: collectionIds
	};

	const { data: responseData, error: responseError } = await supabaseClient
		.from('blocks')
		.insert(insert)
		.select();

	if (responseError) {
		error(500, {
        			message: 'Something went wrong.'
        		});
	}

	return json(responseData);
};
