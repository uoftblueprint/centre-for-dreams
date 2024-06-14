import type { getAuth } from "@clerk/nextjs/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@supabase/supabase-js";
import { TRPCError } from "@trpc/server";
import { decode } from "base64-arraybuffer";

const supabaseUrl = process.env.SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.SUPABASE_KEY ?? "";

/**
 * Util function to create a supabase client object signed with the Clerk session token.
 * This allows supabase to authenticate users using the JWT provided by Clerk.
 *
 * @param clerkSesssionToken String representing the Clerk session JWT using the supabase template
 * @returns The SupabaseClient object
 */
function createClerkSupabaseClient(clerkSesssionToken: string): SupabaseClient {
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

/**
 * Uploads an image file encoded in base64 format to Supabase storage
 *
 * @param auth The auth from the TRPC request context
 * @param fileContents The contents of the image in base64 form
 * @param filePath Where the file will reside in the Supabase storage bucket
 * @param bucketName The name of the storage bucket to upload to
 * @returns An array of the image paths on Supabase
 */
export async function uploadImage(
  auth: ReturnType<typeof getAuth>,
  bucketName: string,
  images: {
    fileContents?: string | null | undefined;
    filePath?: string | null | undefined;
  }[],
): Promise<string[]> {
  for (const image of images) {
    const fileSize = (image.fileContents?.length ?? 0) * (3 / 4) - 1;
    // Limit size of images to 5mb
    if ((fileSize ?? 0) >= 1e6 * 5) {
      throw new TRPCError({
        message: "Image file size too big",
        code: "PAYLOAD_TOO_LARGE",
      });
    }
  }
  const clerkSessionToken = await auth.getToken({
    template: "supabase",
  });

  if (clerkSessionToken == null) {
    throw new TRPCError({
      message: "Cannot retreive Clerk JWT token for Supabase",
      code: "INTERNAL_SERVER_ERROR",
    });
  }

  const supabase = createClerkSupabaseClient(clerkSessionToken);
  const imagePaths = [];
  for (const image of images) {
    // Skip bad images
    if (!image.fileContents || !image.filePath) {
      continue;
    }
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(image.filePath, decode(image.fileContents), {
        upsert: true,
      });
    if (error) {
      throw error;
    }
    if (data) {
      imagePaths.push(data.path);
    }
  }
  console.log("Successfully uploaded images: ", imagePaths);
  return imagePaths;
}
