import React, { useState } from "react";

// import Image from "next/image";

export default function CreateAnnouncement({
  user,
  onClose,
}: {
  user: { name: string; profileImage: string };
  onClose: () => void;
}) {
  const [notify, setNotify] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const [isVisible, setIsVisible] = useState(true);

  const handleToggleNotify = () => setNotify(!notify);

  const handleCreateAnnouncement = () => {
    // Handle the form submission
    console.log({ announcement, notify });
    onClose();
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="relative mx-auto mt-10 max-w-lg rounded-lg bg-white p-6 shadow-lg">
      <button
        onClick={handleClose}
        className="absolute left-2 top-2 text-gray-500 hover:text-gray-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
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
        <div className="m-2 flex max-w-max items-center gap-2 self-center">
          <label htmlFor="notify-toggle" className="text-sm font-medium">
            Notify People?
          </label>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              id="notify-toggle"
              type="checkbox"
              className="peer sr-only"
              checked={notify}
              onChange={handleToggleNotify}
              aria-label="Notify People"
            />
            <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#2E4D90] peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-[#2E4D90] dark:peer-focus:ring-[#2E4D90]"></div>
          </label>
        </div>
      </div>
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
        className="mt-6 w-full rounded-md bg-[#2E4D90] px-4 py-2 text-white hover:bg-blue-700 focus:outline-none"
      >
        Post Announcement
      </button>
    </div>
  );
}
