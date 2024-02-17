import { View } from "react-native";
import { useAuth } from "@clerk/clerk-expo";

import FilledButton from "./FilledButtons";

const SignOut = () => {
  const { isLoaded, signOut } = useAuth();
  if (!isLoaded) {
    return null;
  }
  return (
    <View>
      <FilledButton
        onClick={async () => {
          await signOut();
        }}
      >
        Sign Out
      </FilledButton>
    </View>
  );
};

export default SignOut;
