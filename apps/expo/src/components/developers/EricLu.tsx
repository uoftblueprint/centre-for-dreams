import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { api } from "~/utils/api";

const EricLu = () => {
  const { data: facts } = api.developer.ericlu_info.useQuery();
  const upvote = api.developer.ericlu_upvote.useMutation();

  return (
    <View className="m-4 rounded-lg bg-white p-6 shadow-md">
      <Text className="mb-2 text-2xl font-extrabold text-[#1f2937]">
        {facts?.name}
      </Text>

      <Text className="mb-4 text-sm leading-relaxed text-gray-700">
        {facts?.introduction}
      </Text>

      <View className="mb-4 space-y-1">
        <Text className="text-sm text-black">Year: {facts?.year}</Text>
        <Text className="text-sm text-black">
          Favorite Food: {facts?.fav_food}
        </Text>
        <Text className="text-sm text-black">
          Favorite Song: {facts?.fav_song}
        </Text>
      </View>

      <TouchableOpacity
        className="w-full rounded-md bg-green-600/60 p-3 active:scale-95"
        onPress={() => upvote.mutate()}
      >
        <Text className="text-left font-semibold text-white">
          Upvote: {facts?.upvotes}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EricLu;
