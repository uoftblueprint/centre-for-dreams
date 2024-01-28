import * as Notifications from "expo-notifications";

import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import SignIn from "./signin";
import { Stack } from "expo-router";
import registerForPushNotificationsAsync from "~/notifications/registerNotifications";

Notifications.setNotificationHandler({
  handleNotification: () =>
    Promise.resolve({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
});

const Index = () => {
  const [, setExpoPushToken] = useState<Notifications.ExpoPushToken | null>(
    null,
  );

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => setExpoPushToken(token ?? null))
      .catch((err) => console.error(err));
  }, []);

  return (
    <SafeAreaView className="">
      {/* Changes page title visible on the header */}
      <Stack.Screen options={{ title: "Home Page" }} />
      <View className="h-full w-full p-4">
        <Text className="font-poppins400"> Index </Text>
        <SignIn />
      </View>
    </SafeAreaView>
  );
};

export default Index;
