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

interface CreatePostProps {
  onClose: () => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ onClose }) => {
  const [imagesTemp, setImagesTemp] = useState<Uint8Array[]>([]);
  // const [uploading, setUploading] = useState(false);

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
        onClose();
      },
      onError: (error) => {
        console.error("Error creating discussion:", error);
      },
    });

  const removeImage = (index: number) => {
    setImagesTemp((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: FormData) => {
    if (data.title === "") {
      console.error("Title is required.");
      return;
    }

    // setUploading(true);
    let uploadedImages: string[] = [];

    try {
      if (imagesTemp.length !== 0) {
        // Step 1: Create an array to store upload promises
        const uploadPromises = imagesTemp.map((image, index) => {
          const fileName = `uploaded-image-${data.title}-${index}.jpg`;
          const base64Image = btoa(String.fromCharCode(...image));
          console.log("here");
          return fetch("/api/upload_to_s3", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              bucket: "cfd-post-image-upload",
              key: fileName,
              body: base64Image,
              contentType: "image/jpeg",
            }),
          })
            .then((response) => response.json())
            .then((result: S3UploadResponse) => {
              if (result.success) {
                return result.data.Location; // Image URL from S3
              } else {
                alert(
                  "Failed to upload image. Perhaps the image is too large.",
                );
                throw new Error("Failed to upload image");
              }
            });
        });

        // Step 2: Wait for all uploads to complete
        uploadedImages = await Promise.all(uploadPromises);
        createDiscussion({
          title: data.title,
          contents: data.contents,
          images: uploadedImages,
        });
        // reset(); // Reset the form
        // setImagesTemp([]); // Clear images
        // } else if (imagesTemp.length !== 0 && !AWS.config.credentials) {
        //   // If AWS credentials are not set, display the hardcoded El Gato image
        //   alert("AWS credentials missing. Images cannot be uploaded.");
      } else if (imagesTemp.length === 0) {
        createDiscussion({
          title: data.title,
          contents: data.contents,
          images: [],
        });
        // reset(); // Reset the form
      }
    } catch (error) {
      console.error("Error during image upload or discussion creation:", error);
    } finally {
      // setUploading(false);
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
            setImagesTemp((prev) => [...prev, buffer]);
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
    <>
      <div className="overlay"></div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <button type="button" className={styles.closeButton} onClick={onClose}>
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
            {...register("contents", { required: false })}
            placeholder="Enter post content"
            id="contents"
            className={styles.textarea}
          />
        </div>

        {imagesTemp.length > 0 && (
          <div className={styles.imagePreviewContainer}>
            {imagesTemp.map((image, index) => {
              const uint8ArrayToBase64 = (uint8Array: Uint8Array) => {
                let binary = "";
                uint8Array.forEach((byte) => {
                  binary += String.fromCharCode(byte);
                });
                return `data:image/png;base64,${btoa(binary)}`;
              };

              const base64String = uint8ArrayToBase64(image);
              return (
                <div key={index} className={styles.imagePreviewWrapper}>
                  <button
                    className={styles.removeImageButton}
                    onClick={() => removeImage(index)}
                  >
                    ×
                  </button>
                  <Image
                    src={base64String}
                    alt={`Uploaded preview ${index + 1}`}
                    className={styles.imagePreview}
                    width={160}
                    height={160}
                  />
                </div>
              );
            })}
          </div>
        )}

        <div className={styles.buttons}>
          <button
            type="button"
            onClick={pickImage}
            // disabled={uploading}
            className={styles.outlinedButton}
          >
            <span className={styles.icon}></span>
            <span className={styles.buttonText}>
              {/* {uploading ? "Uploading..." : "Add Photos"} */}
              Add Photos
            </span>
          </button>

          <button type="submit" className={styles.submitButton}>
            Create Post
          </button>
        </div>
        {error && <p className={styles.errorMessage}>Error: {error.message}</p>}
      </form>
    </>
  );
};

export default CreatePost;
