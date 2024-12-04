import React, { useState } from "react";
import { Image, Keyboard, Text, TextInput, View } from "react-native";
import {
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { Stack, useRouter } from "expo-router";

import FilledButton from "~/components/FilledButtons";
import OutlinedButton from "~/components/OutlinedButtons";
import { api } from "~/utils/api";
import LeftArrow from "../../assets/arrow-left.svg";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const { back } = useRouter();

  const { mutate: createDiscussion } =
    api.discussion.createDiscussion.useMutation({
      onSuccess: () => {
        back();
      },
    });

  const createPost = () => {
    if (title !== "" && post != "") {
      createDiscussion({
        title: title,
        contents: post,
      });
    }
  };

  const clearState = () => {
    setTitle("");
    setPost("");
    setImages([]);
  };
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      if (result.assets[0]?.uri) {
        const updatedImages = [...images, result.assets[0].uri];
        // Update the state with the new list
        setImages(updatedImages);
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

              {/* Title Section */}
              <View className="inline-flex flex-col gap-y-2">
                <Text className="text-p-0 font-title-md leading-normal tracking-tight">
                  Title
                </Text>
                <TextInput
                  value={title}
                  placeholder="Enter post title..."
                  className="w-full border-p-40 h-12 rounded-lg border bg-white p-2 shadow-inner shadow-sm"
                  onChangeText={(text) => setTitle(text)}
                />
              </View>

              {/* Description Section */}
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
                          <Image source={{ uri: i }} className="h-40 w-40" />
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
                  createPost();
                }}
              >
                <FilledButton
                  onClick={() => {
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
    </GestureHandlerRootView>
  );
}

export default CreatePost;
