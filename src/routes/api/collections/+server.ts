
import { v4 as uuidv4 } from 'uuid';
import { error, json } from '@sveltejs/kit';

import type { RequestHandler } from "./$types";
import { supabaseClient } from '$lib/supabase';

// get all collections by userId
export const GET: RequestHandler = async ({ locals }) => {
  const userId = locals?.session?.user?.id;

  const { data, error } = await supabaseClient
    .from('collections')
    .select()
    .eq('userId', userId)

  return json(data);
}

// createCollection
export const POST: RequestHandler = async ({ locals, request }) => {
  const data = await request.json();
  const userId = locals?.session?.user?.id;
  const collectionId = uuidv4();

  const { collectionIds, title, description } = data;

   const { data: responseData, error } = await supabaseClient
   .from('collections')
   .insert({ 
     collectionId: collectionId,
     title: title,
     description: description,
     userId: userId,
     collectionIds: collectionIds,
     objectType: 'collection',
    })

  if (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }

  return new Response(JSON.stringify('Collection Created Successfully'), { status: 200 });
}