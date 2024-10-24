import { v4 as uuidv4 } from 'uuid';
import { error, json } from '@sveltejs/kit';

import type { RequestHandler } from './$types';
import { supabaseClient } from '$lib/supabase';

// get all collections by userId
export const GET: RequestHandler = async ({ locals }) => {
	const userId = locals?.session?.user?.id;

	const { data, error } = await supabaseClient.from('collections').select().eq('userId', userId);

	return json(data);
};

// createCollection
export const POST: RequestHandler = async ({ locals, request }) => {
	const data = await request.json();
	const userId = locals?.session?.user?.id;
	const collectionId = uuidv4();

	const { collectionIds, title, description } = data;

	// check if user has a collection with existing name
	const { data: existingCollection, error: existingCollectionError } = await supabaseClient
		.from('collections')
		.select()
		.eq('title', title)
		.eq('userId', userId);

	if (existingCollection && !!existingCollection.length) {
		error(500, {
        			message: 'You already have a collection with that name.'
        		});
	}

	const { data: responseData, error: responseError } = await supabaseClient
		.from('collections')
		.insert({
			collectionId: collectionId,
			title: title,
			description: description,
			userId: userId,
			collectionIds: collectionIds,
			objectType: 'collection'
		})
		.select();

	if (responseError) {
		error(500, {
        			message: 'Something went wrong creating collection.'
        		});
	}

	return json(responseData);
};
