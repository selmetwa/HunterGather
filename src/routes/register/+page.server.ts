import { AuthApiError } from "@supabase/gotrue-js";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
  register: async ({ request, locals }) => {
    const body = Object.fromEntries(await request.formData())

    console.log({ body })
    const { data, error: err } = await locals.sb.auth.signUp({
      email: body.email as string,
      password: body.password as string,
      options: {
        data: {
          name: body.name as string,
        }
      }
    })


    if (err) {
      console.log({ err })
      if (err instanceof AuthApiError && err.status === 400) {
        return fail(400, {
          error: 'Invalid email or password'
        })
      }

      return fail(500, {
        error: 'Server error. Please try again later.'
      })
    }

    throw redirect(303, "/")
  }
};