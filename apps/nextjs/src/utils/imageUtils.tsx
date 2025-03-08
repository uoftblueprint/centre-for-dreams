interface S3UploadResponse {
  success: boolean;
  data: {
    Location: string;
  };
}

export const inputToBuffer = async (input: HTMLInputElement) => {
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

        return buffer;
      } else {
        console.error("Base64 string is not valid.");
      }
    } else {
      console.error("Error reading file");
    }
  }
};

export const uploadImagesToS3 = (
  title: string,
  imagesTemp: Uint8Array<ArrayBufferLike>[],
) => {
  const uploadPromises = imagesTemp.map((image, index) => {
    const fileName = `uploaded-image-${title}-${index}.jpg`;
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
          throw new Error("Failed to upload image");
        }
      });
  });
  return uploadPromises;
};
