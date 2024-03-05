import type { ExpoConfig } from "@expo/config";

const defineConfig = (): ExpoConfig => ({
  name: "expo",
  slug: "expo",
  scheme: "expo",
  version: "1.0.0",
  orientation: "portrait",
  owner: process.env.EXPO_OWNER,
  // icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/landing_page.png", // Path to your splash screen image
    resizeMode: "contain",
    backgroundColor: "#1F104A",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    googleServicesFile: "./GoogleService-Info.plist",
    bundleIdentifier: "com.ryanl123.cfd",
    supportsTablet: true,
  },
  android: {
    googleServicesFile: "./google-services.json",
    package: "com.ryanl123.cfd",
    adaptiveIcon: {
      // foregroundImage: "./assets/icon.png",
      backgroundColor: "#1F104A",
    },
  },
  extra: {
    eas: {
      projectId: "d652f9e3-c7a0-4496-8342-30aeaf00305e",
    },
    clerkPublishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  },
  experiments: {
    tsconfigPaths: true,
    typedRoutes: true,
  },
  plugins: [
    "expo-router",
    "./expo-plugins/with-modify-gradle.js",
    "@react-native-firebase/app",
    [
      "expo-build-properties",
      {
        ios: {
          useFrameworks: "static",
        },
      },
    ],
  ],
});

export default defineConfig;
