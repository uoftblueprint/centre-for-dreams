import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
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
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  if (!isSignedIn) {
    throw new Error("Not signed in!");
  }

  // Daily Schedule for today
  const {
    data: dailySchedule,
    isLoading: dailyLoading,
    refetch: refetchDaily,
  } = api.activity.getDailySchedule.useQuery({
    day: new Date().toISOString().split("T")[0] ?? "", // today's date in the format YYYY-MM-DD
  });

  // Weekly Schedule starting from today
  const {
    data: weeklySchedule,
    isLoading: weeklyLoading,
    refetch: refetchWeekly,
  } = api.activity.getSchedule.useQuery({
    day: new Date().toISOString().split("T")[0] ?? "", // today's date
  });

  // Absences
  const { data: absences } = api.absence.getAbsences.useQuery();

  const absentActivityIds = new Set(
    absences?.map((absence) => absence.activityId),
  );

  useEffect(() => {
    if (!dailyLoading && !weeklyLoading) {
      setLoading(false);
    }
  }, [dailyLoading, weeklyLoading]);

  const onRefresh = async () => {
    setIsRefreshing(true);
    try {
      // Refetch data for both views
      await Promise.all([refetchDaily(), refetchWeekly()]);
    } catch (error) {
      console.error("Failed to refresh calendar:", error);
      alert("Error refreshing calendar. Please try again.");
    } finally {
      setIsRefreshing(false);
    }
  };

  // Displaying date (Ex. November 1)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = date.toISOString().split("T")[0] ?? "";
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const [, month, day] = formattedDate.split("-");
    if (month && day) {
      return `${months[parseInt(month, 10) - 1]} ${parseInt(day, 10)}`;
    }
    return "";
  };

  const currentDate = formatDate(new Date().toISOString().split("T")[0] ?? "");

  // Displaying time (Ex. 12:00 AM - 12:10 AM)
  const formatTime = (date: Date) => {
    let hours = date.getUTCHours(); // hours in UTC
    const minutes = date.getUTCMinutes(); // minutes in UTC
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const strMinutes = minutes < 10 ? "0" + minutes : minutes;
    return hours + ":" + strMinutes + " " + ampm;
  };

  const getTimeRange = (startTime: Date, durationMinutes: number) => {
    const start = new Date(startTime);
    const end = new Date(start.getTime() + durationMinutes * 60000);

    const startUTC = new Date(start.toUTCString());
    const endUTC = new Date(end.toUTCString());

    return `${formatTime(startUTC)} - ${formatTime(endUTC)}`;
  };

  // Group activities by day and sort by start time
  interface Activity {
    id: number;
    day: Date;
    startTime: Date;
    durationMinutes: number;
    name: string;
  }

  const groupActivitiesByDay = (activities: Activity[] = []) => {
    const grouped = activities.reduce(
      (acc: Record<string, Activity[]>, activity: Activity) => {
        const date = activity.day.toISOString().split("T")[0] ?? "";
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(activity);
        return acc;
      },
      {} as Record<string, Activity[]>,
    );

    // Sort activities by start time
    Object.keys(grouped).forEach((date) => {
      if (grouped[date]) {
        grouped[date].sort(
          (a, b) =>
            new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
        );
      }
    });

    return grouped;
  };

  const groupedWeeklySchedule = groupActivitiesByDay(
    // first 7 days
    weeklySchedule?.filter((activity) => {
      const activityDate = new Date(activity.day);
      const today = new Date();
      const diffTime = Math.abs(activityDate.getTime() - today.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays < 7;
    }),
  );
  const sortedDays = Object.keys(groupedWeeklySchedule).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime(),
  ); // ascending order

  // Sort daily schedule by start time
  const sortedDailySchedule = dailySchedule
    ?.slice()
    .sort(
      (a, b) =>
        new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
    );

  // cool loading spinner
  if (loading) {
    return (
      <SafeAreaView className="bg-p-100 flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-p-100 flex-1 items-center px-4">
      <Stack.Screen options={{ title: "Calendar", headerShown: false }} />

      {/* logo */}
      <Image source={Logo} className="-mt-10 w-2/5" resizeMode="contain" />
      <View className="-mt-10 w-full">
        <Text className="text-p-0 font-headline-sm">
          Hello {user.firstName}!
        </Text>
      </View>
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

      {tabState === 1 && ( // Week
        <ScrollView
          className="mt-5 w-full"
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
        >
          {sortedDays.length === 0 ? (
            <Text className="text-p-0 font-title-md mt-5">
              No activities this week
            </Text>
          ) : (
            sortedDays.map((day, index) => (
              <View key={index} className="mt-5 w-full">
                <Text className="text-p-0 font-title-md">
                  {formatDate(day)}
                </Text>
                {groupedWeeklySchedule[day]?.map((activity, idx) => (
                  <View key={idx} className="mt-2 w-full flex-row">
                    <View className="w-1/4">
                      <Text className="text-p-0 font-body-sm mr-2 mt-1">
                        {getTimeRange(
                          activity.startTime,
                          activity.durationMinutes,
                        )}
                      </Text>
                    </View>
                    <View className="w-3/4 rounded-lg">
                      <EventTab
                        activity={{
                          name: activity.name,
                          id: activity.id,
                          day: activity.day,
                        }}
                        attending={!absentActivityIds.has(activity.id)}
                      />
                    </View>
                  </View>
                ))}
              </View>
            ))
          )}
          <View className="h-20" />
        </ScrollView>
      )}

      {tabState === 2 && ( // Day
        <ScrollView
          className="mt-5 w-full"
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
        >
          <View className="mt-5 w-full">
            <Text className="text-p-0 font-title-md">{currentDate}</Text>
          </View>
          {sortedDailySchedule?.length === 0 ? (
            <Text className="text-p-0 font-title-md mt-2">
              No activities today
            </Text>
          ) : (
            sortedDailySchedule?.map((activity, index) => (
              <View key={index} className="mt-2 w-full flex-row">
                <View className="w-1/4">
                  <Text className="text-p-0 font-body-sm mr-2 mt-1">
                    {getTimeRange(activity.startTime, activity.durationMinutes)}
                  </Text>
                </View>
                <View className="w-3/4 rounded-lg">
                  <EventTab
                    activity={{
                      name: activity.name,
                      id: activity.id,
                      day: activity.day,
                    }}
                    attending={!absentActivityIds.has(activity.id)}
                  />
                </View>
              </View>
            ))
          )}
          <View className="h-20" />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Calendar;
