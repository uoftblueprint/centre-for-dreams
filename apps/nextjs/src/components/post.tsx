import type { RouterOutputs } from "../utils/api";

type GetDiscussionOutput =
  RouterOutputs["discussion"]["getDiscussions"][number];

const Post: React.FC<GetDiscussionOutput> = ({
  title,
  contents,
  createdAt,
  comments,
}) => {
  return (
    <div className="border-y-3 my-10px rounded-lg bg-white shadow-md">
      <h2 className="mb-2 text-2xl font-bold">{title}</h2>
      <p className="text-gray-700">{contents}</p>
      <p className="mt-2 text-gray-500">
        Created at: {createdAt.toDateString()}
      </p>

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
