import { createClient } from "@supabase/supabase-js";
import { decode } from "base64-arraybuffer";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_KEY ?? "";

export const imageRouter = createTRPCRouter({
  uploadImage: protectedProcedure
    .input(
      z.object({
        bucketName: z.string(),
        filePath: z.string(),
        fileContents: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const clerkToken = await ctx.auth.getToken({ template: "supabase" });
      const supabase = createClient(supabaseUrl, supabaseAnonKey, {
        global: {
          // Get the Supabase token with a custom fetch method
          fetch: async (url, options = {}) => {
            // Construct fetch headers
            const headers = new Headers(options?.headers);
            headers.set("Authorization", `Bearer ${clerkToken}`);

            // Now call the default fetch
            return fetch(url, {
              ...options,
              headers,
            });
          },
        },
      });
      const { data, error } = await supabase.storage
        .from(input.bucketName)
        .upload(input.filePath, decode(input.fileContents), {
          upsert: false,
        });
      if (error ?? !data) {
        throw error;
      }
      return data;
    }),
});
