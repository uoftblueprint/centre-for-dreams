import React, { useState } from "react";
import Image from "next/image";

export default function CreateAnnouncement({
  user,
  onClose,
}: {
  user: { name: string; profileImage: string };
  onClose: () => void;
}) {
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
          className="hover:text-gray-1000 text-gray-900 focus:outline-none"
        >
          &times;
        </button>

        {/* User Info and Notify Toggle */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={user.profileImage}
            alt="Profile"
            className="h-10 w-10 rounded-full"
          />
          <p className="text-lg font-medium">{user.name}</p>
        </div>
        <div className="m-2 max-w-max self-center">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={notify}
              onChange={() => setNotify(!notify)}
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-[#2E4D90] dark:peer-focus:ring-[#2E4D90] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2E4D90]"></div>
          </label>
        </div>
      </div>

        {/* Text Area */}
        <textarea
          className="mt-4 w-full rounded-md border border-gray-300 bg-gray-100 p-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          rows={4}
          placeholder="Write your announcement here..."
          value={announcement}
          onChange={(e) => setAnnouncement(e.target.value)}
        ></textarea>

        {/* Submit Button */}
        <button
          onClick={handleCreateAnnouncement}
          className="mt-6 w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none"
        >
          Post Announcement
        </button>
      </div>
    </div>
  );
}