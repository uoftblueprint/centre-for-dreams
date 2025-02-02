import React, { useState } from "react";
import AWS from "aws-sdk";
import { useForm } from "react-hook-form";

import { api } from "~/utils/api";

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});
const s3 = new AWS.S3();

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
          const params = {
            Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
            Key: fileName,
            Body: image,
            ContentType: "image/jpeg",
          };

          // Return a promise that resolves to the uploaded image URL
          return new Promise<string>((resolve, reject) => {
            s3.upload(
              params,
              (error: Error, data: AWS.S3.ManagedUpload.SendData) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(data.Location);
                }
              },
            );
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("title", { required: true })} placeholder="Title" />
      {errors.title && <span>Title is required</span>}

      <textarea
        {...register("contents", { required: true })}
        placeholder="Content"
      />
      {errors.contents && <span>Content is required</span>}

      <button type="button" onClick={pickImage} disabled={uploading}>
        {uploading ? "Uploading..." : "Add Image"}
      </button>

      {/* <div>
        {images.map((image, index) => (
          <img key={index} src={image} alt="Uploaded preview" width={100} />
        ))}
      </div> */}

      <button type="submit">Create Post</button>
      {error && <p>Error: {error.message}</p>}
    </form>
  );
};

export default CreatePost;
