import { supabaseClient } from '$lib/supabase';
import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';

import { myBlocks } from '../../../store/store';
import getCollectionsByUserId from '../../../queries/user/getCollectionsByUserId';
import getBlocksByUserId from '../../../queries/user/getBlocksByUserId';

export const load = async ({ fetch, params }: { fetch: any; params: any }) => {
	const userId = params?.userId;
	const { data, error } = await supabaseClient.from('users').select().eq('id', userId);
  const blocks = await getBlocksByUserId(userId, 0, 15);
  const collections = await getCollectionsByUserId(userId, 0, 2)

	myBlocks.set(blocks);

	return {
		data,
		collections,
		blocks,
		error
	};
};

export const actions: Actions = {
	updateInfo: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());
		const userId = locals?.session?.user?.id;

		const { data, error } = await supabaseClient
			.from('users')
			.update({
				name: body.name,
				twitter: body.twitter,
				github: body.github,
				personal_site: body['personal site']
			})
			.eq('id', userId);

		throw redirect(303, `/profile/${userId}`);
	}
};
