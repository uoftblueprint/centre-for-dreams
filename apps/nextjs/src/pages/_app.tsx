import "~/styles/globals.css";

import type { AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";

import { Toaster } from "~/components/ui/sonner";
import { api } from "~/utils/api";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <Component {...pageProps} />
      <Toaster />
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
