import React from "react";
import { Image, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

import FilledButton from "~/components/FilledButtons";
import { api } from "~/utils/api";

interface ProfileCardProps {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  email,
  phone,
  firstName,
  lastName,
}) => {
  return (
    <View className="rounded-lg bg-slate-200 p-4">
      <View className="flex items-center  p-2">
        <Image
          className="rounded-full"
          style={{ width: 80, height: 80 }}
          source={{
            uri: "https://lp-cms-production.imgix.net/2020-11/500pxRF_15179369.jpg?auto=format&w=1440&h=810&fit=crop&q=75",
          }}
        />
      </View>
      <View className="flex space-y-1  p-4">
        <Text className="text-center text-3xl font-medium">{`${firstName} ${lastName}`}</Text>
        <Text className="text-md text-center">{`Tel: ${phone}`}</Text>
        <Text className="text-md text-center">{`Email: ${email}`}</Text>
      </View>
      <FilledButton onClick={() => null}>Edit Profile</FilledButton>
    </View>
  );
};

enum NotificationType {
  ANNOUCEMENTS = "Annoucements",
  SCHEDULE_UPDATES = "Schedule updates",
  LIKE_ON_POSTS = "Likes on posts",
  COMMENTS_ON_POSTS = "Comments on posts",
}

interface NotificationContainerProps {
  notificationType: NotificationType;
}
const NotificationContainer: React.FC<NotificationContainerProps> = ({
  notificationType,
}) => {
  return (
    <View className="flex-row justify-between py-3">
      <Text className=" text-xl font-medium">{notificationType}</Text>
      <View>
        <Switch />
      </View>
    </View>
  );
};

const Account = () => {
  const { isSignedIn, sessionId, userId } = useAuth();

  if (!isSignedIn) {
    return;
  }

  const clerkUser = api.user.findClerkUserById.useQuery({
    userClerkId: userId,
  });

  console.log(userId);
  console.log(clerkUser);

  return (
    <SafeAreaView className="flex">
      <Stack.Screen options={{ title: "Account", headerShown: false }} />
      <View className="px-4 pb-6 pt-10">
        <Text className="w-full text-center text-3xl font-medium">Account</Text>
      </View>
      <View className="p-4">
        <ProfileCard
          email={clerkUser.data?.primaryEmailAddressId ?? ""}
          firstName={clerkUser.data?.firstName ?? ""}
          lastName={clerkUser.data?.lastName ?? ""}
          phone={clerkUser.data?.primaryPhoneNumberId ?? ""}
        />
      </View>
      <View className="p-4 pb-0">
        <Text className="text-2xl font-medium">Push Notifications</Text>
        <View className="py-4">
          <NotificationContainer
            notificationType={NotificationType.ANNOUCEMENTS}
          />
          <NotificationContainer
            notificationType={NotificationType.SCHEDULE_UPDATES}
          />
          <NotificationContainer
            notificationType={NotificationType.LIKE_ON_POSTS}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Account;
