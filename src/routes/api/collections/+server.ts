
import { v4 as uuidv4 } from 'uuid';

import type { RequestHandler } from "./$types";
import { supabaseClient } from '$lib/supabase';

// createCollection
export const POST: RequestHandler = async ({ locals, request }) => {
  const data = await request.json();
  const userId = locals?.session?.user?.id;
  const collectionId = uuidv4();

  const { title, description } = data;
  console.log({ data, userId });

   const { data: responseData, error } = await supabaseClient
   .from('collections')
   .insert({ 
     collectionId: collectionId,
     title: title,
     description: description,
     userId: userId
    })

  console.log({
    responseData,
    error
  });

  if (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }

  return new Response(JSON.stringify('Collection Created Successfully'), { status: 200 });
}