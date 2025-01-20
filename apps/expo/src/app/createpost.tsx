import React, { useState } from "react";
import {
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  GestureHandlerRootView,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from "expo-constants";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { Stack, useRouter } from "expo-router";
import AWS from "aws-sdk";

import FilledButton from "~/components/FilledButtons";
import OutlinedButton from "~/components/OutlinedButtons";
import { api } from "~/utils/api";
import LeftArrow from "../../assets/arrow-left.svg";

AWS.config.update({
  accessKeyId: String(Constants.expoConfig?.extra?.awsAccessKeyId),
  secretAccessKey: String(Constants.expoConfig?.extra?.awsSecretAccessKey),
  region: String(Constants.expoConfig?.extra?.awsRegion),
});
const s3 = new AWS.S3();

function CreatePost() {
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  // const [images, setImages] = useState<string[]>([]);
  const [tempImages, setTempImages] = useState<Uint8Array[]>([]); // This is an array used to store images BEFORE uploading to S3
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { back } = useRouter();

  const { mutate: createDiscussion } =
    api.discussion.createDiscussion.useMutation({
      onSuccess: () => {
        back();
      },
      onError: (error) => {
        console.error("Error:", error);
      },
    });

  const createPost = async () => {
    if (title === "") {
      setErrorMessage("Title is required.");
    } else {
      setErrorMessage("");

      if (tempImages.length !== 0) {

        // Step 1: Create an array to store upload promises
        const uploadPromises = tempImages.map((image, index) => {
          const fileName = `uploaded-image-${title}-${index}.jpg`;
          const params = {
            Bucket: "cfd-post-image-upload",
            Key: fileName,
            Body: image,
            ContentType: "image/jpeg",
          };

          // Return a promise that resolves to the uploaded image URL
          return new Promise<string>((resolve, reject) => {
            s3.upload(
              params,
              (error: Error, data: AWS.S3.ManagedUpload.SendData) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(data.Location);
                }
              },
            );
          });
        });

        // Step 2: Wait for all uploads to complete
        const uploadedImages = await Promise.all(uploadPromises);

        createDiscussion({
          title: title,
          contents: post,
          images: uploadedImages,
        });
        console.log("Post successfully created.");
        clearState();
      }
    }
  };

  const clearState = () => {
    setTitle("");
    setPost("");
    // setImages([]);
    setTempImages([]);
    setErrorMessage("");
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.3,
    });
    // console.log("result:", result);

    if (!result.canceled) {
      if (result.assets[0]?.uri) {
        const uri = result.assets[0].uri;
        // console.log("Image URI: ", uri);

        // Read file and encode in Base64
        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        if (base64) {
          // console.log("Base64 encoding completed");

          // Convert Base64 to binary
          const binary = atob(base64);

          // Convert binary to Buffer for S3 upload
          const buffer = new Uint8Array(
            binary.split("").map((char) => char.charCodeAt(0)),
          );

          setTempImages([...tempImages, buffer]);
        } else {
          console.error("Error reading file");
        }
      }
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="bg-white">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className=" h-full justify-between">
            <Stack.Screen options={{ title: "Event", headerShown: false }} />
            <View className="inline-flex  flex-col justify-start  gap-2.5 px-4 pt-6">
              <View className="inline-flex flex-row items-center justify-between self-stretch">
                <View className="relative h-6 w-6">
                  <TouchableOpacity
                    onPress={() => {
                      clearState();
                      back();
                    }}
                  >
                    <LeftArrow className="relative h-6 w-6" />
                  </TouchableOpacity>
                </View>
                <Text className="text-p-0 font-headline-md text-center leading-9">
                  Create Post
                </Text>
                <View className="relative h-6 w-6">
                  {/* <TouchableOpacity
                    onPress={() => {
                      clearState();
                      back();
                    }}
                  >
                    <LeftArrow className="relative h-6 w-6" />
                  </TouchableOpacity> */}
                </View>
              </View>

              {/* Title Section */}
              <View className="inline-flex flex-row items-start justify-start gap-y-4">
                <Text className="text-p-0 font-title-md leading-normal tracking-tight">
                  Title
                </Text>
                <Text className="text-e-40 font-title-md leading-normal tracking-tight">
                  *
                </Text>
              </View>
              <TextInput
                value={title}
                placeholder={
                  errorMessage === "Title is required."
                    ? `${errorMessage}`
                    : "Enter post title..."
                }
                placeholderTextColor={errorMessage ? "red" : "gray-500"}
                className={`border-p-40 h-12 w-full rounded-lg border bg-white p-2 shadow-inner shadow-sm ${
                  errorMessage ? "border-e-40" : "border-p-40"
                }`}
                onChangeText={(text) => setTitle(text)}
              />

              {/* Description Section */}
              <View className="inline-flex flex-row items-start justify-start gap-y-4">
                <Text className="text-p-0 font-title-md leading-normal tracking-tight">
                  Description
                </Text>
                {/* <Text className="text-e-40 font-title-md leading-normal tracking-tight">
                  *
                </Text> */}
              </View>
              <></>

              <TextInput
                multiline
                value={post}
                placeholder="Write description here..."
                placeholderTextColor="gray-500"
                className="w-100 border-p-40 h-52 rounded-lg border bg-white p-2 shadow-inner shadow-sm"
                onChangeText={(post) => setPost(post)}
                aria-label="input"
              />

              <View className={` ${tempImages[0] == null}h-44`}>
                {tempImages[0] && (
                  <ScrollView horizontal={true}>
                    {tempImages.map((i, index) => {
                      const uint8ArrayToBase64 = (uint8Array: Uint8Array) => {
                        let binary = "";
                        uint8Array.forEach((byte) => {
                          binary += String.fromCharCode(byte);
                        });
                        return `data:image/png;base64,${btoa(binary)}`;
                      };

                      const base64String = uint8ArrayToBase64(i);
                      return (
                        <View key={index} className="mb-3 mr-4">
                          <Image
                            source={{ uri: base64String }}
                            className="h-40 w-40"
                          />
                        </View>
                      );
                    })}
                  </ScrollView>
                )}
              </View>
              {/* <TouchableOpacity onPress={pickImage} className="h-10 w-48"> */}
              <View className="h-10 w-48">
                <OutlinedButton onPress={pickImage} icon={true}>
                  Add Photos
                </OutlinedButton>
              </View>
              {/* </TouchableOpacity> */}

              {/* Error Message */}
              {(errorMessage && errorMessage != "Title is required.") ? (
                <Text className="text-sm text-red-500">{errorMessage}</Text>
              ) : null}
            </View>
            <View className="flex-row justify-evenly">
              {/* <TouchableOpacity
                className="w-44"
                onPress={() => {
                  clearState();
                  back();
                }}
              > */}
              <OutlinedButton
                onPress={() => {
                  clearState();
                  back();
                }}
              >
                Cancel
              </OutlinedButton>
              {/* </TouchableOpacity> */}

              {/* <TouchableOpacity
                className="w-44"
                onPress={() => {
                  createPost();
                }}
              > */}
              <View className="w-44">
                <FilledButton
                  onClick={async () => {
                    await createPost();
                  }}
                >
                  Publish
                </FilledButton>
              </View>
              {/* </TouchableOpacity> */}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

export default CreatePost;
