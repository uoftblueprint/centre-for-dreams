import React from "react";
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

// Correctly destructuring props in a functional component
export default function DiscussionPostImage({
  data,
}: {
  data: DiscussionPostImageProps;
}) {
  const fileName = data.imageLink.split("/").pop();

  const params = {
    Bucket: "cfd-post-image-upload",
    Key: fileName,
  };

  async function getFromS3Bucket(params: any) {
    if (!fileName) {
      console.error("Invalid image URL")
      return "";
    }

    s3.getObject(params)
      .promise()
      .then((result) => {
        if (
          !result.Body ||
          !(result.Body instanceof Buffer || result.Body instanceof Uint8Array)
        ) {
          throw new Error("Invalid image data received");
        }
        const base64String = Buffer.from(result.Body).toString("base64");
        const imageSrc = `data:image/jpeg;base64,${base64String}`;
        return imageSrc;
      })
      .catch((error) => {
        console.error(error);
        return "";
      });
  }

  if (!AWS.config.credentials) {
    return (
      <View key="0" className="mb-3 mr-4">
        <Image
          source={{
            uri: "https://static.wikia.nocookie.net/acc-official-database/images/9/91/El_gato.jpg/revision/latest?cb=20220709001857",
          }}
          className="h-60 w-fit"
        />
      </View>
    );
  } else {
    const imageData = getFromS3Bucket(params);
    return (
      <View key="0" className="mb-3 mr-4">
        <Image
          source={{
            uri: imageData,
          }}
          className="h-60 w-fit"
        />
      </View>
    );
  }
}
