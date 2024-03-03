import React, { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

import type { RouterOutputs } from "~/utils/api";
import { formatTime } from "~/utils/dateformatter";
import CommentIcon from "../../assets/comment.svg";
import EditIcon from "../../assets/edit.svg";
import LikeIcon from "../../assets/like.svg";
import Comment from "./Comment";

type DiscussionProps = RouterOutputs["discussion"]["getDiscussions"][number];

interface RenderItemProps {
  item: RouterOutputs["discussion"]["getDiscussions"][number]["comments"][number];
  index: number;
  totalComments: number;
};

export default function Discussion({
  discussion,
  canEdit,
}: {
  discussion: DiscussionProps;
  canEdit: boolean;
}) {
  const [showMoreComments, setShowMoreComments] = useState(false);

  const handleViewMore = () => {
    setShowMoreComments(true);
  };

  const handleViewLess = () => {
    setShowMoreComments(false);
  };

  const renderItem = ({ item, index, totalComments }: RenderItemProps) => (
    <View key={item.id} style={{ marginTop: 2 }}>
      {/* Display the first comment */}
      {index === 0 && <Comment comment={item}></Comment>}
      {/* Display "View More" button after the first comment */}
      {index === 0 && discussion.comments.length > 1 && !showMoreComments && (
        <TouchableOpacity onPress={handleViewMore}>
          <Text className=" color-t-0 ml-3 underline">
            {"View all " + totalComments.toString() + " comments"}
          </Text>
        </TouchableOpacity>
      )}
      {/* Display additional comments if showMoreComments is true */}
      {index !== 0 && showMoreComments && <Comment comment={item}></Comment>}
    </View>
  );

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
      {canEdit && (
        <View className="mt-2 flex-row items-center justify-center p-2">
          <View className="w-1/3 flex-row justify-center">
            <LikeIcon width={15} height={18}></LikeIcon>
            <Text className="font-body-md ml-2">Like</Text>
          </View>
          <View className="h-10 w-px bg-gray-300" />
          <View className="w-5/12 flex-row justify-center">
            <CommentIcon width={13} height={18}></CommentIcon>
            <Text className="font-body-md ml-2">Comment</Text>
          </View>
          <View className="h-10 w-px bg-gray-300" />
          <View className="w-1/3 flex-row justify-center">
            <EditIcon width={13} height={18}></EditIcon>
            <Text className="font-body-md ml-2">Edit</Text>
          </View>
        </View>
      )}
      {!canEdit && (
        <View className="mt-2 flex-row items-center justify-center p-2">
          <View className="w-1/2 flex-row justify-center">
            <LikeIcon width={15} height={18}></LikeIcon>
            <Text className="font-body-md ml-2">Like</Text>
          </View>
          <View className="h-10 w-px bg-gray-300" />
          <View className="w-1/2 flex-row justify-center">
            <CommentIcon width={13} height={18}></CommentIcon>
            <Text className="font-body-md ml-2">Comment</Text>
          </View>
        </View>
      )}
      <FlatList
        data={discussion.comments?.slice().reverse()}
        renderItem={({ item, index }) =>
          renderItem({ item, index, totalComments: discussion.comments.length })
        }
        keyExtractor={(item) => item.id.toString()}
      />
      {/* Display "View Less" button if "View More" was pressed */}
      {showMoreComments && (
        <TouchableOpacity onPress={handleViewLess}>
          <Text className="color-t-0 ml-3 mt-10 underline">View Less</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
