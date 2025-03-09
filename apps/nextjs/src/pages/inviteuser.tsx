import React from "react";

import NavBar from "~/components/navbar";

export default function InviteUser() {
  return (
    <div className="absolute bottom-0 top-0 flex w-full">
      <NavBar />
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
