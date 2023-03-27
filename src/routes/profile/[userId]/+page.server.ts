import { supabaseClient } from '$lib/supabase';
import { page } from '$app/stores';
import type { Actions } from './$types';
import { AuthApiError } from '@supabase/gotrue-js';
import { fail, redirect } from '@sveltejs/kit';
import { myBlocks } from '../../../store/store';

export const load = async ({ fetch, params }: { fetch: any; params: any }) => {
	const userId = params?.userId;
	const { data, error } = await supabaseClient.from('users').select().eq('id', userId);

	const { data: blocks } = await supabaseClient.from('blocks').select().eq('userId', userId);

	const { data: collections } = await supabaseClient
		.from('collections')
		.select()
		.eq('userId', userId);

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
