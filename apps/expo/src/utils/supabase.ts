import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_KEY ?? "";

/**
 * Util function to create a supabase client object signed with the Clerk session token.
 * This allows supabase to authenticate users using the JWT provided by Clerk.
 *
 * @param clerkSesssionToken String representing the Clerk session JWT using the supabase template
 * @returns The SupabaseClient object
 */
export function createClerkSupabaseClient(clerkSesssionToken: string) {
  return createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      // Get the Supabase token with a custom fetch method
      fetch: async (url, options = {}) => {
        // Construct fetch headers
        const headers = new Headers(options?.headers);
        headers.set("Authorization", `Bearer ${clerkSesssionToken}`);

        // Now call the default fetch
        return fetch(url, {
          ...options,
          headers,
        });
      },
    },
  });
}
