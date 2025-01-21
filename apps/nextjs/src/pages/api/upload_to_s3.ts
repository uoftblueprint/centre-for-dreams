import type { NextApiRequest, NextApiResponse } from "next";
import AWS from "aws-sdk";
import { env } from "~/env.mjs";

AWS.config.update({
  accessKeyId: env.AWS_ACCESS_KEY,
  secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  region: env.AWS_REGION,
});

const s3 = new AWS.S3();

interface UploadRequestBody {
    bucket: string;
    key: string;
    body: string;
    contentType: string;
  }
  

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { bucket, key, body, contentType } = req.body as UploadRequestBody;

      if (!bucket || !key || !body || !contentType) {
        return res.status(400).json({ error: "Missing required parameters" });
      }

      const params = {
        Bucket: bucket,
        Key: key,
        Body: body,
        ContentType: contentType,
      };

      const data = await s3.upload(params).promise();
      return res.status(200).json({ success: true, data });
    } catch (error: unknown) {
    // Safely narrow error type
        if (error instanceof Error) {
            console.error("S3 Upload Error:", error.message);
            return res.status(500).json({ success: false, error: error.message });
        } else {
            console.error("Unexpected Error:", error);
            return res.status(500).json({ success: false, error: "Unexpected error occurred" });
        }
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
