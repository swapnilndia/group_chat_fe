import { useState, ChangeEvent } from "react";

const FileUploadPersonal = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadUrl, setUploadUrl] = useState<string>("");
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files);
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const getSignedUrl = async (
    filename: string,
    contentType: string
  ): Promise<string | null> => {
    const response = await fetch(
      "http://localhost:3000/api/v1/messages/upload-url",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filename, contentType }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data.data;
    } else {
      console.error("Error getting signed URL");
      return null;
    }
  };

  const uploadFileToS3 = async (signedUrl: string, file: File) => {
    try {
      await fetch(signedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });
      console.log("File uploaded successfully");
      return true;
    } catch (error) {
      console.error("Error uploading file to S3:", error);
      return false;
    }
  };

  const saveMetadata = async () => {
    if (!file) return;

    const metadata = {
      chatId: "example-chat-id", // replace with actual chat ID
      userId: "example-user-id", // replace with actual user ID
      type: file.type,
      size: file.size,
    };

    const response = await fetch(
      "http://localhost:3000/api/v1/messages/save-media",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(metadata),
      }
    );

    if (response.ok) {
      setUploadSuccess(true);
      console.log("Metadata saved successfully");
    } else {
      console.error("Error saving metadata");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload");
      return;
    }

    const signedUrl = await getSignedUrl(file.name, file.type);
    if (signedUrl) {
      setUploadUrl(signedUrl);
      const success = await uploadFileToS3(signedUrl, file);
      if (success) {
        await saveMetadata(signedUrl.split("?")[0]); // The URL without query params
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {uploadSuccess && <p>File uploaded and metadata saved successfully!</p>}
    </div>
  );
};

export default FileUploadPersonal;
