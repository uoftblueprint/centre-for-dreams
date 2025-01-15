import { useEffect, useState } from "react";

import type { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

type GetDiscussionOutput =
  RouterOutputs["discussion"]["getDiscussions"][number];

const Post: React.FC<GetDiscussionOutput> = ({
  contents,
  createdAt,
  comments,
  userId,
  id,
}) => {
  const { data: likesCountData } = api.like.getLikesCountForDiscussion.useQuery(
    {
      postId: id,
    },
  );

  const { data: userLikesData } = api.like.hasUserLikedPost.useQuery({
    postId: id,
  });

  const [isLiked, setIsLiked] = useState(userLikesData?.isLikedByUser ?? false);
  const [likesCount, setLikesCount] = useState(likesCountData?.likesCount ?? 0);

  const [comment, setComment] = useState("");

  useEffect(() => {
    setLikesCount(likesCountData?.likesCount ?? 0);
    setIsLiked(userLikesData?.isLikedByUser ?? false);
  }, [id, likesCountData?.likesCount, userLikesData?.isLikedByUser]);

  const [modalVisible, setModalVisibile] = useState(false);

  const likeMutation = api.like.likePost.useMutation({
    onSuccess: () => {
      setIsLiked(true);
      setLikesCount((prev) => prev + 1);
    },
    onError: () => {
      console.log("Failed to like post");
    },
  });

  const unlikeMutation = api.like.unlikePost.useMutation({
    onSuccess: () => {
      setIsLiked(false);
      setLikesCount((prev) => prev - 1);
    },
    onError: () => {
      console.log("Failed to unlike post");
    },
  });

  const handleLike = () => {
    if (isLiked) {
      unlikeMutation.mutate({ postId: id });
    } else {
      likeMutation.mutate({ postId: id });
    }
  };

  const closeModal = () => {
    setModalVisibile(false);
  };

  const openModal = () => {
    setModalVisibile(true);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const commentMutation = api.comment.create.useMutation();

  const handleCommentSubmit = async () => {
    if (comment.trim() === "") return;

    try {
      await commentMutation.mutateAsync({
        postId: id,
        text: comment,
      });
      setComment("");
    } catch (error) {
      console.error("Failed to submit comment:", error);
    }
  };

  return (
    <>
      <div
        className="border-y-3 my-10px rounded-lg"
        style={{
          backgroundColor: "#EFF2FB",
          width: "70%",
          margin: "1.5rem auto",
          padding: "2rem",
        }}
      >
        {/* // TODO: when participant api is created, replace userId with the result of this API */}

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
          <button style={{ width: "20px" }}>
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
        <p className="mb-2 text-xs text-gray-500">
          Posted: {createdAt.toDateString()}
        </p>

        <p className="text-gray-700" style={{ paddingBottom: "16px" }}>
          {contents}
        </p>

        <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
          <button
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "5px",
              cursor: "pointer",
            }}
            onClick={handleLike}
          >
            <svg
              width="19"
              height="18"
              viewBox="0 0 19 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 8V16C5 16.2652 4.89464 16.5196 4.70711 16.7071C4.51957 16.8946 4.26522 17 4 17H2C1.73478 17 1.48043 16.8946 1.29289 16.7071C1.10536 16.5196 1 16.2652 1 16V9C1 8.73478 1.10536 8.48043 1.29289 8.29289C1.48043 8.10536 1.73478 8 2 8H5ZM5 8C6.06087 8 7.07828 7.57857 7.82843 6.82843C8.57857 6.07828 9 5.06087 9 4V3C9 2.46957 9.21071 1.96086 9.58579 1.58579C9.96086 1.21071 10.4696 1 11 1C11.5304 1 12.0391 1.21071 12.4142 1.58579C12.7893 1.96086 13 2.46957 13 3V8H16C16.5304 8 17.0391 8.21071 17.4142 8.58579C17.7893 8.96086 18 9.46957 18 10L17 15C16.8562 15.6135 16.5834 16.1402 16.2227 16.501C15.8619 16.8617 15.4328 17.0368 15 17H8C7.20435 17 6.44129 16.6839 5.87868 16.1213C5.31607 15.5587 5 14.7956 5 14"
                stroke="#2E4D90"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <p> {likesCount} </p>
          </button>

          <button
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "5px",
              cursor: "pointer",
            }}
            onClick={openModal}
            onKeyDown={openModal}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 19C11.78 19 13.5201 18.4722 15.0001 17.4832C16.4802 16.4943 17.6337 15.0887 18.3149 13.4442C18.9961 11.7996 19.1743 9.99002 18.8271 8.24419C18.4798 6.49836 17.6226 4.89472 16.364 3.63604C15.1053 2.37737 13.5016 1.5202 11.7558 1.17294C10.01 0.82567 8.20038 1.0039 6.55585 1.68509C4.91131 2.36628 3.50571 3.51983 2.51677 4.99987C1.52784 6.47991 1 8.21997 1 10C1 11.488 1.36 12.891 2 14.127L1 19L5.873 18C7.109 18.64 8.513 19 10 19Z"
                stroke="#2E4D90"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <p> {comments.length} </p>
          </button>
        </div>
      </div>

      {modalVisible && (
        <div
          style={{
            position: "absolute",
            backgroundColor: "#EFF2FBCC",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <div
            className="modal"
            style={{
              backgroundColor: "white",
              position: "absolute",
              top: "2rem",
              left: "2rem",
              right: "2rem",
              bottom: "2rem",
              margin: "10px;",
              borderRadius: "10px",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 10fr 1fr",
                gridTemplateRows: "repeat(1, 1fr)",
                height: "100%",
              }}
            >
              <div
                className="left-two-thirds"
                style={{ gridArea: "1 / 1 / 2 / 2" }}
              >
                <button
                  className="exit-out"
                  style={{ padding: "1.5rem 1.5rem" }}
                  onClick={closeModal}
                >
                  X
                </button>
              </div>
              <div
                className="right-one-third"
                style={{
                  gridArea: "1 / 2 / 2 / 3",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  marginTop: "2rem",
                }}
              >
                <div
                  style={{
                    height: "50%",
                    justifyContent: "start",
                    display: "flex",
                    flexDirection: "column",
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
                  </div>
                  <p className="mb-2 text-xs text-gray-500">
                    Posted: {createdAt.toDateString()}
                  </p>

                  <p
                    className="text-gray-700"
                    style={{ paddingBottom: "24px" }}
                  >
                    {contents}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "20px",
                    }}
                  >
                    <button
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "5px",
                        cursor: "pointer",
                      }}
                      onClick={handleLike}
                    >
                      <svg
                        width="19"
                        height="18"
                        viewBox="0 0 19 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 8V16C5 16.2652 4.89464 16.5196 4.70711 16.7071C4.51957 16.8946 4.26522 17 4 17H2C1.73478 17 1.48043 16.8946 1.29289 16.7071C1.10536 16.5196 1 16.2652 1 16V9C1 8.73478 1.10536 8.48043 1.29289 8.29289C1.48043 8.10536 1.73478 8 2 8H5ZM5 8C6.06087 8 7.07828 7.57857 7.82843 6.82843C8.57857 6.07828 9 5.06087 9 4V3C9 2.46957 9.21071 1.96086 9.58579 1.58579C9.96086 1.21071 10.4696 1 11 1C11.5304 1 12.0391 1.21071 12.4142 1.58579C12.7893 1.96086 13 2.46957 13 3V8H16C16.5304 8 17.0391 8.21071 17.4142 8.58579C17.7893 8.96086 18 9.46957 18 10L17 15C16.8562 15.6135 16.5834 16.1402 16.2227 16.501C15.8619 16.8617 15.4328 17.0368 15 17H8C7.20435 17 6.44129 16.6839 5.87868 16.1213C5.31607 15.5587 5 14.7956 5 14"
                          stroke="#2E4D90"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>

                      <p> {likesCount} </p>
                    </button>

                    <button
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "5px",
                        cursor: "pointer",
                      }}
                      onClick={openModal}
                      onKeyDown={openModal}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 19C11.78 19 13.5201 18.4722 15.0001 17.4832C16.4802 16.4943 17.6337 15.0887 18.3149 13.4442C18.9961 11.7996 19.1743 9.99002 18.8271 8.24419C18.4798 6.49836 17.6226 4.89472 16.364 3.63604C15.1053 2.37737 13.5016 1.5202 11.7558 1.17294C10.01 0.82567 8.20038 1.0039 6.55585 1.68509C4.91131 2.36628 3.50571 3.51983 2.51677 4.99987C1.52784 6.47991 1 8.21997 1 10C1 11.488 1.36 12.891 2 14.127L1 19L5.873 18C7.109 18.64 8.513 19 10 19Z"
                          stroke="#2E4D90"
                          strokeWidth="1.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>

                      <p> {comments.length} </p>
                    </button>
                  </div>
                </div>

                <div className="mb-10 mt-4" style={{ height: "50%" }}>
                  <h3 className="text-lg font-semibold">Comments</h3>
                  <ul style={{ paddingBottom: "8px" }}>
                    {comments.map((comment) => (
                      <li key={comment.id} className="mt-2">
                        {/* TODO: replace userId with the user's name after the participant API is implemented */}
                        <strong>User {comment.userId}</strong> <br />
                        {comment.text}
                      </li>
                    ))}
                  </ul>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      borderWidth: "1px",
                      borderColor: "#2E4D90",
                      borderRadius: "8px",
                      width: "min-content",
                      alignItems: "center",
                    }}
                  >
                    <input
                      id="comment_box"
                      value={comment}
                      onChange={handleCommentChange}
                      type="text"
                      placeholder="Add a comment"
                      style={{
                        borderWidth: "1px",
                        borderColor: "#2E4D90",
                        borderRadius: "8px",
                        padding: "4px",
                        borderTop: "none",
                        borderRight: "none",
                        borderBottom: "none",
                      }}
                    />
                    <button
                      style={{ height: "100%" }}
                      onClick={handleCommentSubmit}
                    >
                      <svg
                        width="18"
                        height="20"
                        viewBox="0 0 18 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ padding: "2px" }}
                      >
                        <path
                          d="M11 1L11 11C11 15.4183 7.41828 19 3 19L1 19M11 1L5 7M11 1L17 7"
                          stroke="#79767D"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Post;
