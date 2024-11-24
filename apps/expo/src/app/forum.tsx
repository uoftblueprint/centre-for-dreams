import React, { useState } from "react";
import { FlatList, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";

import Discussion from "~/components/Discussion";
import ReplyNotification from "~/components/ReplyNotification";
import TabNav from "~/components/TabNav";
import { api } from "~/utils/api";
import Bell from "../../assets/bell.svg";
import RedDot from "../../assets/reddot.svg";
import FloatingButton from "../../assets/floating-button-icon.svg";

const Forum = () => {
  const [selectedTab, setSelectedTab] = useState(1);
  const router = useRouter();
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

  return (
    <SafeAreaView className="flex-1">
      <Stack.Screen options={{ title: "Forum", headerShown: false }} />
      <View style={{ flex: 1, position: "relative" }}>
        {selectedTab === 3 ? (
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
        ) : (
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
        )}

        {/* Floating Button */}
        <TouchableOpacity
          style={{
            position: "absolute",
            bottom: 100,
            right: 20,
            backgroundColor: "#007BFF",
            borderRadius: 50,
            width: 56,
            height: 56,
            justifyContent: "center",
            alignItems: "center",
            elevation: 5,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 3,
          }}
          onPress={() => router.push("/forum")}
        >
          <FloatingButton width={24} height={24} fill="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

//   if (selectedTab == 3) {
//     return (
//       <SafeAreaView className="">
//         <Stack.Screen options={{ title: "Forum", headerShown: false }} />
        
//       </SafeAreaView>
//     );
//   } else {
//     return (
//       <SafeAreaView className="">
//         <Stack.Screen options={{ title: "Forum", headerShown: false }} />
        
//         {/* Floating Button */}
//         <TouchableOpacity
//           style={{
//             position: "absolute",
//             bottom: 20,
//             right: 20,
//             backgroundColor: "#6200EE",
//             borderRadius: 50,
//             width: 56,
//             height: 56,
//             justifyContent: "center",
//             alignItems: "center",
//             elevation: 5,
//             shadowColor: "#000",
//             shadowOffset: { width: 0, height: 2 },
//             shadowOpacity: 0.3,
//             shadowRadius: 3,
//           }}
//           onPress={() => router.push("/forum")}
//         >
//           <FloatingButton width={24} height={24} fill="#fff" />
//         </TouchableOpacity>
//       </SafeAreaView>
//     );
//   }
// };

export default Forum;
