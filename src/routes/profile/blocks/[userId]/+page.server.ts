import { redirect } from '@sveltejs/kit';
import { supabaseClient } from '$lib/supabase';

import { LIMIT } from '../../../../constants/constants';
import type { Block } from '../../../../types/block';
import getBlocksByUserId from '../../../../queries/user/getBlocksByUserId';
import type { Actions } from './$types';

export const ssr = false;

export const load = async ({ fetch, params }: { fetch: any; params: any }) => {
	const userId = params?.userId;
	const blocks = (await getBlocksByUserId(userId, 0)) as Block[];

	return {
		blocks,
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

		throw redirect(303, `/profile/blocks/${userId}`);
	}
};
