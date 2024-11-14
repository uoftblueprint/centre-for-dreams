import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { addMinutes, format, getMinutes } from "date-fns";

import DeclineOutlinedChip from "~/components/DeclineOutlinedChip";
import type { EventTemp } from "~/components/EventDayTab";
import EventDayTab from "~/components/EventDayTab";
import JoinOutlinedChip from "~/components/JoinOutlinedChip";
import MaybeOutlinedChip from "~/components/MaybeOutlinedChip";
import { api } from "~/utils/api";
import LeftArrow from "../../../assets/arrow-left.svg";

// Temp Data
const eventData: EventListTemp[] = [
  {
    id: 1,
    name: "Event Name",
    venue: "CFD Center",
    startTime: new Date("2023-10-09T08:00:00.000"),
    duration: 480,
    events: [
      {
        name: "Event Name",
        startTime: new Date("2023-10-09T08:00:00.000"),
        duration: 85,
      },
      {
        name: "Event Name",
        startTime: new Date("2023-10-09T10:00:15.000"),
        duration: 55,
        venue: "Venue",
      },
      {
        name: "Event Name",
        startTime: new Date("2023-10-09T11:00:15.000"),
        duration: 55,
        venue: "Venue",
      },
      {
        name: "Event Name",
        startTime: new Date("2023-10-09T15:00:15.000"),
        duration: 90,
      },
    ],
  },
];

export interface EventListTemp {
  id: number;
  name: string;
  venue: string;
  startTime: Date;
  duration: number;
  events: EventTemp[];
}

export interface EventListProps {
  event: EventListTemp;
}

function formatHourOnly(date: Date): string {
  const time = format(date, "h:mm");
  return time;
}

// Take out eventData once database structure is set up
function Event() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const eventId = parseInt(id as string);
  const event = eventData.find((event) => (event.id = eventId));
  const subactivities = {
    subactivities: [
      {
        id: 1,
        name: "Subactivity 1",
        location: "CFD Center",
        startTime: new Date("2023-10-09T08:00:00.000"),
        durationMinutes: 100,
        activityId: 100,
      },
      {
        id: 2,
        name: "Subactivity 2",
        location: "CFD Center",
        startTime: new Date("2023-10-09T08:00:00.000"),
        durationMinutes: 100,
        activityId: 100,
      },
    ],
  };

  const [join, setJoin] = React.useState(false);
  const [decline, setDecline] = React.useState(false);
  const [maybe, setMaybe] = React.useState(false);

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

  return (
    <SafeAreaView className="bg-white">
      <Stack.Screen options={{ title: "Event", headerShown: false }} />
      <View className="inline-flex h-full flex-col justify-start  gap-2.5 px-4 pt-6">
        <View className="inline-flex flex-row items-center justify-between self-stretch">
          <TouchableOpacity onPress={() => router.back()}>
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
              {formatHourOnly(addMinutes(event!.startTime, event!.duration))}
            </Text>
          </View>
          <View className="inline-flex flex-row items-start justify-start gap-x-7 gap-y-4">
            <Text className="text-p-0 font-title-md leading-normal tracking-tight">
              Venue
            </Text>
            <Text className="text-b-0 font-body-lg leading-normal tracking-wide">
              {event!.venue}
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

        <View className="inline-flex items-start  justify-start">
          <Text className="text-p-0  font-title-md leading-normal tracking-tight">
            Subactivities
          </Text>
        </View>
        <ScrollView>
          {subactivities?.subactivities.map((e, index) => {
            return (
              <View key={index} className="mb-3">
                <EventDayTab name={e.name} venue={e.location ?? ""} />
              </View>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default Event;
