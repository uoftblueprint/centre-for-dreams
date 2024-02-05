import { useState } from "react";
import { Image, Text, TextInput, View } from "react-native";
import type { ImageSourcePropType } from "react-native";
import Toast from "react-native-root-toast";
import { useSignIn } from "@clerk/clerk-expo";

import FilledButton from "~/components/FilledButtons";
import type IClerkError from "~/interface/IClerkError";
import Logo from "../../assets/logo.png";

const SignInScreen = () => {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });
      // This is an important step,
      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err) {
      console.log(JSON.stringify(err, null, 4));
      const clerkError = err as IClerkError;
      const errorMessage = `Error signing in: ${
        clerkError ? clerkError.errors[0]?.longMessage : "unknown error"
      }`;
      Toast.show(errorMessage, {
        duration: Toast.durations.LONG,
      });
    }
  };
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
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Email..."
            className="w-100 rounded-lg border p-2"
            onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
            aria-label="input"
          />
          <TextInput
            value={password}
            placeholder="Password..."
            secureTextEntry={true}
            className="w-100 rounded-lg border p-2"
            onChangeText={(password) => setPassword(password)}
            aria-label="input"
            autoCapitalize="none"
          />
        </View>
      </View>
      <View className="flex flex-1 flex-col items-center justify-start">
        <View className="w-32">
          <FilledButton onClick={onSignInPress}>Sign In</FilledButton>
        </View>
      </View>
    </View>
  );
};

export default SignInScreen;
