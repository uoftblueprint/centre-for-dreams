import React from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

import Discussion from "~/components/Discussion";
import TabNav from "~/components/TabNav";
import { api } from "~/utils/api";
import Bell from "../../assets/bell.svg";
import RedDot from "../../assets/reddot.svg";

const Forum = () => {
  const forumPosts = api.discussion.getDiscussions.useQuery().data;
  return (
    <SafeAreaView className="bg-p-100 flex-1">
      <ScrollView>
        <Stack.Screen options={{ title: "Forum", headerShown: false }} />

        <View className="mt-10 flex-1 items-center justify-center">
          <Text className=" font-display-sm">Forum</Text>
        </View>
        <View className="ml-4 mr-4 mt-4 flex-1 items-center justify-center">
          <TabNav>
            <TabNav.Tab onPress={() => console.log("Tab 1 pressed")}>
              Feed
            </TabNav.Tab>
            <TabNav.Tab onPress={() => console.log("Tab 2 pressed")}>
              My Posts
            </TabNav.Tab>
            <TabNav.Tab onPress={() => console.log("Tab 3 pressed")}>
              <View className="relative">
                {/* <SvgXml xml={Bell} width={20} height={20} /> */}
                <Bell width={20} height={20}></Bell>
                <View className="absolute left-3.5 top-0 ">
                  <RedDot width={6} height={6} />
                </View>
              </View>
            </TabNav.Tab>
          </TabNav>
        </View>
        <FlatList
          data={forumPosts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View key={item.id} className="mt-2">
              <Discussion discussion={item} canEdit={false} />
            </View>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Forum;
