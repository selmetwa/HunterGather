import { supabaseClient } from '$lib/supabase';
import { page } from '$app/stores';
import type { Actions } from './$types';
import { AuthApiError } from "@supabase/gotrue-js";
import { fail, redirect } from "@sveltejs/kit";

interface Params {
  userId: string
}

export const load = async ({ fetch, params }) => {

  const userId = params?.userId;

  const { data, error } = await supabaseClient
    .from('users')
    .select()
    .eq('id', userId)

  return {
    data,
    error
  }
}

export const actions: Actions = {
  updateInfo: async ({ request, locals }) => {
    const body = Object.fromEntries(await request.formData())
    const userId = locals?.session?.user?.id;

    console.log({ body, userId });

    const { data, error } = await supabaseClient
      .from('users')
      .update({ 
        name: body.name,
        twitter: body.twitter,
        github: body.github,
        personal_site: body['personal site']
      })
      .eq('id', userId)

    
      console.log({ data, error });
      
      
      throw redirect(303, `/profile/${userId}`)
  }
}

