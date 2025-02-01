import React from "react";

type AnnouncementProps = {
  id: number;
  title: string | null;
  contents: string;
  createdAt: string;
  userId: number;
};

const Announcement: React.FC<AnnouncementProps> = ({
  title,
  contents,
  createdAt,
  userId,
}) => {
  return (
    <div className="border-y-3 mt-5 my-2.5 rounded-lg bg-[#EFF2FB] w-3/4 mx-auto p-8">
      <div className="flex flex-row justify-between">
        <h2 className="text-2xl font-bold mb-0 leading-none">User {userId}</h2>
      </div>
      <p className="mb-2 text-xs text-gray-500">
        Posted: {new Date(createdAt).toDateString()}
      </p>
      <p className="text-gray-700 pb-4">{contents}</p>
    </div>
  );
};

export default Announcement;
