import { Platform } from "react-native";
import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    void Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    if (existingStatus.valueOf() != "granted") {
      await Notifications.requestPermissionsAsync();
    }
    const easConfig = Constants.expoConfig?.extra?.eas as { projectId: string };
    if (easConfig) {
      token = await Notifications.getExpoPushTokenAsync({
        projectId: easConfig.projectId,
      });
    } else {
      console.log("Unable to get projectId from Constants");
    }
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}

export default registerForPushNotificationsAsync;
