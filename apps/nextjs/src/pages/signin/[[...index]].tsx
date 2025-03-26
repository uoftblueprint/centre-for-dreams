"use client";

import * as React from "react";
import Image from "next/image";
import { SignIn } from "@clerk/nextjs";

import Cfd from "../../../assets/web/cfd.png";

export default function SignInForm() {
  return (
    <div className="flex h-screen max-md:flex-col max-md:items-center max-md:justify-center">
      <div className="m-5 flex items-center justify-center rounded-xl p-5 md:flex-1 md:bg-[#EEF2FB]">
        <Image
          src={Cfd}
          width={300}
          height={300}
          alt="icon"
          className="lg:w-1/2"
        />
      </div>
      <div className="flex w-full items-center justify-center p-5 md:w-1/2">
        <SignIn
          appearance={{
            layout: {
              socialButtonsPlacement: "bottom",
              socialButtonsVariant: "iconButton",
            },
          }}
        />
      </div>
    </div>
  );
}
