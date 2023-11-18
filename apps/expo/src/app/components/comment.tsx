import React from "react";
import { View } from "react-native";
import type { ImageSourcePropType } from "react-native";

interface Props {
  user: string;
  // user_pic: ImageSourcePropType
  time_elapsed: string;
  comment_body: string;
}

export default function Comment({
  user, time_elapsed, comment_body
}: Props) {
  return (
    <View className="h-25 mx-auto w-11/12 rounded-lg bg-white p-4">
      
    </View>
  );
}
