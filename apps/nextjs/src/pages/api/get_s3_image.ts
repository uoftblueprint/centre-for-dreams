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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { fileName } = req.body;
    if (!fileName) {
      return res.status(400).json({ error: "Missing fileName" });
    }

    const params = {
      Bucket: "cfd-post-image-upload",
      Key: fileName,
    };

    const data = await s3.getObject(params).promise();
    if (!data.Body) {
      throw new Error("Failed to retrieve image");
    }

    // ✅ Convert image to Base64
    const base64String = data.Body.toString("base64");
    const contentType = data.ContentType || "image/jpeg";

    return res.status(200).json({
      image: `data:${contentType};base64,${base64String}`,
    });
  } catch (error) {
    console.error("S3 Fetch Error:", error);
    return res.status(500).json({ error: "Failed to fetch image from S3" });
  }
}
