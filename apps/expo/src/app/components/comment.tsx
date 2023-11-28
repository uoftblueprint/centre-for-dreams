import React from "react";
import { Image, Text, View } from "react-native";

import type { RouterOutputs } from "~/utils/api";

type CommentComponent = RouterOutputs["comment"]["create"];

export default function Comment({ comment }: { comment: CommentComponent }) {
  function formatElapsed() {
    const currentTime = new Date();

    const timeDifference = currentTime.getTime() - comment.createdAt.getTime();

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    if (weeks >= 52) {
      const years = Math.floor(weeks / 52);
      return years + (years === 1 ? " year" : " years") + " ago";
    } else if (weeks >= 4) {
      const months = Math.floor(weeks / 4);
      return months + (months === 1 ? " month" : " months") + " ago";
    } else if (days >= 7) {
      return weeks + (weeks === 1 ? " week" : " weeks") + " ago";
    } else if (hours >= 24) {
      return days + (days === 1 ? " day" : " days") + " ago";
    } else if (minutes >= 60) {
      return hours + (hours === 1 ? " hour" : " hours") + " ago";
    } else if (seconds >= 60) {
      return minutes + (minutes === 1 ? " minute" : " minutes") + " ago";
    } else {
      return seconds + (seconds === 1 ? " second" : " seconds") + " ago";
    }
  }
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
        <Text className="ml-2 text-base">{formatElapsed()}</Text>
      </View>
      <Text className="ml-10 mt-2">{comment.text}</Text>
    </View>
  );
}