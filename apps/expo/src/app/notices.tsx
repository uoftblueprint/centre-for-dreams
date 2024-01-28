import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

const Notices = () => {
  return (
    <SafeAreaView className="">
      <Stack.Screen options={{ title: "Notices", headerShown: false }} />
      <Text>Notices</Text>
    </SafeAreaView>
  );
};

export default Notices;
