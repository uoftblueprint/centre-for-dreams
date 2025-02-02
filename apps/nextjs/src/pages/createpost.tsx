import React, { useState } from "react";
import Image from "next/image";
import AWS from "aws-sdk";
import { useForm } from "react-hook-form";

import { api } from "~/utils/api";
import styles from "../styles/createpost.module.css";

interface S3UploadResponse {
  success: boolean;
  data: {
    Location: string;
  };
}

interface FormData {
  title: string;
  contents: string;
  images: string[];
}

const CreatePost = () => {
  const [imagesTemp, setImagesTemp] = useState<Uint8Array[]>([]);
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const { mutate: createDiscussion, error } =
    api.discussion.createDiscussion.useMutation({
      onSuccess: () => {
        reset();
        setImagesTemp([]);
      },
      onError: (error) => {
        console.error("Error creating discussion:", error);
      },
    });

  const onSubmit = async (data: FormData) => {
    if (data.title === "") {
      console.error("Title is required.");
      return;
    }

    setUploading(true);
    let uploadedImages: string[] = [];

    try {
      if (imagesTemp.length !== 0 && AWS.config.credentials) {
        // Step 1: Create an array to store upload promises
        const uploadPromises = imagesTemp.map((image, index) => {
          const fileName = `uploaded-image-${data.title}-${index}.jpg`;
          const body = new Uint8Array(image).toString();

          return fetch("/api/upload_to_s3", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              bucket: "cfd-post-image-upload",
              key: fileName,
              body,
              contentType: "image/jpeg",
            }),
          })
            .then((response) => response.json())
            .then((result: S3UploadResponse) => {
              if (result.success) {
                return result.data.Location; // Image URL from S3
              } else {
                throw new Error("Failed to upload image");
              }
            });
        });

        // Step 2: Wait for all uploads to complete
        uploadedImages = await Promise.all(uploadPromises);
      }

      // Proceed to create the discussion with uploaded images (if any)
      createDiscussion({
        title: data.title,
        contents: data.contents,
        images: uploadedImages,
      });
      reset(); // Reset the form
      setImagesTemp([]); // Clear images
    } catch (error) {
      console.error("Error during image upload or discussion creation:", error);
      // Handle errors appropriately
      if (!AWS.config.credentials) {
        console.error("AWS credentials missing. Images cannot be uploaded.");
      } else {
        console.error(
          "An error occurred while creating the discussion. Please try again.",
        );
      }
    } finally {
      setUploading(false);
    }
  };

  const pickImage = async () => {
    try {
      // Create file input element
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";

      // Wait for the file to be selected
      const fileSelected = new Promise<File | null>((resolve) => {
        input.onchange = (event) => {
          const fileInput = event.target as HTMLInputElement;
          resolve(fileInput?.files?.[0] ?? null);
        };
        input.click();
      });

      const file = await fileSelected;

      if (file) {
        const reader = new FileReader();

        // Return a promise that resolves when the file is read
        const fileRead = new Promise<string>((resolve, reject) => {
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = (error) => reject(error);
          reader.readAsDataURL(file); // Read file as base64
        });

        const base64 = await fileRead;

        if (base64) {
          // Check if base64 contains a valid data URL format
          const base64Data = base64.split(",")[1]; // Extract the base64-encoded string

          if (base64Data) {
            // Convert Base64 to binary
            const binary = atob(base64Data);

            // Convert binary to Buffer for S3 upload
            const buffer = new Uint8Array(
              binary.split("").map((char) => char.charCodeAt(0)),
            );

            // Example: Storing in a temporary array
            setImagesTemp([...imagesTemp, buffer]);
          } else {
            console.error("Base64 string is not valid.");
          }
        } else {
          console.error("Error reading file");
        }
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <button
        type="button"
        className={styles.closeButton}
        // onClick={closeForm}
      >
        &times;
      </button>
      <div className={styles.profileInfo}>
        <div className={styles.profilePictureWrapper}>
          <Image
            src={
              "https://static.wikia.nocookie.net/acc-official-database/images/9/91/El_gato.jpg/revision/latest?cb=20220709001857"
            }
            alt="Profile"
            className={styles.profilePicture}
            width={80}
            height={80}
            priority // Ensures the profile image is prioritized for loading
          />
        </div>
        <span className={styles.userName}>User Name</span>
      </div>

      <div className={styles.inputWrapper}>
        <label htmlFor="title" className={styles.label}>
          Title
        </label>
        <input
          {...register("title", { required: true })}
          placeholder="Enter post title"
          id="title"
          className={styles.input}
        />
        {errors.title && (
          <span className={styles.error}>Title is required</span>
        )}
      </div>

      <div className={styles.inputWrapper}>
        <label htmlFor="contents" className={styles.label}>
          Content
        </label>
        <textarea
          {...register("contents", { required: true })}
          placeholder="Enter post content"
          id="contents"
          className={styles.textarea}
        />
        {errors.contents && (
          <span className={styles.error}>Content is required</span>
        )}
      </div>

      <button
        type="button"
        onClick={pickImage}
        disabled={uploading}
        className={styles.outlinedButton}
      >
        <span className={styles.icon}></span>
        <span className={styles.buttonText}>{uploading ? "Uploading..." : "Add Photos"}</span>
      </button>

      <button type="submit" className={styles.submitButton}>
        Create Post
      </button>
      {error && <p className={styles.errorMessage}>Error: {error.message}</p>}
    </form>
  );
};

export default CreatePost;
