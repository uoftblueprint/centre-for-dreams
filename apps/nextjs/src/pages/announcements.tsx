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
    <div
      className="flex"
      style={{
        display: "flex",
        position: "absolute",
        width: "100%",
        top: "0px",
        bottom: "0px",
      }}
    >
      <div
        className="m-10 flex"
        style={{
          flexDirection: "column",
          background: "#EFF2FB",
          margin: "0",
          padding: "16px 40px",
          maxWidth: "40%",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
        }}
      >
        {isSignedIn ? "" : <SignInButton />}
        <UserButton afterSignOutUrl="/" showName />
        <nav style={{ display: "flex", flexDirection: "column" }}>
          <button
            style={{
              borderWidth: "1px",
              borderColor: "#2E4D90",
              borderRadius: "24px",
              padding: "8px",
              margin: "8px"
            }}
          >
            <a href="/posts/">Forum</a>
          </button>
          <button
            style={{
              borderWidth: "1px",
              borderColor: "#2E4D90",
              borderRadius: "24px",
              padding: "8px",
              margin: "8px",
              backgroundColor: "#2E4D90",
              color: "#FFFFFF",
            }}
          >
            <a href="/announcements/">Announcements</a>
          </button>
          <button
            style={{
              borderWidth: "1px",
              borderColor: "#2E4D90",
              borderRadius: "24px",
              padding: "8px",
              margin: "8px",
            }}
          >
            <a href="/absences/">Absentees</a>
          </button>
          <button
            style={{
              borderWidth: "1px",
              borderColor: "#2E4D90",
              borderRadius: "24px",
              padding: "8px",
              margin: "8px",
            }}
          >
            <a href="/activities/">Calendar</a>
          </button>
          <button
            style={{
              borderWidth: "1px",
              borderColor: "#2E4D90",
              borderRadius: "24px",
              padding: "8px",
              margin: "8px",
            }}
          >
            <a href="/activities/">Invite New User</a>
          </button>
        </nav>
        <button
          style={{
            borderWidth: "1px",
            borderColor: "#2E4D90",
            borderRadius: "24px",
            padding: "8px",
            margin: "8px",
          }}
        >
          <a href="/activities/">Create New</a>
        </button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          width: "-webkit-fill-available",
          paddingTop: "24px",
        }}
      >
        <div
          style={{
            borderWidth: "1px",
            borderColor: "#2E4D90",
            borderRadius: "24px",
            margin: "8px",
            width: "max-content",
            alignSelf: "center",
          }}
        >
          {myAnnouncementToggle ? (
            <>
              <button
                style={{
                  borderRadius: "24px",
                  padding: "8px 40px 8px 40px",
                }}
                onClick={setAllAnnouncements}
              >
                All Announcements
              </button>
              <button
                style={{
                  borderRadius: "24px",
                  padding: "8px 40px 8px 40px",
                  backgroundColor: "#2E4D90",
                  color: "#FFFFFF",
                }}
                onClick={setMyAnnouncements}
              >
                My Announcements
              </button>
            </>
          ) : (
            <>
              <button
                style={{
                  borderRadius: "24px",
                  padding: "8px 40px 8px 40px",
                  backgroundColor: "#2E4D90",
                  color: "#FFFFFF",
                }}
                onClick={setAllAnnouncements}
              >
                All Announcements
              </button>
              <button
                style={{ borderRadius: "24px", padding: "8px 40px 8px 40px" }}
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
                return <Announcement key={a.id} {...a} currentUserId={currentUser?.id ?? 0} createdAt={a.createdAt.toISOString()} />;
              })
          : announcements.data?.map((a) => {
              return <Announcement key={a.id} {...a} currentUserId={currentUser?.id ?? 0} createdAt={a.createdAt.toISOString()} />;
            })}
      </div>
    </div>
  );
}

export default Announcements;