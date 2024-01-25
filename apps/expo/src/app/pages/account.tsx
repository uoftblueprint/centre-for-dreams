import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

const Account = () => {
  return (
    <SafeAreaView className="">
      <Stack.Screen options={{ title: "Account", headerShown: false }} />
      <Text>Account</Text>
    </SafeAreaView>
  );
};

export default Account;
