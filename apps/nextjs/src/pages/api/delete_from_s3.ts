import type { NextApiRequest, NextApiResponse } from "next";
import { S3 } from "aws-sdk";

const s3 = new S3();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    try {
      const { fileName } = req.body as { fileName: string }; // Explicitly type req.body

      if (!fileName) {
        return res
          .status(400)
          .json({ success: false, error: "Missing fileName" });
      }

      // S3 parameters
      const params = {
        Bucket: "cfd-post-image-upload", // Specify your S3 bucket name
        Key: fileName, // Specify the file name to delete
      };

      // Delete the file from S3
      await s3.deleteObject(params).promise();

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error deleting from S3:", error);

      return res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // Handle any non-POST requests
  return res.status(405).json({ success: false, error: "Method Not Allowed" });
}
