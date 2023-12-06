import React from "react";
import Constants from "expo-constants";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ClerkProvider } from "@clerk/clerk-expo";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  useFonts,
} from "@expo-google-fonts/poppins";

import { TRPCProvider } from "~/utils/api";

// This is the main layout of the app
// It wraps your pages with the providers they need
const RootLayout = () => {
  const [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
  });
  if (!fontsLoaded && !fontError) return null;

  return (
    <ClerkProvider
      publishableKey={String(Constants.expoConfig?.extra?.clerkPublishableKey)}
    >
      <TRPCProvider>
        {/*
        The Stack component displays the current page.
        It also allows you to configure your screens 
      */}
        <Stack />
        <StatusBar />
      </TRPCProvider>
    </ClerkProvider>
  );
};

export default RootLayout;
