import { createClient } from '@supabase/supabase-js';

// We require these to be set in the environment, but we will not crash the build if they are missing.
// We will throw an error at runtime if an API tries to use them while unset.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SECRET_KEY || '';

export function createAdminClient() {
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Supabase environment variables are not configured on the server.');
  }

  // Uses the Service Role Key for server-side trusted operations (like inserting leads bypassing RLS insert policies if needed, or if we want to enforce RLS, we can configure it).
  // The user specified: "Prefer server-side insertion through the internal API route. Never expose a Supabase service-role or secret key to the browser."
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}
