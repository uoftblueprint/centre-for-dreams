import React from "react";
import { Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

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
          <AntDesign name="enviromento" size={20} color="black" />
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
                <AntDesign name="checkcircleo" size={20} color="#22AB00" />
                <Text className="text-checkGreen font-inter text-base font-normal">
                  Join
                </Text>
              </>
            ) : (
              <>
                <AntDesign name="questioncircleo" size={20} color="black" />
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
