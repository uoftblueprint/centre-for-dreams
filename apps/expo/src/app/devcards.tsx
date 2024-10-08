import React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { Stack } from "expo-router";

import EmilyZhou from "~/components/developers/EmilyZhou";
import SarinaLi from "~/components/developers/SarinaLi";

const Developers = () => {
  return (
    <SafeAreaView className="flex-1">
      <Stack.Screen options={{ title: "CFD Team 2024-2025!" }} />
      <ScrollView className="h-full w-full p-4">
        <View className="mb-16 space-y-4">
          <SarinaLi />
          <EmilyZhou />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Developers;
