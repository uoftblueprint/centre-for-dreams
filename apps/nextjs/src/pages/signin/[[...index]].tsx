"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import Cfd from "../../../assets/web/cfd.png";

export default function SignInForm() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();

  // Handle the submission of the sign-in form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.push("/");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: unknown) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Display a form to capture the user's email and password
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
      <div className="flex w-full items-center justify-center md:w-1/2">
        <div className="w-4/5 max-w-[600px]">
          <h1 className="mb-10 flex text-5xl font-medium max-md:hidden">
            Sign in
          </h1>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex flex-col gap-8"
          >
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                name="email"
                type="email"
                value={email}
                className="mt-1 rounded-lg bg-[#f0f4fc]"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                name="password"
                type="password"
                value={password}
                className="mt-1 rounded-lg bg-[#f0f4fc]"
              />
            </div>
            <Button type="submit" className="bg-p-30 rounded-full">
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
