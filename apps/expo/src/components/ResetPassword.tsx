import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-root-toast";
import { useSignIn } from "@clerk/clerk-expo";

interface IClerkError {
  status: number;
  clerkError: boolean;
  errors: {
    code: string;
    message: string;
    longMessage: string;
    meta: {
      paramName: string;
    };
  }[];
}

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const { isLoaded, signIn, setActive } = useSignIn();

  if (!isLoaded) {
    return null;
  }

  const requestReset = async () => {
    if (!isLoaded) {
      return;
    }

    await signIn
      ?.create({
        strategy: "reset_password_email_code",
        identifier: email,
      })
      .then((_) => {
        const successMessage = `A reset code has been sent to the email ${email}. Use the code to initial a password reset below.`;
        Toast.show(successMessage, {
          duration: Toast.durations.LONG,
        });
        setEmail("");
      })
      .catch((err: IClerkError) => {
        const errorMessage = `Error requesting password reset: ${
          err.errors[0]?.longMessage ?? "Unable to retrieve error"
        }`;
        Toast.show(errorMessage, {
          duration: Toast.durations.LONG,
        });
      });
  };

  const resetPassword = async () => {
    await signIn
      .attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      })
      .then((result) => {
        if (result.status === "complete") {
          // Logs the user in after they reset their password
          setActive({ session: result.createdSessionId }).catch((err) => {
            // we'll catch it below
            throw err;
          });
          setCode("");
          setEmail("");
        }
      })
      .catch((err: IClerkError) => {
        const errorMessage = `Error resetting password: ${
          err.errors[0]?.longMessage ?? "Unable to retrieve error"
        }`;
        Toast.show(errorMessage, {
          duration: Toast.durations.LONG,
        });
      });
  };

  return (
    <View>
      <View>
        <TextInput
          autoCapitalize="none"
          value={email}
          placeholder="Email..."
          onChangeText={(emailAddress) => setEmail(emailAddress)}
        />
      </View>

      <TouchableOpacity onPress={requestReset}>
        <Text>Request Reset</Text>
      </TouchableOpacity>

      <View>
        <TextInput
          autoCapitalize="none"
          value={code}
          placeholder="Reset password code"
          onChangeText={(code) => setCode(code)}
        />
      </View>

      <View>
        <TextInput
          value={password}
          placeholder="New password..."
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <TouchableOpacity onPress={resetPassword}>
        <Text>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResetPassword;
