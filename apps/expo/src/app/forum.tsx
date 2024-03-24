import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

import Discussion from "~/components/Discussion";
import TabNav from "~/components/TabNav";
import { api } from "~/utils/api";
import Bell from "../../assets/bell.svg";
import RedDot from "../../assets/reddot.svg";

const Forum = () => {
  const [selectedTab, setSelectedTab] = useState(1);
  const forumPosts = api.discussion.getDiscussions.useQuery().data;
  const myPosts = api.discussion.getDiscussionsByUser.useQuery().data;

  const dataToDisplay =
    selectedTab === 1 ? forumPosts : selectedTab === 2 ? myPosts : [];

  const renderHeader = () => (
    <View>
      <View className="mt-10 items-center justify-center">
        <Text className="font-display-sm">Forum</Text>
      </View>
      <View className="ml-4 mr-4 mt-4 flex-1 items-center justify-center">
        <TabNav currentTab={selectedTab}>
          <TabNav.Tab
            onPress={() => {
              setSelectedTab(1);
            }}
          >
            Feed
          </TabNav.Tab>
          <TabNav.Tab
            onPress={() => {
              setSelectedTab(2);
            }}
          >
            My Posts
          </TabNav.Tab>
          <TabNav.Tab
            onPress={() => {
              setSelectedTab(3);
            }}
          >
            <View className="relative">
              <Bell width={20} height={20}></Bell>
              <View className="absolute left-3.5 top-0 ">
                <RedDot width={6} height={6} />
              </View>
            </View>
          </TabNav.Tab>
        </TabNav>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="">
      <Stack.Screen options={{ title: "Forum", headerShown: false }} />
      <View className="mb-16">
        <FlatList
          ListHeaderComponent={renderHeader}
          data={dataToDisplay}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View className="mt-2">
              <Discussion discussion={item} canEdit={false} />
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Forum;
