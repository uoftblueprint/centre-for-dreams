import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

const Forum = () => {
  return (
    <SafeAreaView className="">
      <Stack.Screen options={{ title: "Forum", headerShown: false }} />
      <Text>Forum</Text>
    </SafeAreaView>
  );
};

export default Forum;
