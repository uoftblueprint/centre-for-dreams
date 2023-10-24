import React, { useEffect, useRef, useState } from "react";
import { Button, Text, View } from "react-native";
import * as Notifications from "expo-notifications";
import type { Subscription } from "expo-notifications";

import { api } from "~/utils/api";

const NotificationView = ({
  expoPushToken,
}: {
  expoPushToken: Notifications.ExpoPushToken;
}) => {
  const [notification, setNotification] =
    useState<Notifications.Notification | null>(null);
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();
  const pushNotification = api.notification.push.useMutation();

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) =>
        setNotification(notification),
      );

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      notificationListener.current?.remove();
      responseListener.current?.remove();
    };
  }, []);

  return (
    <View>
      <Text>{expoPushToken?.data}</Text>
      <Text>Title: {notification?.request.content.title} </Text>
      <Text>Body: {notification?.request.content.body}</Text>
      <Text>
        Data:{" "}
        {notification && JSON.stringify(notification.request.content.data)}
      </Text>
      <Button
        title="Press to Send Notification"
        onPress={() => {
          pushNotification.mutate({
            pushTokens: [expoPushToken.data],
            title: "Test",
            body: "Hello there",
            subtitle: "Subtitle",
          });
        }}
      />
    </View>
  );
};

export default NotificationView;
