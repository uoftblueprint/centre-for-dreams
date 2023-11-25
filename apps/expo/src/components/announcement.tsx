import React from "react";
import { Image, Text, View } from "react-native";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";

import type { AnnouncementComponent } from "~/utils/api";

export default function Announcement({
  title,
  contents,
}: AnnouncementComponent) {
  return (
    <View className="h-25 mx-auto w-11/12 rounded-lg bg-white p-4">
      <Text className="text-xl font-bold">{title}</Text>
      <View className="mt-2 flex-row items-center">
        <Image
          source={{
            uri: 'https://static.wikia.nocookie.net/acc-official-database/images/9/91/El_gato.jpg/revision/latest?cb=20220709001857',
          }}
          className="h-8 w-8 rounded-full"
          resizeMode="cover"
        />
        <Text className="ml-2 text-lg">Placeholder Author</Text>
        <Text className="ml-4 text-lg">Nov 3</Text>
      </View>
      <View className="mt-2">
        <Image 
        source={{
        uri: 'https://static.wikia.nocookie.net/acc-official-database/images/9/91/El_gato.jpg/revision/latest?cb=20220709001857',
      }} className="h-60 w-fit" />
      </View>
      <View>
        <Text className="mt-2 text-lg">{contents}</Text>
      </View>
      <View className="flex-row items-center justify-end">
        <Entypo name="reply" size={24} color="black" />
        <Text className="ml-2 mr-2 text-lg">Reply</Text>
        <MaterialCommunityIcons name="read" size={24} color="black" />
        <Text className="ml-2 text-lg">Read</Text>
      </View>
    </View>
  );
}
