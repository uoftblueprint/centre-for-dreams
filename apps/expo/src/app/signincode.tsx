import { useState } from "react";
import { Image, Text, View } from "react-native";
import Toast from "react-native-root-toast";
import { useRouter } from "expo-router";
import { useAuth, useSignIn } from "@clerk/clerk-expo";

import FilledButton from "~/components/FilledButtons";
import { TextInput } from "~/components/inputs";
import { api } from "~/utils/api";
import { getErrorMessage } from "~/utils/errorUtils";
import Logo from "../../assets/logo.png";

const SignInScreen = () => {
  const router = useRouter();
  const { signIn, setActive, isLoaded } = useSignIn();
  const { signOut } = useAuth();
  const [code, setCode] = useState("");
  const [approvalError, setApprovalError] = useState("");
  const createUserWithClerkIdIfNotExists =
    api.user.createUserWithClerkIdIfNotExists.useMutation();

  /**
   * Attempts to log the user in with the one-time passcode provided. The email used is the one provided in the
   * signin.tsx page prior to this.
   */
  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }

    const isDevModeUsingTestEmail = __DEV__ && code === "";

    try {
      const completeSignIn = await signIn.attemptFirstFactor({
        strategy: "email_code",
        code:
          isDevModeUsingTestEmail && process.env.EXPO_PUBLIC_CLERK_TEST_CODE
            ? process.env.EXPO_PUBLIC_CLERK_TEST_CODE
            : code,
      });

      // If we have the id, that means the user successfully
      // authenticated using Clerk. However we shouldn't update the
      // active session just yet in case they're not approved
      if (completeSignIn.id) {
        const isApproved = await createUserWithClerkIdIfNotExists.mutateAsync(
          completeSignIn.id,
        );
        if (isApproved || isDevModeUsingTestEmail) {
          await setActive({ session: completeSignIn.createdSessionId });
          router.replace("/calendar/");
          return;
        }
      }

      // Sign out of the session to allow the user to restart the
      // signin flow once again if they choose to go back
      await signOut();
      setApprovalError("*Your account hasn’t been activated*");
    } catch (err) {
      const errorMessage = `Error signing in: ${getErrorMessage(err)}`;
      Toast.show(errorMessage, {
        duration: Toast.durations.LONG,
      });
    }
  };

  return (
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
        <Text className="text-rose-700">{approvalError}</Text>
      </View>
      <View className="flex flex-1 flex-row items-start justify-center gap-x-5">
        <View className="w-30">
          <FilledButton
            onClick={async () => {
              await signOut();
              router.replace("/signin");
            }}
          >
            Back
          </FilledButton>
        </View>
        <View className="w-30">
          <FilledButton onClick={onSignInPress}>Sign In</FilledButton>
        </View>
      </View>
    </View>
  );
};

export default SignInScreen;
