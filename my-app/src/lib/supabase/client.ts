import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.PUBLIC_SUPABASE_ANON_KEY;

/**
 * Returns a Supabase client with the anon key for use in client components or browser code.
 * Use only for non-sensitive, public data. Do not use for profiles, contracts, transactions, or transaction_items—those must go through your API (server client).
 */
export function getSupabaseBrowserClient(): SupabaseClient {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing Supabase client env: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set"
    );
  }
  return createClient(supabaseUrl, supabaseAnonKey);
}
