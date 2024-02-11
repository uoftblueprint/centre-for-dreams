import React from "react";
import { Text, View } from "react-native";

import type { RouterOutputs } from "~/utils/api";

type GetActivityOutput = RouterOutputs["activity"]["getSchedule"][number];

interface EventProps {
  activity: GetActivityOutput;
  attending?: boolean;
}

export default function EventTab({ activity, attending }: EventProps) {
  return (
    <View
      className={`w-fill bg-p-95 flex-col justify-center rounded-md p-4`}
    >
      <Text className=" text-p-10 font-poppins500 text-base">
        {activity.name}
      </Text>

      <View className="flex-row items-center justify-start">
        <Text className="text-n-40 font-poppins400 mr-3 text-sm">
          Attendance:
        </Text>

        <Text className="text-base font-normal">
          {attending === undefined ? "Maybe" : attending ? "Join" : "Not Join"}
        </Text>
      </View>
    </View>
  );
}
