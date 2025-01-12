import React from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack } from "expo-router";

import AnnouncementCard from "~/components/AnnouncementCard";
import { api } from "~/utils/api";
import Filter from "../../../assets/filter.svg";

const Notices = () => {
  // TODO: fix padding issue with NavBar

  const announcements = api.announcement.getAnnouncements.useQuery();
  return (
    <SafeAreaView className="bg-p-100 h-full pb-[10%]">
      <Stack.Screen options={{ title: "Notices", headerShown: false }} />

      <View className="px-5">
        <View className="flex-row items-center justify-between pb-2 pt-6">
          <View className="w-24px h-24px" />
          <Text className="font-headline-md text-center">Announcement</Text>
          <Filter width={24} height={24} />
        </View>
        <FlatList
          data={announcements.data}
          renderItem={({ item }) => (
            <View>
              <Link
                asChild
                href={{
                  pathname: "/notices/[id]",
                  params: {
                    id: item.id.toString(),
                    title: item.title,
                    createdAt: item.createdAt.toString(),
                    contents: item.contents,
                  },
                }}
              >
                <Pressable>
                  <AnnouncementCard announcement={item} />
                </Pressable>
              </Link>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View className="h-4" />}
          ListFooterComponent={<View className="h-[200px]" />}
        />
      </View>
    </SafeAreaView>
  );
};

export default Notices;
