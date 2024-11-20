import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { api } from "../utils/api";

interface Event {
  name: string;
  id: number;
  day: Date;
}

interface EventProps {
  activity: Event;
  attending?: boolean;
}

export default function EventTab({ activity, attending }: EventProps) {
  const [isAttending, setIsAttending] = useState(attending);
  const utils = api.useContext();

  const createAbsence = api.absence.createAbsence.useMutation({
    onSuccess: async () => {
      try {
        await utils.absence.getAbsences.invalidate();
      } catch (error) {
        console.error("Failed to invalidate absences:", error);
      }
    },
  });

  const deleteAbsence = api.absence.deleteAbsence.useMutation({
    onSuccess: async () => {
      try {
        await utils.absence.getAbsences.invalidate();
      } catch (error) {
        console.error("Failed to invalidate absences:", error);
      }
    },
  });

  const toggleAttendance = () => {
    const newAttendingState = !isAttending;
    setIsAttending(newAttendingState);

    try {
      if (newAttendingState) {
        deleteAbsence.mutate({
          absenceDate: activity.day,
          activityId: activity.id,
        });
      } else {
        createAbsence.mutate({
          absenceDate: activity.day,
          activityId: activity.id,
        });
      }
    } catch (error) {
      setIsAttending(!newAttendingState);
      console.error("Failed to update attendance:", error);
    }
  };
  console.log(activity.name, isAttending);

  return (
    <View className={`w-fill bg-p-95 flex-col justify-center rounded-md p-4`}>
      <Text className="text-p-10 font-title-md">{activity.name}</Text>

      <View className="flex-row items-center justify-start">
        <Text className="text-n-40 font-body-md mr-3">Attendance:</Text>

        <TouchableOpacity
          onPress={toggleAttendance}
          disabled={createAbsence.isLoading || deleteAbsence.isLoading}
        >
          <Text
            className={`font-body-md ${
              isAttending ? "text-green-600" : "text-red-600"
            }`}
          >
            {createAbsence.isLoading || deleteAbsence.isLoading
              ? "Updating..."
              : isAttending
                ? "Present"
                : "Absent"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
