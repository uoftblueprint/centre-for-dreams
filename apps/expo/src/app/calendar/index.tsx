import React, { useCallback, useState } from "react";
import { Image, RefreshControl, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { useUser } from "@clerk/clerk-expo";

import EventTab from "~/components/EventTab";
import TabNav from "~/components/TabNav/TabNav";
import { api } from "~/utils/api";
import Logo from "../../../assets/logo.png";

const Calendar = () => {
  const { isSignedIn, user } = useUser();
  const [tabState, setTabState] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  // Data fetching based on the current tab state (week/day overview)
  const { data: events, refetch, isLoading, error } = 
  tabState === 1 
    ? api.activity.getSchedule.useQuery(
        { day: new Date().toISOString().split("T")[0] ?? "" },
        { enabled: !!isSignedIn }
      )
    : api.activity.getDailySchedule.useQuery(
        { day: new Date().toISOString().split("T")[0] ?? "" },
        { enabled: !!isSignedIn }
      );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch(); // Trigger data refetch from the backend
    setRefreshing(false);
  }, [refetch]);

  if (!isSignedIn) {
    throw new Error("Not signed in!");
  }

  return (
    <SafeAreaView className="bg-p-100 flex-1 items-center px-4">
      <Stack.Screen options={{ title: "Calendar", headerShown: false }} />

      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >

        {/* logo */}
        <Image source={Logo} className="-mt-10 w-2/5" resizeMode="contain" />
        <View className="-mt-10 w-full">
          <Text className="text-p-0 font-headline-sm">
            Hello {user.firstName}!
          </Text>
        </View>
        {/* tab navigation */}
        <View className="mx-auto mt-5 h-auto w-full">
          <TabNav currentTab={tabState}>
            <TabNav.Tab
              onPress={() => {
                setTabState(1);
              }}
            >
              <Text className="text-p-0 font-title-md">Week</Text>
            </TabNav.Tab>
            <TabNav.Tab
              onPress={() => {
                setTabState(2);
              }}
            >
              <Text className="font-title-md">Day</Text>
            </TabNav.Tab>
          </TabNav>
        </View>
        {/* events */}
        {isLoading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text>Error loading data. Try again later.</Text>
        ) : events.length === 0 ? (
          <Text>Calendar up to date!</Text>
        ) : (
          events.map((event) => (
            <View key={event.id} className="mt-2 w-full flex-row">
              <Text className="text-p-0 font-body-sm mr-2 mt-1">
                {event.day.toLocaleDateString("en-US", { month: "long", day: "numeric" })}
              </Text>
              <View className="w-4/5 rounded-lg">
                <EventTab activity={{ name: event.name }} attending={event.attending} />
              </View>
            </View>
          ))
        )}

        {/* <View className="mt-5 w-full">
          <Text className="text-p-0 font-title-md">November 1</Text>
        </View>

        <View className="mt-2 w-full flex-row">
          <Text className="text-p-0 font-body-sm mr-2 mt-1">8 AM - 4 PM</Text>

          <View className="w-4/5 rounded-lg">
            <EventTab activity={{ name: "Day Program" }} attending={true} />
          </View>
        </View>

        <View className="mt-2 w-full flex-row">
          <Text className="text-p-0 font-body-sm mr-2 mt-1">7 PM - 8 PM</Text>

          <View className="w-4/5 rounded-lg">
            <EventTab activity={{ name: "Movie Night" }} attending={true} />
          </View>
        </View>

        <View className="mt-5 w-full">
          <Text className="text-p-0 font-title-md">November 2</Text>
        </View>

        <View className="mt-2 w-full flex-row">
          <Text className="text-p-0 font-body-sm mr-2 mt-1">8 AM - 4 PM</Text>

          <View className="w-4/5 rounded-lg">
            <EventTab activity={{ name: "Day Program" }} attending={true} />
          </View>
        </View>

        <View className="mt-2 w-full flex-row">
          <Text className="text-p-0 font-body-sm mr-2 mt-1">5 PM - 7 PM</Text>

          <View className="w-4/5 rounded-lg">
            <EventTab activity={{ name: "Dinner Night" }} attending={true} />
          </View>
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Calendar;
