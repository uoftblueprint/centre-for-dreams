import React from "react";
import { Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { addMinutes, format, getMinutes } from "date-fns";

import DeclineOutlinedChip from "~/components/DeclineOutlinedChip";
import EventDayTab from "~/components/EventDayTab";
import JoinOutlinedChip from "~/components/JoinOutlinedChip";
import MaybeOutlinedChip from "~/components/MaybeOutlinedChip";
import { api } from "~/utils/api";
import LeftArrow from "../../../assets/arrow-left.svg";

function formatHour(date: Date): string {
  let time = "";
  if (getMinutes(date) == 0) {
    time = format(date, "h a");
  } else {
    time = format(date, "p");
  }
  return time;
}

function formatHourOnly(date: Date): string {
  const time = format(date, "h:mm");
  return time;
}

function Event() {
  const { back } = useRouter();

  const postID = parseInt(useLocalSearchParams().id as string);
  const eventQuery = api.activity.getActivity.useQuery(postID);
  const event = eventQuery.data;

  const [join, setJoin] = React.useState(false);
  const [decline, setDecline] = React.useState(false);
  const [maybe, setMaybe] = React.useState(false);

  const clearState = () => {
    setJoin(false);
    setDecline(false);
    setMaybe(false);
  };

  const joinEvent = () => {
    setJoin(!join);
    setDecline(false);
    setMaybe(false);
  };

  const declineEvent = () => {
    setDecline(!decline);
    setJoin(false);
    setMaybe(false);
  };

  const maybeEvent = () => {
    setMaybe(!maybe);
    setJoin(false);
    setDecline(false);
  };

  if (eventQuery.isFetching && eventQuery.isLoading) {
    // Render loading indicator or return null
    return (
      <SafeAreaView className="h-full w-full bg-white">
        <Stack.Screen options={{ title: "Event", headerShown: false }} />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView className="bg-white">
      <Stack.Screen options={{ title: "Event", headerShown: false }} />
      <View className="inline-flex h-full flex-col justify-start  gap-2.5 px-4 pt-6">
        <View className="inline-flex flex-row items-center justify-between self-stretch">
          <TouchableOpacity
            onPress={() => {
              clearState();
              back();
            }}
          >
            <LeftArrow className="relative h-6 w-6" />
          </TouchableOpacity>
          <Text className="text-p-0 font-headline-md text-center leading-9">
            Event Details
          </Text>
          <View className="relative h-6 w-6" />
        </View>

        <View className="inline-flex items-start justify-start gap-y-0.5">
          <View className="inline-flex flex-row items-start justify-start gap-x-11 gap-y-4">
            <Text className="text-p-0 font-title-md leading-normal tracking-tight">
              Title
            </Text>
            <Text className="text-b-0 font-body-lg leading-normal tracking-wide">
              {event!.name}
            </Text>
          </View>
          <View className="inline-flex flex-row items-start justify-start gap-x-10 gap-y-4">
            <Text className="text-p-0 font-title-md leading-normal tracking-tight">
              Time
            </Text>
            <Text className="text-b-0 font-body-lg leading-normal tracking-wide">
              {formatHourOnly(event!.startTime)} -{" "}
              {formatHourOnly(
                addMinutes(event!.startTime, event!.durationMinutes),
              )}
            </Text>
          </View>
          <View className="inline-flex flex-row items-start justify-start gap-x-7 gap-y-4">
            <Text className="text-p-0 font-title-md leading-normal tracking-tight">
              Venue
            </Text>
            <Text className="text-b-0 font-body-lg leading-normal tracking-wide">
              {event!.location}
            </Text>
          </View>
        </View>

        <View className="inline-flex items-start justify-start gap-y-4">
          <Text className="text-p-0  font-title-md leading-normal tracking-tight">
            Attendance
          </Text>
        </View>

        <View className="inline-flex flex-row justify-between py-4">
          <JoinOutlinedChip onPress={joinEvent} disabled={!join}>
            Join
          </JoinOutlinedChip>
          <DeclineOutlinedChip onPress={declineEvent} disabled={!decline}>
            Decline
          </DeclineOutlinedChip>
          <MaybeOutlinedChip onPress={maybeEvent} disabled={!maybe}>
            Maybe
          </MaybeOutlinedChip>
        </View>
        {event!.subactivities[0] != null && (
          <View className="inline-flex items-start  justify-start">
            <Text className="text-p-0  font-title-md leading-normal tracking-tight">
              Details
            </Text>
          </View>
        )}
        <ScrollView>
          {event!.subactivities.map((e, index) => {
            return (
              <View key={index} className="mb-3">
                <View className="inline-flex w-max items-start justify-start">
                  <Text className="text-p-0  font-body-lg leading-normal tracking-tight">
                    {formatHour(e.startTime)} -{" "}
                    {formatHour(addMinutes(e.startTime, e.durationMinutes))}
                  </Text>
                </View>
                <EventDayTab name={e.name} venue={e.location!} />
              </View>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default Event;
