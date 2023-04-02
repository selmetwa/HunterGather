import { AuthApiError } from "@supabase/supabase-js"
import { fail, redirect } from "@sveltejs/kit"
import type { Actions } from "./$types"

const OAUTH_PROVIDERS = ["google", "github"]

export const load: any = async ({ locals } : any) => {
  const sessionExists = locals?.session;

  if (sessionExists) {
    throw redirect(303, '/')
  }
}

export const actions: Actions = {
	login: async ({ request, locals, url }) => {

    const provider = url.searchParams.get("provider") as any;

		if (provider) {
			if (!OAUTH_PROVIDERS.includes(provider)) {
				return fail(400, {
					error: "Provider not supported.",
				})
			}
			const { data, error: err } = await locals.sb.auth.signInWithOAuth({
				provider: provider,
			})

			if (err) {
				return fail(400, {
					message: "Something went wrong.",
				})
			}

      const a = data.url;
			throw redirect(303, data.url)
		}

		const body = Object.fromEntries(await request.formData())

		const { data, error: err } = await locals.sb.auth.signInWithPassword({
			email: body.email as string,
			password: body.password as string,
		})

		if (err) {
			if (err instanceof AuthApiError && err.status === 400) {
				return fail(400, {
					error: "Incorrect username or password.",
				})
			}
			return fail(500, {
				message: "Server error. Try again later.",
			})
		}

		throw redirect(303, "/")
	},
}