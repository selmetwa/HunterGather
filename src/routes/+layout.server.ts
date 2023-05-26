import { getServerSession } from "@supabase/auth-helpers-sveltekit"
import type { LayoutServerLoad } from "./$types"

export const ssr = false;

export const load: LayoutServerLoad = async (event) => {
  const session = await getServerSession(event)

  return {
		session: session,
    pathname: event.url.pathname,
	}
}
