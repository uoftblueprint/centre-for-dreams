import React from "react";
import { Image, Text, View } from "react-native";

import type { RouterOutputs } from "~/utils/api";
import { formatTime } from "~/utils/format";

type CommentComponent = RouterOutputs["comment"]["create"];

export default function Comment({ comment }: { comment: CommentComponent }) {
  return (
    <View className="h-25 mx-auto w-11/12 rounded-lg bg-white p-6">
      <View className="flex-row items-center justify-start">
        <Image
          source={{
            uri: "https://static.wikia.nocookie.net/acc-official-database/images/9/91/El_gato.jpg/revision/latest?cb=20220709001857",
          }}
          className="h-12 w-12 rounded-full"
          resizeMode="cover"
        />
        <View>
          <Text className="font-title-md ml-4">John Doe</Text>
          <Text className="font-body-md text-n-60 ml-4">
            {formatTime(comment.createdAt)}
          </Text>
        </View>
      </View>

      <Text className="font-body-md ml-16 mt-2">{comment.text}</Text>
    </View>
  );
}
