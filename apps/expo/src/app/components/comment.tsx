import React from "react";
import { Image, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface Props {
  user: string;
  time_elapsed: string;
  comment_body: string;
}

export default function Comment({ user, time_elapsed, comment_body }: Props) {
  return (
    <View className="h-25 mx-auto w-11/12 rounded-lg bg-white p-6">
      <View className="flex-row items-center justify-start">
        <Image
          source={{
            uri: "https://static.wikia.nocookie.net/acc-official-database/images/9/91/El_gato.jpg/revision/latest?cb=20220709001857",
          }}
          className="h-8 w-8 rounded-full"
          resizeMode="cover"
        />
        <Text className="ml-2 mr-2 text-base">{user}</Text>
        <AntDesign name="clockcircle" size={20} color="black" />
        <Text className="ml-2 text-base">{time_elapsed + "h"}</Text>
      </View>
      <Text className="ml-10 mt-2">{comment_body}</Text>
    </View>
  );
}
