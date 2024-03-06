import React from "react";
import { Text, View } from "react-native";
import { addMinutes, format, getMinutes } from "date-fns";

import LocationMarker from "../../assets/location-marker.svg";

// TO-DO : Change to be Activity type when structure is ready
export interface EventTemp {
  name: string;
  venue?: string;
  startTime?: Date;
  duration?: number;
}

/*
formatHour formats hour to be in the format "HH:MM"

param hour: number representing the hour (0-24)
param minutes: number representing the minutes (0-59)
*/

function formatHour(date: Date): string {
  let time = "";
  if (getMinutes(date) == 0) {
    time = format(date, "ha");
  } else {
    time = format(date, "h:mma");
  }
  return time;
}

export default function EventDayTab({
  name,
  venue,
  startTime,
  duration,
}: EventTemp) {
  return (
    <View className={`w-fill bg-p-95 flex-col justify-center rounded-md p-4`}>
      <Text className="text-p-10 font-title-md">{name}</Text>
      {venue !== undefined && (
        <View className="mt-1 flex-row items-center justify-start ">
          <LocationMarker className="" />
          <Text className="text-n-40 font-body-md mx-2">{venue} </Text>
          <View className="flex-row ">
            <Text className="text-p-0 font-body-sm px-2">
              {" "}
              {startTime === undefined
                ? ""
                : `${formatHour(startTime)} ${duration === undefined ? "" : `- ${formatHour(addMinutes(startTime, duration))}`}`}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}
