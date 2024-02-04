import React from "react";
import { Image, Text, View } from "react-native";

import type { RouterOutputs } from "~/utils/api";
import { formatTime } from "~/utils/dateformatter";

type AnnoucementProps =
  RouterOutputs["announcement"]["getAnnouncements"][number];

export default function Announcement({
  announcement,
}: {
  announcement: AnnoucementProps;
}) {
  return (
    <View className="h-25 mx-auto w-11/12 rounded-lg bg-white p-4">
      <View className="border-b">
        <Text className="font-headline-lg pb-4 pt-4">{announcement.title}</Text>
      </View>
      <View className="mt-2 flex-row items-center pt-4">
        <Image
          source={{
            uri: "https://static.wikia.nocookie.net/acc-official-database/images/9/91/El_gato.jpg/revision/latest?cb=20220709001857",
          }}
          className="h-12 w-12 rounded-full"
          resizeMode="cover"
        />
        <View>
          <Text className="font-title-lg ml-4 mr-4">{announcement.userId}</Text>
          <Text className="font-body-lg ml-4">
            posted {formatTime(announcement.createdAt)}
          </Text>
        </View>
      </View>
      <View>
        <Text className="font-body-lg mt-4">{announcement.contents}</Text>
        <View className="mt-2">
          <Image
            source={{
              uri: "https://static.wikia.nocookie.net/acc-official-database/images/9/91/El_gato.jpg/revision/latest?cb=20220709001857",
            }}
            className="h-60 w-fit"
          />
        </View>
      </View>
      <View className="mt-2 flex-row items-center justify-center p-2">
        <View className="w-1/2 flex-row justify-center">
          <Text className="mr-2">o</Text>
          <Text className="font-body-md">Reply</Text>
        </View>
        <View className="h-10 w-px bg-gray-300" />
        <View className="w-1/2 flex-row justify-center">
          <Text className="mr-2">o</Text>
          <Text className="font-body-md">Read</Text>
        </View>
      </View>
    </View>
  );
}
