import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Notifications from "expo-notifications";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

import registerForPushNotificationsAsync from "~/notifications/registerNotifications";
import SplashImage from "../../assets/landing_page.svg";

void SplashScreen.preventAutoHideAsync();

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
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        // Register for push notifications
        await registerForPushNotificationsAsync()
          .then((token) => setExpoPushToken(token ?? null))
          .catch((err) => console.error(err));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    };

    void prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Stack.Screen options={{ title: "Home Page" }} />

      <View style={styles.container}>
        <SplashImage style={styles.splashImage} />
        <Text> Index </Text>
      </View>

      <View className="h-full w-full p-4">
        <Text className="font-poppins400"> Index </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  splashImage: {
    width: 500,
    height: 700,
  },
});

export default Index;
