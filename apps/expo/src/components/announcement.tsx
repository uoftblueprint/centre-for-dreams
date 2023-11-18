import React from "react";
import { Image, Text, View } from "react-native";
import type { ImageSourcePropType } from "react-native";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  title: string;
  author: string;
  date: string;
  summary: string;
  profile_picture: ImageSourcePropType;
  post_media: ImageSourcePropType;
}

export default function Announcement({
  title,
  author,
  date,
  summary,
  profile_picture,
  post_media,
}: Props) {
  return (
    <View className="h-25 mx-auto w-11/12 rounded-lg bg-white p-4">
      <Text className="text-xl font-bold">{title}</Text>
      <View className="mt-2 flex-row items-center">
        <Image
          source={profile_picture}
          className="h-8 w-8 rounded-full"
          resizeMode="cover"
        />
        <Text className="ml-2 text-lg">{author}</Text>
        <Text className="ml-4 text-lg">{date}</Text>
      </View>
      <View className="mt-2">
        <Image source={post_media} className="h-60 w-fit" />
      </View>
      <View>
        <Text className="mt-2 text-lg">{summary}</Text>
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
