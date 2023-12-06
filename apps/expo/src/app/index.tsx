import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Notifications from "expo-notifications";
import { Stack } from "expo-router";
import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";

import SignInScreen from "~/components/SignInScreen";
import SignInWithOAuth from "~/components/SignInWithOAuth";
import SignUpScreen from "~/components/SignUpScreen";
import registerForPushNotificationsAsync from "~/notifications/registerNotifications";

Notifications.setNotificationHandler({
  handleNotification: () =>
    Promise.resolve({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
});

const SignOut = () => {
  const { isLoaded, signOut } = useAuth();
  if (!isLoaded) {
    return null;
  }
  return (
    <View>
      <Button
        title="Sign Out"
        onPress={async () => {
          await signOut();
        }}
      />
    </View>
  );
};

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
        <Text className="font-poppins"> Index </Text>
        <SignedIn>
          <Text>You are signed in!</Text>
          <SignOut />
        </SignedIn>
        <SignedOut>
          <SignUpScreen />
          <SignInScreen />
          <SignInWithOAuth />
        </SignedOut>
      </View>
    </SafeAreaView>
  );
};

export default Index;
