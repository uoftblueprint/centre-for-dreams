import React, { useEffect, useState } from "react";
import { Image, View } from "react-native";
import Constants from "expo-constants";
import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: String(Constants.expoConfig?.extra?.awsAccessKeyId),
  secretAccessKey: String(Constants.expoConfig?.extra?.awsSecretAccessKey),
  region: String(Constants.expoConfig?.extra?.awsRegion),
});

const s3 = new AWS.S3();

interface DiscussionPostImageProps {
  imageLink: string;
}

export default function DiscussionPostImage({
  data,
}: {
  data: DiscussionPostImageProps;
}) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const fileName = data.imageLink.split("/").pop();

  useEffect(() => {
    if (!fileName) {
      console.error("Invalid image URL");
      setImageSrc(null);
      setLoading(false);
      return;
    }

    const params = {
      Bucket: "cfd-post-image-upload",
      Key: fileName,
    };

    async function fetchImage() {
      try {
        const result = await s3.getObject(params).promise();

        if (
          !result.Body ||
          !(result.Body instanceof Buffer || result.Body instanceof Uint8Array)
        ) {
          throw new Error("Invalid image data received");
        }

        const base64String = Buffer.from(result.Body).toString("base64");
        setImageSrc(`data:image/jpeg;base64,${base64String}`);
      } catch (error) {
        console.error("S3 Image Fetch Error:", error);
        setImageSrc(null);
      } finally {
        setLoading(false);
      }
    }

    fetchImage().catch((error) => {
      console.error(`Could not load image. ${error}`);
    });
  }, [data.imageLink, fileName]);

  if (loading) {
    return (
      <View style={{ height: 240, width: "100%", backgroundColor: "#eee" }} />
    );
  }

  return (
    <View key="0" className="mb-3 mr-4">
      <Image
        source={{
          uri: imageSrc
            ? imageSrc
            : "https://static.wikia.nocookie.net/acc-official-database/images/9/91/El_gato.jpg/revision/latest?cb=20220709001857",
        }}
        className="h-60 w-fit"
      />
    </View>
  );
}
