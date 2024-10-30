import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { api } from "~/utils/api";

const Nolawi = () => {
    const { data: nolawiInfo } = api.developer.nolawi_info.useQuery();
    const mutation = api.developer.nolawi_upvote.useMutation();

    return (
        <View className="m-4 rounded-lg border-2 border-blue-500 bg-white p-6 shadow-lg">
            <View className="mb-4">
                <Text className="text-2xl font-semibold tracking-tight text-gray-900">
                    {nolawiInfo?.name}
                </Text>
            </View>

            <View className="mb-4">
                <Text className="text-md">Year: {nolawiInfo?.year}</Text>
            </View>

            <View className="mb-4">
                <Text>{nolawiInfo?.introduction}</Text>
            </View>

            <View className="mb-4">
                <Text>
                    <Text className="font-bold">Favourite food: </Text>
                    {nolawiInfo?.fav_food}
                </Text>
            </View>

            <View className="mb-4">
                <Text>
                    <Text className="font-bold">Favourite song: </Text>
                    {nolawiInfo?.fav_song}
                </Text>
            </View>

            <View className="mt-4 flex-row items-center gap-4">
                <TouchableOpacity
                    className="rounded bg-blue-500 px-4 py-2"
                    onPress={() => mutation.mutate()}
                >
                    <Text className="font-bold text-white">Upvote</Text>
                </TouchableOpacity>

                <View className="pt-2">
                    <Text className="font-bold">Upvotes: {nolawiInfo?.upvotes}</Text>
                </View>
            </View>
        </View>
    );
};

export default Nolawi;