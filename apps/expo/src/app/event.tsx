import React from "react";
import { Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { addMinutes, getHours, getMinutes } from "date-fns";

import DeclineOutlinedChip from "~/components/DeclineOutlinedChip";
import type { EventTemp } from "~/components/EventDay";
import EventDayTab from "~/components/EventDay";
import JoinOutlinedChip from "~/components/JoinOutlinedChip";
import MaybeOutlinedChip from "~/components/MaybeOutlinedChip";
import LeftArrow from "../../assets/arrow-left.svg";

export interface EventListTemp {
  name: string;
  venue: string;
  startTime: Date;
  duration: number;
  events: EventTemp[];
}

export interface EventListProps {
  event: EventListTemp;
}

function formatHour(hour: number, minutes: number): string {
  const updatedHour = hour == 12 ? hour : hour % 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  let time = "";
  if (minutes == 0) {
    time = `${updatedHour}`;
  } else {
    time = `${updatedHour}:${formattedMinutes}`;
  }

  if (hour < 12) {
    time += " AM";
  } else {
    time += " PM";
  }

  return time;
}

function formatHourOnly(hour: number, minutes: number): string {
  const updatedHour = hour == 12 ? hour : hour % 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

  return `${updatedHour}:${formattedMinutes}`;
}

// CHange to take an event list prop depending on the
const Event: React.FC<EventListProps> = ({ event }) => {
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
          <TouchableOpacity>
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
              {event.name}
            </Text>
          </View>
          <View className="inline-flex flex-row items-start justify-start gap-x-10 gap-y-4">
            <Text className="text-p-0 font-title-md leading-normal tracking-tight">
              Time
            </Text>
            <Text className="text-b-0 font-body-lg leading-normal tracking-wide">
              {formatHourOnly(
                getHours(event.startTime),
                getMinutes(event.startTime),
              )}{" "}
              -{" "}
              {formatHourOnly(
                getHours(addMinutes(event.startTime, event.duration)),
                getMinutes(addMinutes(event.startTime, event.duration)),
              )}
            </Text>
          </View>
          <View className="inline-flex flex-row items-start justify-start gap-x-7 gap-y-4">
            <Text className="text-p-0 font-title-md leading-normal tracking-tight">
              Venue
            </Text>
            <Text className="text-b-0 font-body-lg leading-normal tracking-wide">
              {event.venue}
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
            Details
          </Text>
        </View>
        <ScrollView>
          {event.events.map((e, index) => {
            return (
              <View key={index} className="mb-3">
                <View className="inline-flex w-max items-start justify-start">
                  <Text className="text-p-0  font-body-lg leading-normal tracking-tight">
                    {formatHour(
                      getHours(e.startTime!),
                      getMinutes(e.startTime!),
                    )}{" "}
                    -{" "}
                    {formatHour(
                      getHours(addMinutes(e.startTime!, e.duration!)),
                      getMinutes(addMinutes(e.startTime!, e.duration!)),
                    )}
                  </Text>
                </View>
                <EventDayTab name={e.name} venue={e.venue} />
              </View>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Event;
