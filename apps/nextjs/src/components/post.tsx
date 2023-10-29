import React from "react";

interface PostProps {
  data: {
    id: number;
    title: string;
    contents: string;
    createdAt: Date;
  };
  comments: {
    id: number;
    postId: number;
    text: string;
    createdAt: Date;
  }[];
}

const Post: React.FC<PostProps> = ({ data, comments }) => {
  const { title, contents, createdAt } = data;

  return (
    <div className="border-y-3 my-10px rounded-lg bg-white shadow-md">
      <h2 className="mb-2 text-2xl font-bold">{title}</h2>
      <p className="text-gray-700">{contents}</p>
      <p className="mt-2 text-gray-500">
        Created at: {createdAt.toDateString()}
      </p>

      {/* Render comments */}
      <div className="mb-10 mt-4">
        <h3 className="text-lg font-semibold">Comments:</h3>
        <ul>
          {comments.map((comment) => (
            <li key={comment.id} className="mt-2">
              {comment.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Post;
