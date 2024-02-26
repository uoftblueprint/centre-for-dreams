import { useState } from "react";
import { Image, Text, View } from "react-native";
import Toast from "react-native-root-toast";
import { useRouter } from "expo-router";
import { SignedOut, useSignIn } from "@clerk/clerk-expo";

import FilledButton from "~/components/FilledButtons";
import { TextInput } from "~/components/inputs";
import { getErrorMessage } from "~/utils/errorUtils";
import Logo from "../../assets/logo.png";

const SignInScreen = () => {
  const router = useRouter();
  const { signIn, setActive, isLoaded } = useSignIn();

  const [code, setCode] = useState("");

  /**
   * Attempts to log the user in with the one-time passcode provided. The email used is the one provided in the
   * signin.tsx page prior to this.
   */
  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.attemptFirstFactor({
        strategy: "email_code",
        code:
          __DEV__ && code === "" && process.env.EXPO_PUBLIC_CLERK_TEST_CODE
            ? process.env.EXPO_PUBLIC_CLERK_TEST_CODE
            : code,
      });
      await setActive({ session: completeSignIn.createdSessionId });
      router.replace("/account");
    } catch (err) {
      const errorMessage = `Error signing in: ${getErrorMessage(err)}`;
      Toast.show(errorMessage, {
        duration: Toast.durations.LONG,
      });
    }
  };

  return (
    <SignedOut>
      <View className="flex h-full p-4">
        <View className="flex-1 items-center justify-center ">
          <Image source={Logo} className="w-3/5" resizeMode="contain" />
        </View>
        <View className="flex-1 justify-center">
          <View className="gap-2">
            <Text aria-label="Label for Verfication Code">Code</Text>
            <TextInput
              autoCapitalize="none"
              value={code}
              placeholder="Verification Code"
              className="w-100 rounded-lg border p-2"
              onChangeText={(code) => setCode(code)}
              aria-label="input"
            />
          </View>
        </View>
        <View className="flex flex-1 flex-row items-start justify-center gap-x-5">
          <View className="w-30">
            <FilledButton onClick={() => router.replace("/signin")}>
              Back
            </FilledButton>
          </View>
          <View className="w-30">
            <FilledButton onClick={onSignInPress}>Sign In</FilledButton>
          </View>
        </View>
      </View>
    </SignedOut>
  );
};

export default SignInScreen;
