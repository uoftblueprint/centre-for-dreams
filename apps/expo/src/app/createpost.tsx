import { Buffer } from "buffer";
import React, { useState } from "react";
import {
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
// import RNFS from "react-native-fs";
import {
  GestureHandlerRootView,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { Stack, useRouter } from "expo-router";

import FilledButton from "~/components/FilledButtons";
import OutlinedButton from "~/components/OutlinedButtons";
import { api } from "~/utils/api";
import LeftArrow from "../../assets/arrow-left.svg";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  const [images, setImages] = useState<Buffer[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { back } = useRouter();

  const { mutate: createDiscussion } =
    api.discussion.createDiscussion.useMutation({
      onSuccess: () => {
        back();
      },
    });

  const createPost = () => {
    if (title === "") {
      setErrorMessage("Title is required.");
    } else {
      setErrorMessage("");
      createDiscussion({
        title: title,
        contents: post,
        images: images,
      });
      clearState();
    }
  };

  const clearState = () => {
    setTitle("");
    setPost("");
    setImages([]);
    setErrorMessage("");
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
    });
    console.log("result:", result);

    if (!result.canceled) {
      if (result.assets[0]?.uri) {
        const uri = result.assets[0].uri;
        console.log("Image URI: ", uri);
        // Convert to base64 string
        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        if (base64) {
          console.log("base64");
        }
        const binary = atob(base64);
        if (binary) {
          console.log("binary");
        }

        try {
          const bytes = binaryToBytes(binary);
          if (bytes) {
            console.log("uint8array");
          }
          const buffer = Buffer.from(bytes);
          if (buffer) {
            console.log("buffer");
          }

          setImages((prevImages) => {
            const updatedImages = [...prevImages, buffer];
            return updatedImages;
          });
        } catch (error) {
          console.error("Failed to convert binary to Buffer:", error);
        }
      }
    }
  };

  const binaryToBytes = (binary: string) => {
    const uint8Array = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      uint8Array[i] = binary.charCodeAt(i);
    }
    return uint8Array;
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
                placeholder="Enter post title..."
                className="border-p-40 h-12 w-full rounded-lg border bg-white p-2 shadow-inner shadow-sm"
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
                className="w-100 border-p-40 h-52 rounded-lg border bg-white p-2 shadow-inner shadow-sm"
                onChangeText={(post) => setPost(post)}
                aria-label="input"
              />

              <View className={` ${images[0] == null}h-44`}>
                {images[0] && (
                  <ScrollView horizontal={true}>
                    {images.map((i, index) => {
                      // Convert ArrayBuffer to base64 using FileReader
                      const bufferToBase64 = (buffer: Buffer) => {
                        const uint8Array = new Uint8Array(buffer);
                        let binary = "";
                        uint8Array.forEach((byte) => {
                          binary += String.fromCharCode(byte);
                        });
                        return `data:image/png;base64,${btoa(binary)}`;
                      };

                      const base64String = bufferToBase64(i);

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
              {errorMessage ? (
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
                  onClick={() => {
                    createPost();
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
