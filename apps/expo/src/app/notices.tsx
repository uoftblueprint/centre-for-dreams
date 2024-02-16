import React from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

import AnnouncementCard from "~/components/AnnouncementCard";
import { api } from "~/utils/api";
import Filter from "../../assets/filter.svg";

const Notices = () => {
  // TODO: fix padding issue with NavBar
  const announcements = api.announcement.getAnnouncements.useQuery();
  return (
    <SafeAreaView className="bg-white">
      <Stack.Screen options={{ title: "Notices", headerShown: false }} />

      <View className="px-5 pb-[10%]">
        <View className="flex-row items-center justify-between pb-2 pt-6">
          <View className="w-24px h-24px" />
          <Text className="font-headline-md text-center">Announcement</Text>
          <Filter width={24} height={24} />
        </View>
        <FlatList
          data={announcements.data}
          renderItem={({ item }) => <AnnouncementCard announcement={item} />}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View className="h-4" />}
        />
      </View>
    </SafeAreaView>
  );
};

export default Notices;
