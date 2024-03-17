import type { ReactNode } from "react";
import { createContext, useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import type { SupabaseClient } from "@supabase/supabase-js";

import { createClerkSupabaseClient } from "~/utils/supabaseUtils";

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

export function SupabaseProvider({ children }: { children?: ReactNode }) {
  const { user } = useUser();
  const { getToken } = useAuth();

  const [supabase, setSupabase] = useState<SupabaseClient>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Refreshes the JWT from clerk every 14 minutes
    // The JWT is set to expire every 15 minutes
    const interval = setInterval(
      () => {
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
      },
      60 * 14 * 1000,
    );
    return () => clearInterval(interval);
  }, [getToken, user]);

  return (
    <SupabaseContext.Provider value={{ supabase, loading, error }}>
      {children}
    </SupabaseContext.Provider>
  );
}
