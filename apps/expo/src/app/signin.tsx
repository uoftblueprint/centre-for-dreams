import React from "react";
import { Image, Text, TextInput, View } from "react-native";
import type { ImageSourcePropType } from "react-native";

import FilledButton from "~/components/FilledButtons";
import Logo from "../../assets/logo.png";

const SignIn = () => {
  return (
    <View className="flex h-full p-4">
      <View className="flex-1 items-center justify-center ">
        <Image
          source={Logo as ImageSourcePropType}
          className="w-3/5"
          resizeMode="contain"
        />
      </View>
      <View className="flex-1 justify-center">
        <View className="gap-2">
          <Text aria-label="Label for Email">Email</Text>
          <TextInput
            placeholder="Enter Email"
            className="w-100 rounded-lg border p-2"
            aria-label="input"
          />
        </View>
      </View>
      <View className="flex flex-1 flex-col items-center justify-start">
        <View className="w-32">
          <FilledButton>Sign In</FilledButton>
        </View>
      </View>
    </View>
  );
};

export default SignIn;
