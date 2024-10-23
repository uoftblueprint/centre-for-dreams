import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { api } from "~/utils/api";

// adding a comment
const CarlosSolares = () => {
  const { data: carlossolaresInfo } =
    api.developer.carlossolares_info.useQuery();
  const mutation = api.developer.carlossolares_upvote.useMutation();

  return (
    <View className="m-4 rounded-lg border border-gray-200 bg-white p-4 shadow">
      <View className="mb-2">
        <Text className="text-2xl font-semibold tracking-tight text-gray-900">
          {carlossolaresInfo?.name}
        </Text>
      </View>

      <View className="mb-2">
        <Text className="text-md">Year: {carlossolaresInfo?.year}</Text>
      </View>

      <View>
        <Text>{carlossolaresInfo?.introduction}</Text>
      </View>

      <View className="mt-2">
        <Text>
          <Text className="font-bold">Favourite food: </Text>
          {carlossolaresInfo?.fav_food}
        </Text>
      </View>

      <View className="mb-2 mt-2">
        <Text>
          <Text className="font-bold">Favourite song: </Text>
          {carlossolaresInfo?.fav_song}
        </Text>
      </View>

      <View className="mt-2 flex-row items-center gap-4">
        <TouchableOpacity
          className="mt-4 rounded bg-blue-500 px-4 py-2"
          onPress={() => mutation.mutate()}
        >
          <Text className="font-bold text-white">Upvote</Text>
        </TouchableOpacity>

        <View className="pt-2">
          <Text className="font-bold">
            Upvotes: {carlossolaresInfo?.upvotes}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CarlosSolares;
