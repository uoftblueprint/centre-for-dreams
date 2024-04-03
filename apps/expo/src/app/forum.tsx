import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

import Discussion from "~/components/Discussion";
import ReplyNotification from "~/components/ReplyNotification";
import TabNav from "~/components/TabNav";
import { api } from "~/utils/api";
import Bell from "../../assets/bell.svg";
import RedDot from "../../assets/reddot.svg";

const Forum = () => {
  const [selectedTab, setSelectedTab] = useState(1);
  const forumPosts = api.discussion.getDiscussions.useQuery().data;
  const myPosts = api.discussion.getDiscussionsByUser.useQuery().data;
  const replies = api.discussion.getReplies.useQuery().data;
  const replyLength = replies?.length;

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

  if (selectedTab == 3) {
    return (
      <SafeAreaView className="">
        <Stack.Screen options={{ title: "Forum", headerShown: false }} />
        <View className="mb-16 h-full">
          <FlatList
            ListHeaderComponent={renderHeader}
            data={replies}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => {
              if (index == 0) {
                return (
                  <View className="bg-p-90 ml-3 mr-3 mt-2 rounded-tl-md rounded-tr-md p-4">
                    <Text className="font-headline-md pb-3">
                      New Notifications
                    </Text>
                    <ReplyNotification comment={item}></ReplyNotification>
                  </View>
                );
              } else if (index == replyLength! - 1) {
                return (
                  <View className="bg-p-90 ml-3 mr-3 rounded-bl-lg rounded-br-lg p-4">
                    <ReplyNotification comment={item}></ReplyNotification>
                  </View>
                );
              } else {
                return (
                  <View className="bg-p-90 ml-3 mr-3 p-4">
                    <ReplyNotification comment={item}></ReplyNotification>
                  </View>
                );
              }
            }}
          />
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView className="">
        <Stack.Screen options={{ title: "Forum", headerShown: false }} />
        <View className="h-vh mb-16">
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
  }
};

export default Forum;
