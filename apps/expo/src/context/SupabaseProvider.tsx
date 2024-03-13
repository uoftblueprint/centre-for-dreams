import type { ReactNode } from "react";
import { createContext, useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@supabase/supabase-js";

interface SupabaseContextType {
  supabase: SupabaseClient | undefined | null;
  loading: boolean;
  error: Error | undefined | null;
}

export const SupabaseContext = createContext<SupabaseContextType>({
  supabase: null,
  loading: false,
  error: null,
});

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_KEY ?? "";

/**
 * Util function to create a supabase client object signed with the Clerk session token.
 * This allows supabase to authenticate users using the JWT provided by Clerk.
 *
 * @param clerkSesssionToken String representing the Clerk session JWT using the supabase template
 * @returns The SupabaseClient object
 */
function createClerkSupabaseClient(clerkSesssionToken: string) {
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

export function SupabaseProvider({ children }: { children?: ReactNode }) {
  const { user } = useUser();
  const { getToken } = useAuth();

  const [supabase, setSupabase] = useState<SupabaseClient>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    const fetchTokenAndInitializeClient = async () => {
      const token = await getToken({ template: "supabase" });
      if (!token) {
        throw new Error("No token found");
      }
      return createClerkSupabaseClient(token);
    };

    fetchTokenAndInitializeClient()
      .then((supabaseClient) => {
        setSupabase(supabaseClient);
        setError(null);
      })
      .catch((err) => {
        if (err instanceof Error) {
          setError(err);
        }
      });

    setLoading(false);
  }, [getToken, user]);

  return (
    <SupabaseContext.Provider value={{ supabase, loading, error }}>
      {children}
    </SupabaseContext.Provider>
  );
}
