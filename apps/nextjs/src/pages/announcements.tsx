import React, { useState } from "react";
import { SignInButton, useAuth, UserButton } from "@clerk/nextjs";

import { api } from "~/utils/api";
import Announcement from "../components/announcement";

function Announcements() {
  const announcements = api.announcement.getAnnouncements.useQuery();
  const users = api.user.getAllUsers.useQuery();
  const { userId, isSignedIn } = useAuth(); // Get userId from useAuth

  const [myAnnouncementToggle, setMyAnnouncementToggle] = useState(true);

  const setMyAnnouncements = () => {
    setMyAnnouncementToggle(true);
  };

  const setAllAnnouncements = () => {
    setMyAnnouncementToggle(false);
  };

  // Find the user whose clerkId matches the userId from useAuth
  const currentUser = users.data?.find((user) => user.clerkId === userId);

  return (
    <div className="flex absolute w-full top-0 bottom-0">
      <div className="flex flex-col bg-[#EFF2FB] p-4 max-w-[40%] justify-between sticky top-0">
        {isSignedIn ? "" : <SignInButton />}
        <UserButton afterSignOutUrl="/" showName />
        <nav className="flex flex-col">
          <button className="border border-[#2E4D90] rounded-3xl p-2 m-2">
            <a href="/posts/">Forum</a>
          </button>
          <button className="border border-[#2E4D90] rounded-3xl p-2 m-2 bg-[#2E4D90] text-white">
            <a href="/announcements/">Announcements</a>
          </button>
          <button className="border border-[#2E4D90] rounded-3xl p-2 m-2">
            <a href="/absences/">Absentees</a>
          </button>
          <button className="border border-[#2E4D90] rounded-3xl p-2 m-2">
            <a href="/activities/">Calendar</a>
          </button>
          <button className="border border-[#2E4D90] rounded-3xl p-2 m-2">
            <a href="/activities/">Invite New User</a>
          </button>
        </nav>
        <button className="border border-[#2E4D90] rounded-3xl p-2 m-2">
          <a href="/activities/">Create New</a>
        </button>
      </div>
      <div className="flex flex-col items-center w-full pt-6">
        <div className="border border-[#2E4D90] rounded-3xl m-2 max-w-max self-center">
          {myAnnouncementToggle ? (
            <>
              <button
                className="rounded-3xl p-2 px-10"
                onClick={setAllAnnouncements}
              >
                All Announcements
              </button>
              <button
                className="rounded-3xl p-2 px-10 bg-[#2E4D90] text-white"
                onClick={setMyAnnouncements}
              >
                My Announcements
              </button>
            </>
          ) : (
            <>
              <button
                className="rounded-3xl p-2 px-10 bg-[#2E4D90] text-white"
                onClick={setAllAnnouncements}
              >
                All Announcements
              </button>
              <button
                className="rounded-3xl p-2 px-10"
                onClick={setMyAnnouncements}
              >
                My Announcements
              </button>
            </>
          )}
        </div>
        {myAnnouncementToggle
          ? announcements.data
              ?.filter((a) => a.userId === currentUser?.id) // Filter announcements by userId
              .map((a) => {
                return (
                  <Announcement
                    key={a.id}
                    {...a}
                    currentUserId={currentUser?.id ?? 0}
                    createdAt={a.createdAt.toISOString()}
                  />
                );
              })
          : announcements.data?.map((a) => {
              return (
                <Announcement
                  key={a.id}
                  {...a}
                  currentUserId={currentUser?.id ?? 0}
                  createdAt={a.createdAt.toISOString()}
                />
              );
            })}
      </div>
    </div>
  );
}

export default Announcements;