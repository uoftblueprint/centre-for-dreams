import React from "react";
import type { ImageSourcePropType } from "react-native";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, Stack, useLocalSearchParams } from "expo-router";

import Comment from "~/components/Comment";
import type { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";
import { formatTime } from "~/utils/dateformatter";
import ArrowLeft from "../../../assets/arrow-left.svg";
import Bookmark from "../../../assets/bookmark-alt.svg";
import CommentCloud from "../../../assets/comment-cloud.svg";
import TickMark from "../../../assets/tick.svg";

type Comment = RouterOutputs["comment"]["create"];

function AnnouncementPage() {
  const postID = parseInt(useLocalSearchParams().id as string);
  const announcement = api.announcement.getAnnouncementByID.useQuery(postID);

  // TODO: replace with actual info once endpoint is updated
  const createdBy = "Kelly Smith";
  const titleImageSrc: ImageSourcePropType = {
    uri: "https://i.ibb.co/cb3rY4R/Event-Picture.jpg",
  };
  const posterProfilePic: ImageSourcePropType = {
    uri: "https://i.ibb.co/Sv1qfd7/kelly-profile-pic.jpg",
  };
  const readCount = 3;

  return (
    <SafeAreaView className="h-full bg-white pb-[75px]">
      <Stack.Screen options={{ title: "notices/[id]", headerShown: false }} />
      <ScrollView>
        <View className="flex-row items-center justify-between px-5 pb-2 pt-6">
          <Pressable onPress={router.back}>
            <ArrowLeft width={24} height={24} />
          </Pressable>
          <Text className="font-headline-md text-center">Announcement</Text>
          <Bookmark width={24} height={24} />
        </View>

        <View className="bg-p-99 px-4 py-4">
          <Text className="font-headline-sm leading-8">
            {announcement.data?.title}
          </Text>
        </View>

        <View className="flex flex-row gap-3 px-4 py-3">
          <View>
            <Image
              source={posterProfilePic}
              accessibilityLabel={`Poster's profile pic`}
              className="h-14 w-14 rounded-full"
              resizeMode="contain"
            />
          </View>
          <View>
            <Text className="font-headline-sm leading-8">{createdBy}</Text>
            <Text className="font-body-lg">
              {announcement.data ? formatTime(announcement.data.createdAt) : ""}
            </Text>
          </View>
        </View>

        <View>
          <Text className="font-body-lg px-4">
            {announcement.data?.contents}
          </Text>
        </View>

        <View>
          <Image
            source={titleImageSrc}
            accessibilityLabel={`Announcement title image`}
            className="h-72 w-full"
            resizeMode="contain"
          />
        </View>

        <View className="my-3 flex h-8 flex-row items-center gap-3 px-3">
          <View className="flex flex-row items-center gap-0.5">
            <CommentCloud className="h-[12px] w-[13px]" />
            <Text className="font-body-md">
              {announcement.data?.comments.length}
            </Text>
          </View>
          <View className="flex flex-row items-center gap-0.5">
            <TickMark className="h-[9.8px] w-[9-px]" />
            <Text className="font-body-md">{readCount}</Text>
          </View>
        </View>

        <View className="bg-p-99 flex flex-row">
          <TouchableOpacity
            onPress={() => null}
            className="flex-1 justify-center py-[18px]"
          >
            <View className="flex flex-row items-center justify-center gap-2">
              <CommentCloud />
              <Text className="font-body-md">Reply</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => null}
            className="flex-1 justify-center py-[18px]"
          >
            <View className="flex flex-row items-center justify-center gap-2">
              <TickMark />
              <Text className="font-body-md">Read</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View className="h-100 w-full" />

        {announcement.data?.comments.map((c) => (
          <View key={c.id} className="px-4 py-5">
            <Comment comment={c} />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default AnnouncementPage;
