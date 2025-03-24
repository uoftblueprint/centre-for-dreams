"use client";

import { useAuth } from "@clerk/nextjs";

import NavBar from "~/components/navbar";
import SignedInLanding from "~/components/signed_in_landing";
import SignedOutLanding from "~/components/signed_out_landing";
import { NoSsr } from "../components/no-ssr";

export const dynamic = "force-dynamic";

export default function Home() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return (
      <NoSsr>
        <div className="absolute bottom-0 top-0 flex w-full">
          <NavBar />
          <div className="flex w-full flex-col justify-center">
            <SignedInLanding />
          </div>
        </div>
      </NoSsr>
    );
  }

  return <SignedOutLanding />;
}
