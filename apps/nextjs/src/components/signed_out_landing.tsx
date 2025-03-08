import React from "react";
import Image from "next/image";
import { SignInButton } from "@clerk/nextjs";

import { Button } from "~/components/ui/button";
import Cfd from "../../assets/web/cfd.png";

export default function SignedOutLanding() {
  return (
    <div className="flex h-screen w-full flex-col md:flex-row">
      <div className="flex h-full flex-1 items-center justify-center p-4">
        <div className="flex flex-col items-center justify-center">
          <Image
            src={Cfd}
            alt="Description of the image"
            width={500}
            height={300}
          />
          <Button className="bg-p-30 mt-8">
            <SignInButton>Sign in</SignInButton>
          </Button>
        </div>
      </div>
    </div>
  );
}
