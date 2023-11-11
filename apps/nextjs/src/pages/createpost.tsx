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
    });
  };

  // Reset success message when user starts typing again
  const handleInputChange = () => {
    if (isSuccess) {
      setIsSuccess(false);
    }
  };

  // Define styles using React.CSSProperties
  const styles: Record<string, React.CSSProperties> = {
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      maxWidth: "500px",
      margin: "0 auto",
      padding: "20px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    input: {
      padding: "10px",
      borderRadius: "4px",
      border: "1px solid #ccc",
    },
    textarea: {
      height: "150px",
      padding: "10px",
      borderRadius: "4px",
      border: "1px solid #ccc",
    },
    button: {
      padding: "10px 15px",
      borderRadius: "4px",
      border: "none",
      backgroundColor: "#007bff",
      color: "white",
      cursor: "pointer",
    },
    error: {
      color: "red",
      fontSize: "0.8rem",
    },
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
      <input
        {...register("title", { required: true })}
        placeholder="Title"
        style={styles.input}
        onChange={handleInputChange}
      />
      {errors.title && <span style={styles.error}>Title is required</span>}

      <textarea
        {...register("contents", { required: true })}
        placeholder="Content"
        style={styles.textarea}
        onChange={handleInputChange}
      />
      {errors.contents && <span style={styles.error}>Content is required</span>}

      <button type="submit" style={styles.button}>
        Create Post
      </button>
      {error && <p style={styles.error}>Error: {error.message}</p>}
      {isSuccess && <p style={styles.success}>Post created successfully!</p>}
    </form>
  );
};

export default CreatePost;
