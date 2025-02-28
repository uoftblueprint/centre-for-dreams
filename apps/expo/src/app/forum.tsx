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
import { MaterialIcons } from "@expo/vector-icons";

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
  const [isRefreshing, setIsRefreshing] = useState(false);
  const pageSize = 10;
  const router = useRouter();

  // Reset pagination when tab changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTab]);

  // Paginated queries
  const { data: forumData, refetch: refetchForum } =
    api.discussion.getDiscussions.useQuery({
      page: currentPage,
      pageSize,
    });

  const { data: myPostsData, refetch: refetchMyPosts } =
    api.discussion.getDiscussionsByUser.useQuery({
      page: currentPage,
      pageSize,
    });

  const { data: replies, refetch: refetchReplies } =
    api.discussion.getReplies.useQuery();

  // Current data based on tab selection
  const currentData =
    selectedTab === 1 ? forumData : selectedTab === 2 ? myPostsData : null;

  const totalPages = currentData?.totalPages || 0;
  const posts = currentData?.posts || [];

  const PaginationControls = () => {
    if (totalPages <= 1) return null;

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
        <TouchableOpacity
          onPress={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          <MaterialIcons
            name="chevron-left"
            size={24}
            color={currentPage === 1 ? "#ccc" : "#000"}
          />
        </TouchableOpacity>

        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <Text key={`ellipsis-${index}`} className="mx-2">
              ...
            </Text>
          ) : (
            <TouchableOpacity
              key={page}
              className={`mx-1 h-8 w-8 items-center justify-center rounded-full 
                ${currentPage === page ? "bg-blue-500" : "bg-gray-200"}`}
              onPress={() => setCurrentPage(Number(page))}
            >
              <Text
                className={`${currentPage === page ? "text-white" : "text-gray-700"}`}
              >
                {page}
              </Text>
            </TouchableOpacity>
          ),
        )}

        <TouchableOpacity
          onPress={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          <MaterialIcons
            name="chevron-right"
            size={24}
            color={currentPage === totalPages ? "#ccc" : "#000"}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await Promise.all([refetchForum(), refetchMyPosts(), refetchReplies()]);
    } catch (error) {
      console.error("Refresh failed:", error);
      alert("Refresh failed. Please try again.");
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
          <TabNav.Tab onPress={() => setSelectedTab(1)}>Feed</TabNav.Tab>
          <TabNav.Tab onPress={() => setSelectedTab(2)}>My Posts</TabNav.Tab>
          <TabNav.Tab onPress={() => setSelectedTab(3)}>
            <View className="relative">
              <Bell width={20} height={20} />
              <View className="absolute left-3.5 top-0">
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
              renderItem={({ item, index }) => (
                <View
                  className={`bg-p-90 ml-3 mr-3 p-4 ${
                    index === 0
                      ? "mt-2 rounded-tl-md rounded-tr-md"
                      : index === (replies?.length || 0) - 1
                        ? "rounded-bl-lg rounded-br-lg"
                        : ""
                  }`}
                >
                  {index === 0 && (
                    <Text className="font-headline-md pb-3">
                      New Notifications
                    </Text>
                  )}
                  <ReplyNotification comment={item} />
                </View>
              )}
            />
          </View>
        ) : (
          <View className="h-vh mb-16">
            <FlatList
              ListHeaderComponent={renderHeader}
              data={posts}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View className="mt-2">
                  <Discussion discussion={item} canEdit={selectedTab === 2} />
                </View>
              )}
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={handleRefresh}
                />
              }
              ListFooterComponent={<PaginationControls />}
            />
          </View>
        )}

        <TouchableOpacity
          style={{ position: "absolute", bottom: 100, right: 20 }}
          onPress={() => router.push("/createpost")}
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
