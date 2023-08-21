import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPA_URL, PUBLIC_SUPA_ANON_KEY } from '$env/static/public'

const supabaseUrl = PUBLIC_SUPA_URL;
const supabaseKey = PUBLIC_SUPA_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey, {db: {schema: 'public'}, auth: {flowType:'pkce'}});
