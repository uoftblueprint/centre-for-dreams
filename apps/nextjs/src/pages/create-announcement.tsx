import React from "react";

import CreateAnnouncement from "../components/createannouncement";

const CreateAnnouncementPage: React.FC = () => {
  // Mock user object
  const mockUser = {
    name: "John Doe",
    profileImage: "https://via.placeholder.com/150",
  };

  // Mock onClose function
  const handleClose = () => {
    console.log("Modal closed");
  };

  return (
    <div>
      <h1>Create Announcement</h1>
      <CreateAnnouncement user={mockUser} onClose={handleClose} />
    </div>
  );
};

export default CreateAnnouncementPage;
