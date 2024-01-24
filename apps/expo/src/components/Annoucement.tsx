import React from "react";
import { Image, Text, View } from "react-native";

import type { RouterOutputs } from "~/utils/api";
import { formatTime } from "~/utils/format";

type AnnouncementProps =
  RouterOutputs["announcement"]["getAnnouncements"][number];

export default function Announcement({
  announcement,
}: {
  announcement: AnnouncementProps;
}) {
  return (
    <View className="h-25 mx-auto w-11/12 rounded-lg bg-white p-4">
      <View className="mt-2 flex-row items-center">
        <Image
          source={{
            uri: "https://static.wikia.nocookie.net/acc-official-database/images/9/91/El_gato.jpg/revision/latest?cb=20220709001857",
          }}
          className="h-12 w-12 rounded-full"
          resizeMode="cover"
        />
        <View>
          <Text className="font-title-lg ml-4 mr-4">{announcement.title}</Text>
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
      <View className="mt-2 flex-row items-center justify-center  gap-x-6">
        <View className="flex-row gap-2">
          <Text>o</Text>
          <Text className="font-body-md">Like</Text>
        </View>

        <View className="flex-row gap-2">
          <Text>o</Text>
          <Text className="font-body-md">Comment</Text>
        </View>
        <View className="flex-row gap-2">
          <Text>o</Text>
          <Text className="font-body-md">Edit</Text>
        </View>
      </View>
    </View>
  );
}
