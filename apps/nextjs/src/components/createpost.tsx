import React, { useState } from "react";
import Image from "next/image";
// import { X } from "lucide-react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";

import { api } from "~/utils/api";
import cross from "../../assets/cross.svg";
import styles from "../styles/createpost.module.css";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

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
      alert("Error occurred. Perhaps the image is too large.");
      console.log(error);
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

  return ReactDOM.createPortal(
    <>
      <div
        className="z-999 fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === "Escape") {
            onClose();
          }
        }}
      ></div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card
          className="mih-[519px] w-[824px]"
          style={{
            position: "fixed",
            top: "10%",
            left: "20%",
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              position: "absolute", // Ensure the button is positioned correctly
              width: "24px", // Set the width to 24px
              height: "24px", // Set the height to 24px
              top: "7px", // Position it 35px from the top
              left: "12px", // Position it 35px from the left
              fontSize: "24px", // Set the font size to 24px for the × symbol
              background: "transparent", // Transparent background
              border: "none", // Remove the border
              color: "#000", // Black color for the × symbol
              cursor: "pointer", // Change the cursor to a pointer to indicate it's clickable
            }}
          >
            &times;
          </button>
          <CardHeader className={styles.profileInfo}>
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
            <CardTitle className="font-inter text-[18px] font-bold leading-[21.78px] tracking-[0%]">
              User Name
            </CardTitle>
            {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">Title</Label>
                <Input
                  {...register("title", { required: true })}
                  id="title"
                  placeholder="Enter post title"
                  className="w-[754px] rounded-[10px] bg-[#EFF2FB] p-4"
                  style={{
                    top: "150px",
                    left: "35px",
                  }}
                />
                {errors.title && (
                  <span className={styles.error}>Title is required</span>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="contents">Content</Label>
                <Textarea
                  {...register("contents", { required: false })}
                  placeholder="Enter post content"
                  id="contents"
                  className="h-[254px] w-[754px] rounded-[10px] bg-[#EFF2FB] p-4"
                  style={{
                    top: "150px",
                    left: "35px",
                  }}
                />
              </div>
            </div>

            {imagesTemp.length > 0 && (
              <Carousel className="mx-auto w-4/5 max-w-xs">
                <CarouselContent>
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
                      <CarouselItem key={index}>
                        <div className="flex h-full items-center justify-center p-1">
                          <Card>
                            {/* <CardContent className="flex items-center justify-center p-6"> */}
                            {/* <div
                            className="absolute right-2 top-2 rounded-md p-1 text-neutral-950/50 opacity-0 transition-opacity group-hover:opacity-100 cursor-pointer"
                          >
                            <X className="h-4 w-4" />
                          </div> */}
                          <button
                    className={styles.removeImageButton}
                    onClick={() => removeImage(index)}
                  >
                    ×
                  </button>
                            <Image
                              src={base64String}
                              alt={`Uploaded preview ${index + 1}`}
                              width={160}
                              height={160}
                            />
                            
                            {/* </CardContent> */}
                          </Card>
                        </div>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              type="button"
              onClick={pickImage}
              className="h-[48px] w-[166px] gap-[10px] rounded-[24px] border-[1px] border-[#2E4D90] pb-[12px] pl-[16px] pr-[16px] pt-[12px]"
            >
              <Image
              // eslint-disable-next-line
                src={cross}
                alt="Cross icon"
                width={16} // adjust the size as needed
                height={16} // adjust the size as needed
                className="rotate-45 transform" // this will rotate the icon 45 degrees
              />
              Add Photos
            </Button>
            <Button
              className="relative left-[-24px] h-[48px] w-[161px] gap-[10px] rounded-[24px] bg-[#2E4D90] pb-[17px] pl-[80px] pr-[80px] pt-[17px]"
              type="submit"
            >
              Create Post
            </Button>
            {error && <p>Error: {error.message}</p>}
          </CardFooter>
        </Card>
      </form>
    </>,
    document.getElementById("portal-root")!,
  );
};

export default CreatePost;
