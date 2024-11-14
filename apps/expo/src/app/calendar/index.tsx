import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { useUser } from "@clerk/clerk-expo";

import EventTab from "~/components/EventTab";
import TabNav from "~/components/TabNav/TabNav";
import Logo from "../../../assets/logo.png";

const Calendar = () => {
  const { isSignedIn, user } = useUser();
  const [tabState, setTabState] = useState(1);

  if (!isSignedIn) {
    throw new Error("Not signed in!");
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

      <View className="mt-5 w-full">
        <Text className="text-p-0 font-title-md">November 1</Text>
      </View>

      <View className="mt-2 w-full flex-row">
        <Text className="text-p-0 font-body-sm mr-2 mt-1">8 AM - 4 PM</Text>

        <View className="w-4/5 rounded-lg">
          <EventTab
            activity={{ name: "Day Program", id: 1 }}
            attending={true}
          />
        </View>
      </View>

      <View className="mt-2 w-full flex-row">
        <Text className="text-p-0 font-body-sm mr-2 mt-1">7 PM - 8 PM</Text>

        <View className="w-4/5 rounded-lg">
          <EventTab
            activity={{ name: "Movie Night", id: 2 }}
            attending={true}
          />
        </View>
      </View>

      <View className="mt-5 w-full">
        <Text className="text-p-0 font-title-md">November 2</Text>
      </View>

      <View className="mt-2 w-full flex-row">
        <Text className="text-p-0 font-body-sm mr-2 mt-1">8 AM - 4 PM</Text>

        <View className="w-4/5 rounded-lg">
          <EventTab
            activity={{ name: "Day Program", id: 3 }}
            attending={true}
          />
        </View>
      </View>

      <View className="mt-2 w-full flex-row">
        <Text className="text-p-0 font-body-sm mr-2 mt-1">5 PM - 7 PM</Text>

        <View className="w-4/5 rounded-lg">
          <EventTab
            activity={{ name: "Dinner Night", id: 4 }}
            attending={true}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Calendar;
