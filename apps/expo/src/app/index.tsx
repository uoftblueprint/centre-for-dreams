import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Notifications from "expo-notifications";
import { Stack } from "expo-router";
import registerForPushNotificationsAsync from "~/notifications/registerNotifications";
import { Text, View } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: () =>
    Promise.resolve({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
});

// const imageUrl = 'https://static.wikia.nocookie.net/acc-official-database/images/9/91/El_gato.jpg/revision/latest?cb=20220709001857';
// const imageSourceProp: ImageSourcePropType = { uri: imageUrl };

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
        <Text> Index</Text>
      </View>
      {/* <Announcement title="hell0" author='hi' date="Nov 15" summary="helooo" profile_picture={imageSourceProp} post_media={imageSourceProp}></Announcement> */}
    </SafeAreaView>
  );
};

export default Index;
