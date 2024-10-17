import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { api } from "~/utils/api";

const GirikSetya = () => {
  const { data: girikInfo } = api.developer.girik_info.useQuery();
  const mutation = api.developer.girik_upvote.useMutation();

  return (
    <View className="m-4 rounded-lg border border-black bg-white p-4 shadow">
      <View className="mb-2">
        <Text className="text-2xl font-semibold tracking-tight text-gray-900">
          {girikInfo?.name}
        </Text>
      </View>

      <View className="mb-2">
        <Text className="text-md">Year: {girikInfo?.year}</Text>
      </View>

      <View>
        <Text>{girikInfo?.introduction}</Text>
      </View>

      <View className="mt-2">
        <Text>
          <Text className="font-bold">Favourite food: </Text>
          {girikInfo?.fav_food}
        </Text>
      </View>

      <View className="mb-2 mt-2">
        <Text>
          <Text className="font-bold">Favourite song: </Text>
          {girikInfo?.fav_song}
        </Text>
      </View>

      <View className="mt-2 flex-row items-center gap-4">
        <TouchableOpacity
          className="mt-4 rounded bg-black px-10 py-2"
          onPress={() => mutation.mutate()}
        >
          <Text className="font-bold text-white">Upvote</Text>
        </TouchableOpacity>

        <View className="pt-2">
          <Text className="font-bold">Upvotes: {girikInfo?.upvotes}</Text>
        </View>
      </View>
    </View>
  );
};

export default GirikSetya;
