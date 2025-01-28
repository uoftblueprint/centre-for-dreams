import React, { useState } from "react";

export default function CreateAnnouncement({ user, onClose }: { user: { name: string; profileImage: string }; onClose: () => void }) {
  const [notify, setNotify] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  const handleToggleNotify = () => setNotify(!notify);

  const handleCreateAnnouncement = () => {
    // Handle the form submission
    console.log({ announcement, notify });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="text-gray-900 hover:text-gray-1000 focus:outline-none"
        >
          &times;
        </button>

        {/* User Info */}
        <div className="mt-4 flex items-center gap-3">
          <img
            src={user.profileImage}
            alt="Profile"
            className="h-10 w-10 rounded-full"
          />
          <p className="text-lg font-medium">{user.name}</p>
        </div>

        {/* Text Area */}
        <textarea
          className="mt-4 w-full rounded-md border border-gray-300 bg-gray-100 p-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          rows={4}
          placeholder="Write your announcement here..."
          value={announcement}
          onChange={(e) => setAnnouncement(e.target.value)}
        ></textarea>

        {/* Notify Toggle */}
        <div className="mt-4 flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm font-medium">
            Notify People?
            <input
              type="checkbox"
              className="toggle"
              checked={notify}
              onChange={handleToggleNotify}
            />
          </label>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleCreateAnnouncement}
          className="mt-6 w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none"
        >
          Create Announcement
        </button>
      </div>
    </div>
  );
}

