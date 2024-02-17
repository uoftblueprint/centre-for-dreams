import { useState } from "react";
import { Image, Text, View } from "react-native";
import type { ImageSourcePropType } from "react-native";
import Toast from "react-native-root-toast";
import { useRouter } from "expo-router";
import { SignedOut, useSignIn } from "@clerk/clerk-expo";

import FilledButton from "~/components/FilledButtons";
import { TextInput } from "~/components/inputs";
import type IClerkError from "~/interface/IClerkError";
import Logo from "../../assets/logo.png";

const SignInScreen = () => {
  const router = useRouter();
  const { signIn, isLoaded } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");

  /**
   * Sends a one-time passcode to the email provided and redirects users to the next page to
   * authenticate with the code. If there is an error, the user will not be redirected,
   * and a toast will be displayed showing the error.
   */
  const getEmailCode = () => {
    if (!isLoaded) {
      return;
    }
    signIn
      .create({
        identifier: emailAddress,
        strategy: "email_code",
      })
      .then(() => {
        router.push("/signincode");
      })
      .catch((err) => {
        const clerkError = err as IClerkError;
        const errorMessage = `Error signing in: ${
          clerkError ? clerkError.errors[0]?.longMessage : "unknown error"
        }`;
        Toast.show(errorMessage, {
          duration: Toast.durations.LONG,
        });
      });
  };

  return (
    <SignedOut>
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
