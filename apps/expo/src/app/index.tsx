import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Notifications from "expo-notifications";
import { Stack } from "expo-router";

import registerForPushNotificationsAsync from "~/notifications/registerNotifications";

// const imageUrl = 'https://static.wikia.nocookie.net/acc-official-database/images/9/91/El_gato.jpg/revision/latest?cb=20220709001857';
// const imageSourceProp: ImageSourcePropType = { uri: imageUrl };

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
        <Text> Index </Text>
      </View>
      {/* <Comment user="Sarina" user_pic={imageSourceProp} time_elapsed="10h" comment_body="thank you so much for merging my PR so quickly i love my PLs and they are awesome #ilovebakerandganesh"></Comment> */}
    </SafeAreaView>
  );
};

export default Index;
