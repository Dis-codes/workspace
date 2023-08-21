import { redirect } from '@sveltejs/kit'
import type { PageServerLoad, Actions } from './$types'
import { supabase } from '$lib/supabase'
import { type Provider } from '@supabase/supabase-js'
import data from './+layout.svelte'

export const load: PageServerLoad = async ({ url, locals: { getSession } }) => {
const session = await getSession()

// if the user is already logged in return them to the account page
// if (session) {
//     throw redirect(303, '/account')
// }

    return { url: url.origin }
}