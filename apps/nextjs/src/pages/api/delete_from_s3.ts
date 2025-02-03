import { S3 } from "aws-sdk";

const s3 = new S3();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { fileName } = req.body; // Extract file name from request body

      // S3 parameters
      const params = {
        Bucket: "your-s3-bucket-name", // Specify your S3 bucket name
        Key: fileName, // Specify the file name to delete
      };

      // Delete the file from S3
      await s3.deleteObject(params).promise();

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error deleting from S3:", error);
      return res.status(500).json({ success: false, error: error.message });
    }
  } else {
    // Handle any non-POST requests here
    return res.status(405).json({ success: false, error: "Method Not Allowed" });
  }
}
