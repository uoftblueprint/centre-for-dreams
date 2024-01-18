import React from "react";
import { Image, Text, View } from "react-native";
import * as Icons from "react-native-heroicons/outline";

import type { RouterOutputs } from "~/utils/api";
import { TimeFormatter } from "~/utils/format";

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
          <Text className="font-title-lg ml-4">El Gato</Text>
          <Text className="font-body-lg ml-4">
            Posted {TimeFormatter.formatTime(announcement.createdAt)}
          </Text>
        </View>
      </View>
      <View>
        <Text className="font-body-md mt-4">{announcement.contents}</Text>
        <View className="mt-2">
          <Image
            source={{
              uri: "https://static.wikia.nocookie.net/acc-official-database/images/9/91/El_gato.jpg/revision/latest?cb=20220709001857",
            }}
            className="h-60 w-fit"
          />
        </View>
      </View>
      <View className="mt-2 flex-row items-center justify-center gap-3">
        <Icons.HandThumbUpIcon color="black" size={16}></Icons.HandThumbUpIcon>
        <Text className="font-body-md">Like</Text>
        <Icons.ChatBubbleOvalLeftIcon
          color="black"
          size={16}
        ></Icons.ChatBubbleOvalLeftIcon>
        <Text className="font-body-md">Comment</Text>
        <Icons.PencilIcon color="black" size={16}></Icons.PencilIcon>
        <Text className="font-body-md">Edit</Text>
      </View>
    </View>
  );
}
