import React, { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import FilledButton from "~/components/FilledButtons";

const SignIn = () => {
  return (
    <View className="flex h-full p-4">
      <View className="flex-1 bg-green-400"></View>
      <View className="flex-1 justify-center bg-red-400">
        <View className="gap-2">
          <Text aria-label="Label for Email">Email</Text>
          <TextInput
            placeholder="Enter Email"
            className="w-100 rounded-lg border p-2"
            aria-label="input"
          />
        </View>
      </View>
      <View className="flex flex-1 flex-col items-center justify-center bg-blue-400">
        <View className="w-32">
          <FilledButton onClick={() => {}}>Sign In</FilledButton>
        </View>
      </View>
    </View>
  );
};

export default SignIn;
