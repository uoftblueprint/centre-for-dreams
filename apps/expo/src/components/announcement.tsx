import React from "react";
import { Image, Text, View } from "react-native";

import type { RouterInputs } from "~/utils/api";

type AnnouncementComponent = RouterInputs["announcement"]["createAnnouncement"];

export default function Announcement({
  announcement,
}: {
  announcement: AnnouncementComponent;
}) {
  return (
    <View className="h-25 mx-auto w-11/12 rounded-lg bg-white p-4">
      <Text className="text-xl font-bold">{announcement.title}</Text>
      <View className="mt-2 flex-row items-center">
        <Image
          source={{
            uri: "https://static.wikia.nocookie.net/acc-official-database/images/9/91/El_gato.jpg/revision/latest?cb=20220709001857",
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
            uri: "https://static.wikia.nocookie.net/acc-official-database/images/9/91/El_gato.jpg/revision/latest?cb=20220709001857",
          }}
          className="h-60 w-fit"
        />
      </View>
      <View>
        <Text className="mt-2 text-lg">{announcement.contents}</Text>
      </View>
      <View className="flex-row items-center justify-end">
        <Text>icon</Text>
        <Text className="ml-2 mr-2 text-lg">Reply</Text>
        <Text>icon</Text>
        <Text className="ml-2 text-lg">Read</Text>
      </View>
    </View>
  );
}
