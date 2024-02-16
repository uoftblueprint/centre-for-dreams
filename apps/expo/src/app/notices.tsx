import React from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

import AnnouncementCard from "~/components/AnnouncementCard";
import { api } from "~/utils/api";
import Filter from "../../assets/filter.svg";

const Notices = () => {
  const announcements = api.announcement.getAnnouncements.useQuery();
  return (
    <SafeAreaView className="bg-white">
      <Stack.Screen options={{ title: "Notices", headerShown: false }} />

      <View className="flex-row items-center justify-between px-4 pb-2 pt-6">
        <View className="w-24px h-24px" />
        <Text className="font-poppins500 text-center text-[28px] leading-[128.571%]">
          Announcement
        </Text>
        <Filter width={24} height={24} />
      </View>
      <FlatList
        data={announcements.data}
        renderItem={({ item }) => (
          <View className="px-5">
            <AnnouncementCard announcement={item} />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View className="h-4"></View>}
        // TODO: find other fix
        contentContainerStyle={{ paddingBottom: 60 }}
      />
    </SafeAreaView>
  );
};

export default Notices;
