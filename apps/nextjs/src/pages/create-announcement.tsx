import React from "react";

import CreateAnnouncement from "~/components/announcement/createannouncement";

const currentUser = {
  username: "john_doe",
  avatarUrl: "https://github.com/shadcn.png",
};

const CreateAnnouncementPage = () => {
  return (
    <div>
      <h1>Create Announcement</h1>
      <CreateAnnouncement user={currentUser} />
    </div>
  );
};

export default CreateAnnouncementPage;
