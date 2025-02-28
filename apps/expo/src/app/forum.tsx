import React, { useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";

import Discussion from "~/components/Discussion";
import FloatingButton from "~/components/FloatingButton";
import ReplyNotification from "~/components/ReplyNotification";
import TabNav from "~/components/TabNav";
import { api } from "~/utils/api";
import Bell from "../../assets/bell.svg";
import RedDot from "../../assets/reddot.svg";

const Forum = () => {
  const [selectedTab, setSelectedTab] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const pageSize = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTab]);

  const { data: forumPosts, refetch: refetchForumPosts } =
    api.discussion.getDiscussions.useQuery({ page: currentPage, pageSize });

  const { data: myPosts, refetch: refetchMyPosts } =
    api.discussion.getDiscussionsByUser.useQuery({
      page: currentPage,
      pageSize,
    });
  const { data: replies, refetch: refetchReplies } =
    api.discussion.getReplies.useQuery();
  const replyLength = replies?.length;

  // Pagination data handling
  const dataToDisplay =
    selectedTab === 1
      ? forumPosts?.posts
      : selectedTab === 2
        ? myPosts?.posts
        : [];

  const totalPages =
    selectedTab === 1
      ? forumPosts?.totalPages
      : selectedTab === 2
        ? myPosts?.totalPages
        : 0;

  const PaginationControls = () => {
    if (!totalPages || totalPages <= 1) return null;

    const getPageNumbers = () => {
      const pages = [];
      const maxVisible = 5;
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, currentPage + 2);

      if (totalPages > maxVisible) {
        if (currentPage <= 3) {
          start = 1;
          end = maxVisible;
        } else if (currentPage >= totalPages - 2) {
          start = totalPages - maxVisible + 1;
          end = totalPages;
        }
      }

      if (start > 1) pages.push(1, "...");
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < totalPages) pages.push("...", totalPages);

      return pages;
    };

    return (
      <View className="my-4 flex-row items-center justify-center">
        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <Text key={index} className="mx-2 text-gray-500">
              ...
            </Text>
          ) : (
            <TouchableOpacity
              key={index}
              className={`mx-1 h-8 w-8 items-center justify-center rounded-full ${
                currentPage === page ? "bg-p-40" : "bg-p-90"
              }`}
              onPress={() => setCurrentPage(Number(page))}
            >
              <Text
                className={`${currentPage === page ? "text-p-99" : "text-p-30"}`}
              >
                {page}
              </Text>
            </TouchableOpacity>
          ),
        )}
      </View>
    );
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    try {
      await Promise.all([
        refetchForumPosts(),
        refetchMyPosts(),
        refetchReplies(),
      ]);
    } catch (error) {
      console.error("Failed to refresh forum:", error);
      alert("Error refreshing forum. Please try again.");
    } finally {
      setIsRefreshing(false);
    }
  };

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
                  <Discussion discussion={item} canEdit={selectedTab === 2} />
                </View>
              )}
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={onRefresh}
                />
              }
              ListFooterComponent={<PaginationControls />}
            />
          </View>
        )}

        {/* Floating Button */}
        <TouchableOpacity
          style={{
            position: "absolute",
            bottom: 100,
            right: 20,
          }}
        >
          <FloatingButton
            onPress={() => router.push("/createpost")}
            icon={true}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Forum;
