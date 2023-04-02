import type { RequestHandler } from "../$types";
import { supabaseClient } from '$lib/supabase';

// uploadAvatar
export const POST: RequestHandler = async ({ locals, request }) => {
  const avatarId = await request.json();
  const userId = locals?.session?.user?.id;

  const { data, error } = await supabaseClient
    .from('users')
    .update({ 
      avatar_id: avatarId,
    })
    .eq('id', userId)

  if (error) {
    return new Response('Error Updating Avatar')
  }

  return new Response('Avatar Updated Successfully')
}