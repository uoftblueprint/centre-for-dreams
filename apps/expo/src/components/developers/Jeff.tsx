import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { api } from "~/utils/api";

const Jeff = () => {
  const { data: jeffInfo } = api.developer.jeff_info.useQuery();
  const mutation = api.developer.jeff_upvote.useMutation();

  return (
    <View className="m-4 rounded-lg border border-gray-200 bg-white p-4 shadow">
      <View className="mb-2">
        <Text className="text-2xl font-semibold tracking-tight text-gray-900">
          {jeffInfo?.name}
        </Text>
      </View>

      <View className="mb-2">
        <Text className="text-md">Year: {jeffInfo?.year}</Text>
      </View>

      <View>
        <Text>{jeffInfo?.introduction}</Text>
      </View>

      <View className="mt-2">
        <Text>
          <Text className="font-bold">Favourite food: </Text>
          {jeffInfo?.fav_food}
        </Text>
      </View>

      <View className="mb-2 mt-2">
        <Text>
          <Text className="font-bold">Favourite song: </Text>
          {jeffInfo?.fav_song}
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
          <Text className="font-bold">Upvotes: {jeffInfo?.upvotes}</Text>
        </View>
      </View>
    </View>
  );
};

export default Jeff;
