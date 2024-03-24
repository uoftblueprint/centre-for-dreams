import { useState } from "react";
import { Image, Text, View } from "react-native";
import Toast from "react-native-root-toast";
import { useRouter } from "expo-router";
import { SignedOut, useSignIn } from "@clerk/clerk-expo";

import FilledButton from "~/components/FilledButtons";
import { TextInput } from "~/components/inputs";
import { api } from "~/utils/api";
import { getErrorMessage } from "~/utils/errorUtils";
import Logo from "../../assets/logo.png";

const SignInScreen = () => {
  const router = useRouter();
  const { signIn, isLoaded } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [approvalError, setApprovalError] = useState("");
  const { refetch } = api.user.isEmailApproved.useQuery(emailAddress, {
    refetchOnWindowFocus: false,
    enabled: false,
  });

  /**
   * Sends a one-time passcode to the email provided and redirects users to the next page to
   * authenticate with the code. If there is an error, the user will not be redirected,
   * and a toast will be displayed showing the error.
   */
  const getEmailCode = async () => {
    if (!isLoaded) {
      return;
    }

    const res = (await refetch()).data;
    // If we're in development mode and the email address is blanked,
    // do not validate. This allows developers to login by clicking with a
    // blank email address
    if (!(__DEV__ && emailAddress === "")) {
      if (!res?.userExists) {
        setApprovalError(
          "*Account with the corresponding email does not exist*",
        );
        return;
      }
      if (!res?.isApproved) {
        setApprovalError("*Your account hasn’t been activated*");
        return;
      }
    }

    signIn
      .create({
        identifier:
          __DEV__ &&
          emailAddress === "" &&
          process.env.EXPO_PUBLIC_CLERK_TEST_EMAIL
            ? process.env.EXPO_PUBLIC_CLERK_TEST_EMAIL
            : emailAddress,
        strategy: "email_code",
      })
      .then(() => {
        setApprovalError("");
        router.push("/signincode");
      })
      .catch((err: unknown) => {
        const errorMessage = `Error signing in: ${getErrorMessage(err)}`;
        Toast.show(errorMessage, {
          duration: Toast.durations.LONG,
        });
      });
  };

  return (
    <SignedOut>
      <View className="flex h-full p-4">
        <View className="flex-1 items-center justify-center ">
          <Image source={Logo} className="w-3/5" resizeMode="contain" />
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
            <Text className="text-rose-700">{approvalError}</Text>
          </View>
        </View>
        <View className="flex flex-1 flex-col items-center justify-start">
          <View className="w-32">
            <FilledButton onClick={getEmailCode}>Sign In</FilledButton>
          </View>
        </View>
      </View>
    </SignedOut>
  );
};

export default SignInScreen;
