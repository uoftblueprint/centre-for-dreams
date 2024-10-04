import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { api } from "~/utils/api";

const EmilyZhou = () => {
  const { data: developerInfo } = api.developer.emilyzhou_info.useQuery();
  const upvote = api.developer.emilyzhou_update.useMutation();

  return (
    <View className="m-4 rounded-lg border-4 border-indigo-100 bg-white p-4 shadow-sm">
      <Text className="mb-4 text-2xl font-extrabold">
        {developerInfo?.name}
      </Text>
      <Text className="text-md mb-4 font-normal">
        {developerInfo?.introduction}
      </Text>
      <Text className="text-md mb-2 font-normal text-gray-600">
        Year: {developerInfo?.year}
      </Text>
      <Text className="text-md mb-2 font-normal text-gray-600">
        Favorite food: {developerInfo?.fav_food}
      </Text>
      <Text className="text-md mb-2 font-normal text-gray-600">
        Favorite song: {developerInfo?.fav_song}
      </Text>

      <Text className="text-md mb-3 font-normal text-gray-600">
        Upvotes: {developerInfo?.upvotes}
      </Text>
      <TouchableOpacity
        className="rounded bg-indigo-400 px-4 py-2 font-semibold text-white shadow hover:bg-indigo-500"
        onPress={() => upvote.mutate()}
      >
        <Text className="font-semibold text-white">Upvote!</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmilyZhou;
