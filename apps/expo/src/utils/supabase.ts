import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_KEY ?? "";

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
