import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Notifications from "expo-notifications";
import { Redirect, Stack } from "expo-router";
import { useUser } from "@clerk/clerk-expo";

import registerForPushNotificationsAsync from "~/notifications/registerNotifications";
import { api } from "~/utils/api";

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
  const registerToken = api.notification.register.useMutation();
  const { user } = useUser();

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => {
        setExpoPushToken(token ?? null);
        registerToken.mutate({ pushToken: token, userId: user?.id });
      })
      .catch((err) => console.error(err));
  }, [registerToken, user?.id]);

  return (
    <SafeAreaView className="">
      {/* Changes page title visible on the header */}
      <Stack.Screen options={{ title: "Home Page" }} />
      <View className="h-full w-full p-4">
        <Text className="font-poppins400"> Index </Text>
      </View>
      <Redirect href="/signin" />
    </SafeAreaView>
  );
};

export default Index;
