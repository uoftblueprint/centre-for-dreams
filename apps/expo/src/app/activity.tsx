import React from "react";
import { Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface ActivityComponent {
  activityName: string;
  location?: string;
  attending?: boolean;
}

export default function Activity({
  activityName,
  location,
  attending,
}: ActivityComponent) {
  return (
    <View className="mb-4 w-8/12 flex-col rounded-md bg-zinc-300 p-3">
      <Text className="font-inter text-base font-semibold text-black">
        {activityName}
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
          <Text className="font-inter text-base font-normal text-black">
            Attendance:
          </Text>
          <View className="ml-3 flex-row items-center justify-start gap-2">
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
