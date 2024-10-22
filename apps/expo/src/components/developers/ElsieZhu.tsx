import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { api } from "~/utils/api";

const ElsieZhu = () => {
  const { data: developerInfo } = api.developer.elsiezhu_info.useQuery();
  const upvote = api.developer.elsiezhu_upvote.useMutation();

  return (
    <View className="m-4 rounded-xl border-4 border-blue-100 bg-white p-4 shadow-sm">
      <Text className="mb-4 text-2xl font-bold">{developerInfo?.name}</Text>
      <Text className="text-md mb-4 font-normal">
        {developerInfo?.introduction}
      </Text>
      <Text className="text-md mb-2 font-normal">
        <Text className="font-bold">Year</Text>: {developerInfo?.year}
      </Text>
      <Text className="text-md mb-2 font-normal">
        <Text className="font-bold">Favorite food</Text>:{" "}
        {developerInfo?.fav_food}
      </Text>
      <Text className="text-md mb-2 font-normal">
        <Text className="font-bold">Favorite song</Text>:{" "}
        {developerInfo?.fav_song}
      </Text>

      <Text className="text-md mb-3 font-normal">
        <Text className="font-bold">Upvotes</Text>: {developerInfo?.upvotes}
      </Text>

      <TouchableOpacity
        className="rounded bg-blue-400 px-4 py-2 font-semibold text-white shadow hover:bg-blue-500"
        onPress={() => upvote.mutate()}
      >
        <Text className="font-semibold text-white">Upvote</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ElsieZhu;
