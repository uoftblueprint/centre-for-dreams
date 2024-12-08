import type { ExpoConfig } from "@expo/config";

const defineConfig = (): ExpoConfig => ({
  name: "Centre for Dreams",
  slug: "centre-for-dreams",
  scheme: "expo",
  version: "1.0.0",
  orientation: "portrait",
  owner: process.env.EXPO_OWNER,
  // icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/landing_page.png",
    resizeMode: "contain",
    backgroundColor: "#FFFFFF",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    bundleIdentifier: "your.bundle.identifier",
    supportsTablet: true,
    newArchEnabled: true, // Enable New Architecture for iOS
  },
  android: {
    package: "your.bundle.identifier",
    adaptiveIcon: {
      // foregroundImage: "./assets/icon.png",
      backgroundColor: "#FFFFFF",
    },
    newArchEnabled: true, // Enable New Architecture for Android
  },
  extra: {
    eas: {
      projectId: process.env.EXPO_PROJECT_ID_CFD,
    },
    clerkPublishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY_CFD,
  },
  experiments: {
    tsconfigPaths: true,
    typedRoutes: true,
  },
  plugins: [
    "expo-router",
    "./expo-plugins/with-modify-gradle.js",
    "expo-font",
    "expo-secure-store",
  ],
});

export default defineConfig;
