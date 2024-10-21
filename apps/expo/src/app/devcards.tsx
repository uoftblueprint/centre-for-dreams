import React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { Stack } from "expo-router";

import DanielXu from "~/components/developers/DanielXu";
import ElsieZhu from "~/components/developers/ElsieZhu";
import EmilyZhou from "~/components/developers/EmilyZhou";
import SarinaLi from "~/components/developers/SarinaLi";
import CarlosSolares from "~/components/developers/CarlosSolares";

const Developers = () => {
  return (
    <SafeAreaView className="flex-1">
      <Stack.Screen options={{ title: "CFD Team 2024-2025!" }} />
      <ScrollView className="h-full w-full p-4">
        <View className="mb-16 space-y-4">
          <SarinaLi />
          <EmilyZhou />
          <DanielXu />
          <ElsieZhu />
          <CarlosSolares />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Developers;
