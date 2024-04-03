import React from "react";
import { Image, Text, View } from "react-native";

import type { RouterOutputs } from "~/utils/api";
import { formatTime } from "~/utils/dateformatter";

type CommentProps = RouterOutputs["discussion"]["getReplies"][number];

export default function ReplyNotification({
  comment,
}: {
  comment: CommentProps;
}) {
  return (
    <View>
      <View className="flex flex-row">
        <Image
          source={{
            uri: "https://static.wikia.nocookie.net/acc-official-database/images/9/91/El_gato.jpg/revision/latest?cb=20220709001857",
          }}
          className="h-12 w-12 rounded-full"
          resizeMode="cover"
        />
        <View className="pb-3 pl-3 pr-3">
          <View className="flex flex-row">
            <Text className="font-title-md">{comment.userId}</Text>
            <Text className="font-body-lg"> commented on your post:</Text>
          </View>
          <Text className="font-body-lg">{comment.text}</Text>
          <Text className="font-body-md mt-2">
            {formatTime(comment.createdAt)}
          </Text>
        </View>
      </View>
    </View>
  );
}
