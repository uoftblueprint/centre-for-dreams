import React, { useState } from "react";
import { Image, Keyboard, Text, TextInput, View } from "react-native";
import {
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Crypto from "expo-crypto";
import type { ImageResult } from "expo-image-manipulator";
import { manipulateAsync } from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { Stack, useRouter } from "expo-router";

import FilledButton from "~/components/FilledButtons";
import OutlinedButton from "~/components/OutlinedButtons";
import { api } from "~/utils/api";
import LeftArrow from "../../assets/arrow-left.svg";

function CreatePost() {
  const [post, setPost] = useState("");
  const [images, setImages] = useState<ImageResult[]>([]);
  const { back } = useRouter();

  const { mutate: createDiscussion } =
    api.discussion.createDiscussion.useMutation({
      onSuccess: () => {
        back();
      },
    });

  const createPost = () => {
    if (post != "") {
      createDiscussion({
        contents: post,
        images: images.flatMap((image) => {
          const fileExtension = image.uri.substring(
            image.uri.lastIndexOf(".") + 1,
          );
          return {
            fileContents: image.base64,
            filePath: `${Crypto.randomUUID()}.${fileExtension}`,
          };
        }),
      });
    }
  };

  const clearState = () => {
    setPost("");
    setImages([]);
  };
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      if (result.assets[0]?.uri) {
        const manipResult = await manipulateAsync(result.assets[0].uri, [], {
          compress: 0.5,
          base64: true,
        });
        const updatedImages = [...images, manipResult];
        // Update the state with the new list
        setImages(updatedImages);
      }
    }
  };

  return (
    <SafeAreaView className="bg-white">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className=" h-full justify-between">
          <Stack.Screen options={{ title: "Event", headerShown: false }} />
          <View className="inline-flex  flex-col justify-start  gap-2.5 px-4 pt-6">
            <View className="inline-flex flex-row items-center justify-between self-stretch">
              <TouchableOpacity
                onPress={() => {
                  clearState();
                  back();
                }}
              >
                <LeftArrow className="relative h-6 w-6" />
              </TouchableOpacity>
              <Text className="text-p-0 font-headline-md text-center leading-9">
                Create Post
              </Text>
              <View className="relative h-6 w-6" />
            </View>
            <View className="inline-flex flex-row items-start justify-start gap-y-4">
              <Text className="text-p-0 font-title-md leading-normal tracking-tight">
                Description
              </Text>
              <Text className="text-e-40 font-title-md leading-normal tracking-tight">
                *
              </Text>
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
                    return (
                      <View key={index} className="mb-3 mr-4">
                        <Image source={{ uri: i.uri }} className="h-40 w-40" />
                      </View>
                    );
                  })}
                </ScrollView>
              )}
            </View>
            <TouchableOpacity className="h-10 w-48" onPress={pickImage}>
              <OutlinedButton onPress={pickImage} icon={true}>
                Add Photos
              </OutlinedButton>
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-evenly">
            <TouchableOpacity
              className="w-44"
              onPress={() => {
                clearState();
                back();
              }}
            >
              <OutlinedButton onPress={() => back()}>Cancel</OutlinedButton>
            </TouchableOpacity>

            <TouchableOpacity
              className="w-44"
              onPress={() => {
                console.log("creat post");
                createPost();
              }}
            >
              <FilledButton
                onClick={() => {
                  // console.log("creat post");
                  createPost();
                }}
              >
                Publish
              </FilledButton>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

export default CreatePost;
