import React from "react";
import { ScrollView, Text, View } from "react-native";
import { addMinutes, getHours, getMinutes } from "date-fns";

import type { RouterOutputs } from "~/utils/api";
import Activity from "./activity";

// GLOBAL CONSTANTS
const MAX_TIME = 18;
const MIN_TIME = 9;
const LINE_HEIGHT = 12;

// Activity type based on query of get schedule
type GetActivityOutput = RouterOutputs["activity"]["getSchedule"][number];

//
interface ScheduleProps {
  activities: GetActivityOutput[];
}

/*
schdeuleEndTime calculates schedules last hour based on schedule
(Either the ending of the last activity or MAX_TIME (5 pm))

param activites: array of activites for the schedule
*/
function scheduleEndTime(activities: GetActivityOutput[]): number {
  if (activities.length == 0) {
    return MAX_TIME;
  }
  const latestActivity = activities.reduce(
    (max: GetActivityOutput, current: GetActivityOutput) =>
      addMinutes(current.startTime, current.durationMinutes) >
      addMinutes(current.startTime, current.durationMinutes)
        ? current
        : max,
    activities[0]!,
  );
  const latestHour = getHours(
    addMinutes(latestActivity.startTime, latestActivity.durationMinutes),
  );
  return Math.max(latestHour, MAX_TIME);
}

/*
schdeuleStartTime calculates schedules first hour based on schedule
(Either the start time of the first activity or MIN_TIME (9 am))

param activites: array of activites for the schedule
*/
function scheduleStartTime(activities: GetActivityOutput[]): number {
  if (activities.length == 0) {
    return MIN_TIME;
  }
  const earliestActivity = activities.reduce(
    (min: GetActivityOutput, current: GetActivityOutput) =>
      current.startTime < min.startTime ? current : min,
    activities[0]!,
  );
  const earliestHour = getHours(earliestActivity.startTime);
  return Math.min(earliestHour, MIN_TIME);
}

/*
calculateOffset calculates the offset for activity containers

paran scheduleStartTime: first hour of the schedule
param activites: array of activites for the schedule
*/
function calculateOffset(scheduleStartTime: number, startTime: Date): number {
  const offsetMinutes = getMinutes(startTime);
  const hourOffset = getHours(startTime) - scheduleStartTime;
  const totalOffset =
    (hourOffset * LINE_HEIGHT +
      Math.floor((offsetMinutes / 60) * LINE_HEIGHT + LINE_HEIGHT / 2)) *
    4;
  return totalOffset;
}

/*
formatHour formats hour to be in the format "HH:00"

param hour: number representing the hour (0-24)
*/
function formatHour(hour: number): string {
  const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
  const time = `${formattedHour}:00`;
  return time;
}

/*
calculateHeight based on duration calculate height of activity box

param durationMinutes?: gets the 
*/
function calculateHeight(durationMinutes: number): number {
  // Find how much of the precentage of line
  const height_px = Math.floor((durationMinutes / 60) * LINE_HEIGHT) * 4;
  return height_px;
}

const Schedule: React.FC<ScheduleProps> = ({ activities }) => {
  // Validate minHour and maxHour be within wanted range
  const validatedMaxHour = scheduleEndTime(activities);
  const validatedMinHour = scheduleStartTime(activities);
  const timeLines = [];
  // Generate time + lines for each hour within the specified range
  for (let hour = validatedMinHour; hour <= validatedMaxHour; hour++) {
    const time = formatHour(hour);
    timeLines.push(
      <View key={hour}>
        <View className={`flex-row items-center h-[${LINE_HEIGHT * 4}px]`}>
          <Text className="font-inter w-14 text-base font-normal text-black">
            {time}
          </Text>
          <View className="flex-1 border-t border-black" />
        </View>
      </View>,
    );
  }

  return (
    // Get schedule with activites!
    <ScrollView className="relative flex-1">
      {timeLines}

      {activities.map((activity, index) => {
        const eventOffset = calculateOffset(
          validatedMinHour,
          activity.startTime,
        );
        const activityHeight = calculateHeight(activity.durationMinutes);
        return (
          <View
            key={index}
            className={`
                top-[${eventOffset}px]
                absolute
                ml-14
                w-full
              `}
          >
            <Activity name={activity.name} activityHeight={activityHeight} />
          </View>
        );
      })}
    </ScrollView>
  );
};

export default Schedule;
