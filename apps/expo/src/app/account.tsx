import React, { useState } from "react";
import { Image, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { useAuth, useUser } from "@clerk/clerk-expo";

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

enum NotificationType {
  ANNOUCEMENTS = "Annoucements",
  SCHEDULE_UPDATES = "Schedule updates",
  LIKE_ON_POSTS = "Likes on posts",
  COMMENTS_ON_POSTS = "Comments on posts",
}

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

  const notificationSettings = api.user.getNotificationSettings.useQuery().data;
  const updateNotifications = api.user.updateNotificationSettings.useMutation();

  const [notificationOnAnnoucements, setNotificationOnAnnoucements] = useState(
    notificationSettings?.notificationOnAnnoucements ?? false,
  );
  const [notificationOnPostComments, setNotificationOnPostComments] = useState(
    notificationSettings?.notificationOnPostComments ?? false,
  );
  const [notificationOnPostLikes, setNotificationOnPostLikes] = useState(
    notificationSettings?.notificationOnPostLikes ?? false,
  );
  const [notificationOnScheduleUpdates, setNotificationOnScheduleUpdates] =
    useState(notificationSettings?.notificationOnScheduleUpdates ?? false);

  // Realistically this should never happen, since the user should never end up on this screen
  if (!isSignedIn) {
    throw new Error("Not signed in!");
  }

  const handleNotificationUpdate = (notificationType: NotificationType) => {
    const pendingNotificationUpdates = {
      [NotificationType.ANNOUCEMENTS]: notificationOnAnnoucements,
      [NotificationType.COMMENTS_ON_POSTS]: notificationOnPostComments,
      [NotificationType.LIKE_ON_POSTS]: notificationOnPostLikes,
      [NotificationType.SCHEDULE_UPDATES]: notificationOnScheduleUpdates,
    };

    pendingNotificationUpdates[notificationType] =
      !pendingNotificationUpdates[notificationType];

    updateNotifications.mutate({
      notificationOnAnnoucements:
        pendingNotificationUpdates[NotificationType.ANNOUCEMENTS],
      notificationOnPostComments:
        pendingNotificationUpdates[NotificationType.COMMENTS_ON_POSTS],
      notificationOnPostLikes:
        pendingNotificationUpdates[NotificationType.LIKE_ON_POSTS],
      notificationOnScheduleUpdates:
        pendingNotificationUpdates[NotificationType.SCHEDULE_UPDATES],
    });
    setNotificationOnAnnoucements(
      pendingNotificationUpdates[NotificationType.ANNOUCEMENTS],
    );
    setNotificationOnPostComments(
      pendingNotificationUpdates[NotificationType.COMMENTS_ON_POSTS],
    );
    setNotificationOnPostLikes(
      pendingNotificationUpdates[NotificationType.LIKE_ON_POSTS],
    );
    setNotificationOnScheduleUpdates(
      pendingNotificationUpdates[NotificationType.SCHEDULE_UPDATES],
    );
  };
  return (
    <SafeAreaView className="bg-p-100 flex-1">
      <Stack.Screen options={{ title: "Account", headerShown: false }} />
      <View className="px-4 pb-6 pt-10">
        <Text className="w-full text-center text-3xl font-medium">Account</Text>
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
            notificationType={NotificationType.ANNOUCEMENTS}
            value={notificationOnAnnoucements}
            onValueChange={() =>
              handleNotificationUpdate(NotificationType.ANNOUCEMENTS)
            }
          />
          <NotificationContainer
            notificationType={NotificationType.SCHEDULE_UPDATES}
            value={notificationOnScheduleUpdates}
            onValueChange={() =>
              handleNotificationUpdate(NotificationType.SCHEDULE_UPDATES)
            }
          />
          <NotificationContainer
            notificationType={NotificationType.LIKE_ON_POSTS}
            value={notificationOnPostLikes}
            onValueChange={() =>
              handleNotificationUpdate(NotificationType.LIKE_ON_POSTS)
            }
          />
          <NotificationContainer
            notificationType={NotificationType.COMMENTS_ON_POSTS}
            value={notificationOnPostComments}
            onValueChange={() =>
              handleNotificationUpdate(NotificationType.COMMENTS_ON_POSTS)
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Account;
