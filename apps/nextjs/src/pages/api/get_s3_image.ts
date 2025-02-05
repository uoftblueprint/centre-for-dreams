import type { NextApiRequest, NextApiResponse } from "next";
import AWS from "aws-sdk";

import { env } from "~/env.mjs";

// ✅ Server-side AWS S3 Configuration
AWS.config.update({
  accessKeyId: env.AWS_ACCESS_KEY,
  secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  region: env.AWS_REGION,
});

const s3 = new AWS.S3();

// ✅ Define expected request body structure
interface RequestBody {
  fileName: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    // ✅ Explicitly type req.body
    const body = req.body as RequestBody;
    const { fileName } = body;

    if (!fileName) {
      return res.status(400).json({ error: "Missing fileName" });
    }

    const params: AWS.S3.GetObjectRequest = {
      Bucket: "cfd-post-image-upload",
      Key: fileName,
    };

    const data = await s3.getObject(params).promise();
    if (!data.Body || !(data.Body instanceof Buffer)) {
      throw new Error("Failed to retrieve image");
    }

    // ✅ Convert image to Base64 safely
    const base64String = data.Body.toString("base64");
    const contentType = data.ContentType ?? "image/jpeg"; // ✅ Use nullish coalescing

    return res.status(200).json({
      image: `data:${contentType};base64,${base64String}`,
    });
  } catch (error) {
    console.error("S3 Fetch Error:", error);
    return res.status(500).json({ error: "Failed to fetch image from S3" });
  }
}
