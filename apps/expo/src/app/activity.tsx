import React from "react";
import { Text, View } from "react-native";

// Props specific for the Activity component
interface ActivityProps {
  name: string;
  location?: string;
  attending?: boolean;
  activityHeight?: number;
}

export default function Activity({
  name,
  location,
  attending,
  activityHeight,
}: ActivityProps) {
  return (
    <View
      className={`flex-col h-[${activityHeight}px] rounded-md bg-zinc-300 p-2.5`}
    >
      <Text className="font-inter text-base font-semibold text-black">
        {name}
      </Text>

      {location !== undefined && (
        <View className="flex-row items-center justify-start gap-2">
           <Text className="text-black">?</Text> 
          <Text className="font-inter text-base font-normal text-black">
            {location}
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
                <Text className="text-lime-7">?</Text> 
                <Text className="text-lime-7 font-inter text-base font-normal">
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
