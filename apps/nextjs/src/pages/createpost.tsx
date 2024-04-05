import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { api } from "~/utils/api";

interface FormData {
  title: string;
  contents: string;
}

const CreatePost = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const [isSuccess, setIsSuccess] = useState(false); // State to track success

  const { mutate: createAnnouncement, error } =
    api.announcement.createAnnouncement.useMutation({
      onSuccess: () => {
        setIsSuccess(true); // Set success state on successful mutation
        reset(); // Reset form fields
      },
    });

  const onSubmit = (data: FormData) => {
    createAnnouncement({
      title: data.title,
      contents: data.contents,
      images: [],
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
