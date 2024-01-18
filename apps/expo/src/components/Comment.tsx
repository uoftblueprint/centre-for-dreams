import React from "react";
import { Image, Text, View } from "react-native";

import type { RouterOutputs } from "~/utils/api";
import { TimeFormatter } from "~/utils/format";

type CommentComponent = RouterOutputs["comment"]["create"];

export default function Comment({ comment }: { comment: CommentComponent }) {
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
        <Text className="ml-2 mr-2 text-base">{comment.userId}</Text>
        <Text>Icon</Text>
        <Text className="ml-2 text-base">
          {TimeFormatter.formatTime(comment.createdAt)}
        </Text>
      </View>
      <Text className="ml-10 mt-2">{comment.text}</Text>
    </View>
  );
}
