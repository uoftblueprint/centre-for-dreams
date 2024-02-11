import React from "react";
import { Text, View } from "react-native";

// TO-DO : Change to be Activity type when structure is ready
export interface Event {
  name: string;
}

interface EventProps {
  activity: Event;
  attending?: boolean;
}

export default function EventTab({ activity, attending }: EventProps) {
  return (
    <View className={`w-fill bg-p-95 flex-col justify-center rounded-md p-4`}>
      <Text className="text-p-10 font-title-md">{activity.name}</Text>

      <View className="flex-row items-center justify-start">
        <Text className="text-n-40 font-body-md mr-3">Attendance:</Text>

        {/*TO-DO: Change to be chips when they are ready */}
        <Text className="text-n-40 font-body-md">
          {attending === undefined ? "Maybe" : attending ? "Join" : "Not Join"}
        </Text>
      </View>
    </View>
  );
}
