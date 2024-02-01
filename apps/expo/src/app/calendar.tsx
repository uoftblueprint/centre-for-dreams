import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

const Calendar = () => {
  return (
    <SafeAreaView className="">
      <Stack.Screen options={{ title: "Calendar", headerShown: false }} />
      <Text>Calendar</Text>
    </SafeAreaView>
  );
};

export default Calendar;
