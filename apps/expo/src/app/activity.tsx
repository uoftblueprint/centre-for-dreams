import React from "react";
import { Text, View } from "react-native";

import type { RouterOutputs } from "~/utils/api";

// Activity type from router
type GetActivityOutput = RouterOutputs["activity"]["getSchedule"][number];

/*
ActivityProps is the information necessary for an Activity Component

activity: the activity to be shown
showLocation: whether the component should show the location
attending: whether the user is attending (True: Join, False: Maybe, Null: Nothing is shown)
*/
interface ActivityProps {
  activity: GetActivityOutput;
  showLocation?: boolean;
  attending?: boolean;
}

export default function Activity({
  activity,
  showLocation,
  attending,
}: ActivityProps) {
  return (
    <View className={`flex-col h-full w-full rounded-md bg-zinc-300 p-2.5`}>
      <Text className="font-inter text-base font-semibold text-black">
        {activity.name}
      </Text>

      {showLocation !== undefined && showLocation && (
        <View className="flex-row items-center justify-start gap-2">
          <Text className="text-black">?</Text>
          <Text className="font-inter text-base font-normal text-black">
            {activity.location}
          </Text>
        </View>
      )}

      {attending !== undefined && (
        <View className="flex-row items-center justify-start">
          <Text className="font-inter mr-3 text-base font-normal text-black">
            Attendance:
          </Text>
          <View className=" flex-row items-center justify-start gap-2">
            {attending ? (
              <>
                <Text className="text-lime-700">?</Text>
                <Text className="font-inter text-base font-normal text-lime-700">
                  Join
                </Text>
              </>
            ) : (
              <>
                <Text className="text-black">?</Text>
                <Text className="font-inter text-base font-normal text-black">
                  Maybe
                </Text>
              </>
            )}
          </View>
        </View>
      )}
    </View>
  );
}
