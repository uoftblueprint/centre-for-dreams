import React from "react";

interface AnnouncementProps {
  id: number;
  title: string | null;
  contents: string;
  createdAt: string;
  userId: number;
  currentUserId: number;
}

const Announcement: React.FC<AnnouncementProps> = ({
  contents,
  createdAt,
  userId,
  currentUserId,
}) => {
  const isCurrentUser = userId === currentUserId;

  const handleEdit = () => {
    // Implement edit logic here
  };

  const handleDelete = () => {
    // Implement delete logic here
  };

  return (
    <div
      className="border-y-3 my-10px rounded-lg"
      style={{
        backgroundColor: "#EFF2FB",
        width: "70%",
        margin: "1.5rem auto",
        padding: "2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <h2
          className="text-2xl font-bold"
          style={{ marginBottom: "0", lineHeight: "1" }}
        >
          User {userId}
        </h2>
        {isCurrentUser && (
          <div style={{ display: "flex", gap: "15px" }}>
            <button onClick={handleDelete} style={{ width: "20px" }}>
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 5.5H5H17M8 5.5V3.5C8 3.23478 8.10536 2.98043 8.29289 2.79289C8.48043 2.60536 8.73478 2.5 9 2.5H11C11.2652 2.5 11.5196 2.60536 11.7071 2.79289C11.8946 2.98043 12 3.23478 12 3.5V5.5M15 5.5V17.5C15 17.7652 14.8946 18.0196 14.7071 18.2071C14.5196 18.3946 14.2652 18.5 14 18.5H6C5.73478 18.5 5.48043 18.3946 5.29289 18.2071C5.10536 18.0196 5 17.7652 5 17.5V5.5H15Z"
                  stroke="#111827"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button onClick={handleEdit} style={{ width: "20px" }}>
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.2322 3.23223L16.7677 6.76777M14.7322 1.73223C15.7085 0.755922 17.2914 0.755922 18.2677 1.73223C19.244 2.70854 19.244 4.29146 18.2677 5.26777L4.5 19.0355H1V15.4644L14.7322 1.73223Z"
                  stroke="#111827"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
      <p className="mb-2 text-xs text-gray-500">
        Posted: {new Date(createdAt).toDateString()}
      </p>

      <p className="text-gray-700" style={{ paddingBottom: "16px" }}>
        {contents}
      </p>
    </div>
  );
};

export default Announcement;
