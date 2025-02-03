import React from "react";
import { SignInButton, useAuth, UserButton } from "@clerk/nextjs";

import NavBar from "~/components/navbar";

export default function InviteUser() {
  const { isSignedIn } = useAuth();
  return (
    <div className="absolute bottom-0 top-0 flex w-full">
      <NavBar />
      {/* <div className="sticky top-0 m-0 flex max-w-[40%] flex-col justify-between bg-[#EFF2FB] p-[16px_40px]">
        {isSignedIn ? "" : <SignInButton />}
        <UserButton afterSignOutUrl="/" showName />
        <nav style={{ display: "flex", flexDirection: "column" }}>
          <button className="m-2 rounded-[24px] border border-[#2E4D90] bg-[#2E4D90] p-2 text-white">
            <a href="/posts/">Forum</a>
          </button>
          <button className="m-2 rounded-[24px] border border-[#2E4D90] p-2">
            <a href="/announcements/">Announcements</a>
          </button>
          <button className="m-2 rounded-[24px] border border-[#2E4D90] p-2">
            <a href="/absences/">Absentees</a>
          </button>
          <button className="m-2 rounded-[24px] border border-[#2E4D90] p-2">
            <a href="/activities/">Calendar</a>
          </button>
          <button className="m-2 rounded-[24px] border border-[#2E4D90] p-2">
            <a href="/inviteuser/">Invite New User</a>
          </button>
        </nav>
        <button className="m-2 rounded-[24px] border border-[#2E4D90] p-2">
          <a href="/">Create New</a>
        </button>
      </div> */}
      <div className="flex w-full flex-col justify-center">
        <div className="pb-9 text-center text-2xl">Invite new user</div>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col justify-center pb-4"
        >
          <div className="mx-auto flex w-1/2 flex-col justify-center pb-6">
            <label htmlFor="email" className="text-base text-black">
              Email
            </label>
            <input
              type="text"
              id="email"
              className="rounded-[10px] bg-[#EFF2FB] p-2"
            />
          </div>
          <div className="mx-auto flex w-1/2 flex-col justify-center pb-8">
            <label htmlFor="password" className="text-base text-black">
              Temporary Password
            </label>
            <input
              type="password"
              id="password"
              className="rounded-[10px] bg-[#EFF2FB] p-2"
            />
          </div>
          <button className="mx-auto w-1/2 rounded-2xl bg-[#2E4D90] p-2 text-white">
            Invite
          </button>
        </form>
      </div>
    </div>
  );
}
