import { supabaseClient } from '$lib/supabase';
import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';

import { LIMIT } from '../../../../constants/constants';
import getPaginatedCollectionsByUserId from '../../../../queries/user/getPaginatedCollectionsByUserId';

export const ssr = false;

export const load = async ({ fetch, params }: { fetch: any; params: any }) => {
	const userId = params?.userId;
	const collections = await getPaginatedCollectionsByUserId(userId, 0);

	return {
		collections,
		userId
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

		throw redirect(303, `/profile/collections/${userId}`);
	}
};
