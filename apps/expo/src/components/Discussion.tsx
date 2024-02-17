import React from "react";
import { Image, Text, View } from "react-native";

import type { RouterOutputs } from "~/utils/api";
import { formatTime } from "~/utils/dateformatter";
import CommentIcon from "../../assets/comment.svg";
import EditIcon from "../../assets/edit.svg";
import LikeIcon from "../../assets/like.svg";

type DiscussionProps = RouterOutputs["discussion"]["getDiscussions"][number];

export default function Discussion({
  discussion,
  canEdit,
}: {
  discussion: DiscussionProps;
  canEdit: boolean;
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
          <Text className="font-title-lg ml-4 mr-4">{discussion.title}</Text>
          <Text className="font-body-lg ml-4">
            posted {formatTime(discussion.createdAt)}
          </Text>
        </View>
      </View>
      <View>
        <Text className="font-body-lg mt-4">{discussion.contents}</Text>
        <View className="mt-2">
          <Image
            source={{
              uri: "https://static.wikia.nocookie.net/acc-official-database/images/9/91/El_gato.jpg/revision/latest?cb=20220709001857",
            }}
            className="h-60 w-fit"
          />
        </View>
      </View>
      <View className="mb-4 mt-6 flex-row items-center justify-center gap-x-5">
        <View className="flex-row gap-2">
          <LikeIcon width={15} height={18}></LikeIcon>
          <Text className="font-body-md">Like</Text>
        </View>
        <View className="h-10 w-px bg-gray-300" />
        <View className="flex-row gap-2">
          <CommentIcon width={13} height={18}></CommentIcon>
          <Text className="font-body-md">Comment</Text>
        </View>
        {canEdit && (
          <View className="flex-row items-center justify-center gap-x-2">
            <View className="h-10 w-px bg-gray-300" />
            <View className="flex-row gap-2">
              <EditIcon width={13} height={18}></EditIcon>
              <Text className="font-body-md">Edit</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}
