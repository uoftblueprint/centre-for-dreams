import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

import Discussion from "~/components/Discussion";
import TabNav from "~/components/TabNav";
import { api } from "~/utils/api";

// const date = Date.now();

// const data = {
//   id: 0,
//   title: "new title",
//   contents: "this is a very cool post",
//   createdAt: new Date(date),
//   postType: 0,
//   userId: 0,
// };

// const posts = [data, data, data];

const Forum = () => {
  const forumPosts = api.discussion.getDiscussions.useQuery().data;
  return (
    <SafeAreaView className="">
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
              ?
            </TabNav.Tab>
          </TabNav>
        </View>
        <View className="mb-16">
          {forumPosts?.map((data) => (
            <View key={data.id} className="mt-2">
              <Discussion discussion={data} canEdit={false} />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Forum;
