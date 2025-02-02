import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { api } from "~/utils/api";

interface FormData {
  title: string;
  contents: string;
  images: string[];
}

const CreatePost = () => {
  const [images, setImages] = useState<string[]>([]);

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

  const pickImage = async () => {
    try {
      // Open file picker for image selection
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = async (event) => {
        const fileInput = event.target as HTMLInputElement;
        const file = fileInput?.files ? fileInput.files[0] : null;
        if (file) {
          imageUpload(file); //
        }
      };

      input.click();
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  const imageUpload = async (file: File) => {
    const reader = new FileReader();
  
    reader.onloadend = () => {
      const imageUrl = reader.result as string;
      setImages((prev) => [...prev, imageUrl]);
    };
  
    reader.readAsDataURL(file);
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
