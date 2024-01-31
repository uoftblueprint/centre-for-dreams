import React, { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";

import FilledButton from "~/components/FilledButtons";

const SignIn = () => {
  return (
    <View className="flex-1">
      <View className="flex h-screen items-center bg-red-400 p-4">
        <Text aria-label="Label for Email">Email</Text>
        <TextInput
          placeholder="Enter Email"
          className="w-100 rounded-lg border p-2"
          aria-label="input"
        />
        <FilledButton onClick={() => {}}>Sign In</FilledButton>
      </View>
    </View>
  );
};

export default SignIn;
