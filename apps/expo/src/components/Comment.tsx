import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import type { RouterOutputs } from "~/utils/api";
import { formatTime } from "~/utils/dateformatter";

type CommentComponent = RouterOutputs["comment"]["list"][number];

export default function Comment({ comment }: { comment: CommentComponent }) {
  const [showFullText, setShowFullText] = useState(false);

  const toggleShowFullText = () => {
    setShowFullText(!showFullText);
  };

  const truncatedText =
    comment.text.length > 200
      ? comment.text.slice(0, 200) + "... "
      : comment.text;

  return (
    <View className="h-25 mx-auto w-11/12 rounded-lg bg-white pb-2 pr-2 pt-2">
      <View className="flex-row items-center justify-start">
        <Image
          source={{
            uri: "https://static.wikia.nocookie.net/acc-official-database/images/9/91/El_gato.jpg/revision/latest?cb=20220709001857",
          }}
          className="h-12 w-12 rounded-full"
          resizeMode="cover"
        />
        <View>
          <Text className="font-title-md ml-4">{comment.userId}</Text>
          <Text className="font-body-md text-n-60 ml-4">
            {formatTime(comment.createdAt)}
          </Text>
        </View>
      </View>
      <View>
        <Text className="font-body-md ml-16 mt-2">
          {showFullText ? comment.text : truncatedText}
          {comment.text.length > 200 && (
            <TouchableOpacity onPress={toggleShowFullText}>
              <Text className="color-t-0 underline">
                {showFullText ? " See Less" : "See More"}
              </Text>
            </TouchableOpacity>
          )}
        </Text>
      </View>
    </View>
  );
}
