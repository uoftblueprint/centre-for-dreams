import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

import SignOut from "~/components/SignOut";

const Account = () => {
  return (
    <SafeAreaView className="">
      <Stack.Screen options={{ title: "Account", headerShown: false }} />
      <Text>Account</Text>
      <SignOut />
    </SafeAreaView>
  );
};

export default Account;
