import React, { useState } from "react";
import { SignInButton, useAuth, UserButton } from "@clerk/nextjs";

import CreatePost from "./createpost";

export default function NavBar() {
  const { isSignedIn } = useAuth();
  const [createPostModal, setCreatePostModal] = useState(false);

  const closeCreatePostModal = () => {
    setCreatePostModal(false);
  };

  const openCreatePostModal = () => {
    setCreatePostModal(true);
  };

  return (
    <>
      {createPostModal && <CreatePost onClose={closeCreatePostModal} />}
      <div className="sticky top-0 m-0 flex max-w-[40%] flex-col justify-between bg-[#EFF2FB] p-[16px_40px]">
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
        <button
          className="m-2 rounded-[24px] border border-[#2E4D90] p-2"
          onClick={openCreatePostModal}
        >
          Create New Post (this button is temporary)
        </button>
      </div>
    </>
  );
}
