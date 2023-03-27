import { supabaseClient } from '$lib/supabase';
import { page } from '$app/stores';
import type { Actions } from './$types';
import { AuthApiError } from '@supabase/gotrue-js';
import { fail, redirect } from '@sveltejs/kit';
import { myBlocks } from '../../../store/store';

export const load = async ({ fetch, params }: { fetch: any; params: any }) => {
	const collectionId = params?.collectionId;
	console.log({ collectionId });
	const { data: blocks } = await supabaseClient.from('blocks').select().contains("collectionIds", [`${collectionId}`]);
  console.log({ blocks });

	return {
		collectionId,
    blocks
	};
};
