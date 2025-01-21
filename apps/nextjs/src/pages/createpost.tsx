import React, { useState } from "react";
import { useForm } from "react-hook-form";
import AWS from "aws-sdk";

import { api } from "~/utils/api";
import { env } from "../env.mjs";

AWS.config.update({
  accessKeyId: env.AWS_ACCESS_KEY,
  secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  region: env.AWS_REGION,
});
const s3 = new AWS.S3();

interface FormData {
  title: string;
  contents: string;
  images: string[];
}

const CreatePost = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const [isSuccess, setIsSuccess] = useState(false); // State to track success

  const { mutate: createDiscussion, error } =
    api.discussion.createDiscussion.useMutation({
      onSuccess: () => {
        setIsSuccess(true); // Set success state on successful mutation
        reset(); // Reset form fields
      },
      onError: (error) => {
        console.error("Error creating discussion:", error);
      },
    });

  const onSubmit = (data: FormData) => {
    createDiscussion({
      title: data.title,
      contents: data.contents,
      images: data.images,
    });
  };

  // Reset success message when user starts typing again
  const handleInputChange = () => {
    if (isSuccess) {
      setIsSuccess(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("title", { required: true })}
        placeholder="Title"
        onChange={handleInputChange}
      />
      {errors.title && <span>Title is required</span>}

      <textarea
        {...register("contents", { required: true })}
        placeholder="Content"
        onChange={handleInputChange}
      />
      {errors.contents && <span>Content is required</span>}

      <button type="submit">Create Post</button>
      {error && <p>Error: {error.message}</p>}
      {isSuccess && <p>Post created successfully!</p>}
    </form>
  );
};

export default CreatePost;
