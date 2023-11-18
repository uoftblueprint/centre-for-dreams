import React from "react";
import { Image, Text, View } from "react-native";
import type { ImageSourcePropType } from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface Props {
  user: string;
  user_pic: ImageSourcePropType;
  time_elapsed: string;
  comment_body: string;
}

export default function Comment({
  user,
  user_pic,
  time_elapsed,
  comment_body,
}: Props) {
  return (
    <View className="h-25 mx-auto w-11/12 rounded-lg bg-white p-6">
      <View className="flex-row items-center justify-start">
        <Image
          source={user_pic}
          className="h-8 w-8 rounded-full"
          resizeMode="cover"
        />
        <Text className="ml-2 mr-2 text-base">{user}</Text>
        <AntDesign name="clockcircle" size={20} color="black" />
        <Text className="ml-2 text-base">{time_elapsed}</Text>
      </View>
      <Text className="ml-10 mt-2">{comment_body}</Text>
    </View>
  );
}
