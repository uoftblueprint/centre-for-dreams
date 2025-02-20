import React, { useState } from "react";
import {
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";

import FilledButton from "~/components/FilledButtons";
import OutlinedButton from "~/components/OutlinedButtons";
import { api } from "~/utils/api";
import LeftArrow from "../../assets/arrow-left.svg";

function EditPost() {
  const { id, initialContent } = useLocalSearchParams<{
    id: string;
    initialContent: string;
  }>();
  const [post, setPost] = useState(initialContent || "");
  const { back } = useRouter();
  const [isError, setIsError] = useState(false);

  const { mutate: updateDiscussion } =
    api.discussion.updateDiscussionByID.useMutation({
      onSuccess: () => {
        back();
      },
    });

  const updatePost = () => {
    if (post.trim() === "") {
      setIsError(true);
      return;
    }
    setIsError(false);
    updateDiscussion({
      id: Number(id),
      title: "",
    });
  };

  const clearState = () => {
    setPost(initialContent || "");
  };

  return (
    <SafeAreaView className="bg-white">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="h-full justify-between">
          <Stack.Screen options={{ title: "Edit Post", headerShown: false }} />
          <View className="inline-flex flex-col justify-start gap-2.5 px-4 pt-6">
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
                Edit Post
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

            <TextInput
              multiline
              value={post}
              placeholder="Write description here..."
              className={`w-100 h-52 rounded-lg border bg-white p-2 shadow-inner shadow-sm ${
                isError ? "border-e-40" : "border-p-40"
              }`}
              onChangeText={(text) => {
                setPost(text);
                setIsError(false);
              }}
              aria-label="input"
            />
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

            <TouchableOpacity className="w-44" onPress={updatePost}>
              <FilledButton onClick={updatePost}>Save</FilledButton>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

export default EditPost;
