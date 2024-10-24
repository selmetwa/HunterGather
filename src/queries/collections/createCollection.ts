import { v4 as uuidv4 } from 'uuid';
import { error, json } from '@sveltejs/kit';

import { supabaseClient } from '$lib/supabase';

export const createCollection = async (
	title: string,
	description: string,
	collectionIds: string | any[],
	userId: string | undefined
) => {
	const collectionId = uuidv4();

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
