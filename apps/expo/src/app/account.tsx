import React from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

import SignOut from "~/components/SignOut";

const Account = () => {
  return (
    <SafeAreaView className="flex">
      <Stack.Screen options={{ title: "Account", headerShown: false }} />
      <View className="bg-red-400 p-4">
        <Text>Account</Text>
      </View>
      <View className=" bg-blue-400 p-4">
        <View className="rounded-md bg-purple-400 p-2">
          <View className="bg-slate-400 object-cover p-2">
            <Image
              style={{ width: 50, height: 50 }}
              source={{
                uri: "https://www.opensesame.com/wp-content/uploads/2018/12/Tencent-QQ-logo.png",
              }}
            />
          </View>
          <Text>Profile</Text>
        </View>
      </View>
      <View className="bg-green-400 p-4">
        <Text>Push Notifications</Text>
      </View>
    </SafeAreaView>
  );
};

export default Account;
