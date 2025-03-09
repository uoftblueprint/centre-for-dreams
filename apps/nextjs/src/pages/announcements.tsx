import React, { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import type { PostType } from "@prisma/client";

import NavBar from "~/components/navbar";
import { api } from "~/utils/api";
import Announcement from "../components/announcement";
import ToggleButton from "../components/ToggleButton";

interface User {
  id: number;
  clerkId: string;
  participantId: number;
  notificationOnPostLikes: boolean;
  notificationOnPostComments: boolean;
  notificationOnAnnoucements: boolean;
  notificationOnScheduleUpdates: boolean;
}
interface AnnouncementData {
  id: number;
  title: string;
  contents: string | null;
  createdAt: Date;
  userId: number;
  images: string[];
  postType: PostType;
}

function Announcements() {
  const announcements =
    api.announcement.getAnnouncements.useQuery<AnnouncementData[]>();
  const users = api.user.getAllUsers.useQuery<User[]>();
  const { userId } = useAuth(); // Get userId from useAuth

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
    <div className="absolute bottom-0 top-0 flex w-full">
      <NavBar />
      <div className="flex w-full flex-col items-center pt-6">
        <ToggleButton
          word="Announcements"
          isToggled={myAnnouncementToggle}
          setAll={setAllAnnouncements}
          setMy={setMyAnnouncements}
        />
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
