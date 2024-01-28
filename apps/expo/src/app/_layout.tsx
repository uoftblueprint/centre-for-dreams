import React, { useEffect } from "react";
import { RootSiblingParent } from "react-native-root-siblings";
import Constants from "expo-constants";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { ClerkProvider } from "@clerk/clerk-expo";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  useFonts,
} from "@expo-google-fonts/poppins";

import { TRPCProvider } from "~/utils/api";

void SplashScreen.preventAutoHideAsync();

// This is the main layout of the app
// It wraps your pages with the providers they need
const RootLayout = () => {
  const [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
  });

  useEffect(() => {
    async function prepare() {
      try {
        if (fontsLoaded && !fontError) {
          await SplashScreen.hideAsync();
        }
      } catch (error) {
        console.warn("Error hiding splash screen", error);
      }
    }

    void prepare();
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <ClerkProvider
      publishableKey={String(Constants.expoConfig?.extra?.clerkPublishableKey)}
    >
      <RootSiblingParent>
        <TRPCProvider>
          {/*
        The Stack component displays the current page.
        It also allows you to configure your screens 
      */}
          <Stack />
          <StatusBar />
        </TRPCProvider>
      </RootSiblingParent>
    </ClerkProvider>
  );
};

export default RootLayout;
