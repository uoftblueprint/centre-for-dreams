import React from "react";
import { Image, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack } from "expo-router";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";

import FilledButton from "~/components/FilledButtons";
import { api } from "~/utils/api";

interface ProfileCardProps {
  email: string | undefined | null;
  phone: string | undefined | null;
  firstName: string | undefined | null;
  lastName: string | undefined | null;
  profilePictureUri: string | undefined | null;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  email,
  phone,
  firstName,
  lastName,
  profilePictureUri,
}) => {
  const { signOut } = useAuth();
  return (
    <View className="rounded-lg bg-slate-200 p-4">
      <View className="flex items-center  p-2">
        <Image
          className="rounded-full"
          style={{ width: 80, height: 80 }}
          source={{
            uri: profilePictureUri ?? "",
          }}
        />
      </View>
      <View className="flex space-y-1  p-4">
        <Text className="text-center text-3xl font-medium">{`${firstName ?? "First"} ${lastName ?? "Last"}`}</Text>
        <Text className="text-md text-center">{`Tel: ${phone ?? ""}`}</Text>
        <Text className="text-md text-center">{`Email: ${email ?? ""}`}</Text>
      </View>
      <FilledButton onClick={() => signOut()}>Sign Out</FilledButton>
    </View>
  );
};

interface NotificationContainerProps {
  notificationType: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}
const NotificationContainer: React.FC<NotificationContainerProps> = ({
  notificationType,
  value,
  onValueChange,
}) => {
  return (
    <View className="flex-row justify-between py-3">
      <Text className=" text-xl font-medium">{notificationType}</Text>
      <View>
        <Switch value={value} onValueChange={onValueChange} />
      </View>
    </View>
  );
};

const Account = () => {
  const { isSignedIn, user } = useUser();
  const queryClient = useQueryClient();
  const { data: currentNotificationSettings } =
    api.user.getNotificationSettings.useQuery();

  const updateNotifications = api.user.updateNotificationSettings.useMutation({
    onMutate: async (newSettings) => {
      const queryKey = getQueryKey(
        api.user.getNotificationSettings,
        undefined,
        "query",
      );

      await queryClient.cancelQueries({
        queryKey,
      });

      const previousSettings = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, newSettings);

      return { previousSettings, newSettings };
    },
    onError: (err, newSettings, context) => {
      queryClient.setQueryData(
        getQueryKey(api.user.getNotificationSettings, undefined, "query"),
        context?.previousSettings,
      );
    },
    onSettled: async () => {
      return await queryClient.invalidateQueries({
        queryKey: getQueryKey(api.user.getNotificationSettings),
      });
    },
  });

  // Realistically this should never happen, since the user should never end up on this screen
  if (!isSignedIn) {
    throw new Error("Not signed in!");
  }

  const handleNotificationUpdate = (
    notificationType:
      | "notificationOnAnnoucements"
      | "notificationOnPostComments"
      | "notificationOnPostLikes"
      | "notificationOnScheduleUpdates",
  ) => {
    updateNotifications.mutate({
      [notificationType]: !currentNotificationSettings?.[notificationType],
    });
  };
  return (
    <SafeAreaView className="bg-p-100 flex-1">
      <Stack.Screen options={{ title: "Account", headerShown: false }} />
      <View className="px-4 pb-6 pt-10">
        <Text className="w-full text-center text-3xl font-medium">Account</Text>
        <Link href="/createpost">Create post</Link>
      </View>
      <View className="p-4">
        <ProfileCard
          email={user.primaryEmailAddress?.emailAddress}
          firstName={user.firstName}
          lastName={user.lastName}
          phone={user.primaryPhoneNumber?.phoneNumber}
          profilePictureUri={user.imageUrl}
        />
      </View>
      <View className="p-4 pb-0">
        <Text className="text-2xl font-medium">Push Notifications</Text>
        <View className="py-4">
          <NotificationContainer
            notificationType={"Annoucements"}
            value={
              currentNotificationSettings?.notificationOnAnnoucements ?? false
            }
            onValueChange={() =>
              handleNotificationUpdate("notificationOnAnnoucements")
            }
          />
          <NotificationContainer
            notificationType={"Comments on Posts"}
            value={
              currentNotificationSettings?.notificationOnPostComments ?? false
            }
            onValueChange={() =>
              handleNotificationUpdate("notificationOnPostComments")
            }
          />
          <NotificationContainer
            notificationType={"Likes on Posts"}
            value={
              currentNotificationSettings?.notificationOnPostLikes ?? false
            }
            onValueChange={() =>
              handleNotificationUpdate("notificationOnPostLikes")
            }
          />
          <NotificationContainer
            notificationType={"Schedule Updates"}
            value={
              currentNotificationSettings?.notificationOnScheduleUpdates ??
              false
            }
            onValueChange={() =>
              handleNotificationUpdate("notificationOnScheduleUpdates")
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Account;
