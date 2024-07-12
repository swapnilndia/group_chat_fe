import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import * as React from "react";
import { useState, ChangeEvent } from "react";
import { Socket } from "socket.io-client";
const Base_url = import.meta.env.VITE_BASE_URL;
export default function AddAttachmentDialog_Group({
  open,
  setOpen,
  sender_id,
  sender_name,
  group_id,
  socket,
  room_id,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sender_id: number;
  sender_name: string;
  group_id: number;
  socket: Socket;
  room_id: string;
}) {
  const [file, setFile] = useState<File | null>(null);

  const handleClose = () => {
    setOpen(false);
    setFile(null);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
  };
  console.log(file);
  const getSignedUrl = async (
    filename: string,
    contentType: string,
    key: string
  ): Promise<string | null> => {
    try {
      const response = await fetch(`${Base_url}/messages/upload-url`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filename, contentType, key }),
      });
      if (!response.ok) {
        throw new Error("Failed to get signed URL");
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error getting signed URL:", error);
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

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload");
      return;
    }

    try {
      const fileFolder = file.type.split("/")[0];
      const key = `uploads/${fileFolder}/${Date.now()}-${file.name}`;
      console.log(key);
      const signedUrl = await getSignedUrl(file.name, file.type, key);
      if (signedUrl) {
        const success = await uploadFileToS3(signedUrl, file);
        if (success) {
          // Now send metadata to update DB and send message via WebSocket
          const metadata = {
            file_name: file.name,
            file_type: file.type,
            file_size: file.size,
            sender_id,
            sender_name,
            group_id,
            room_id: room_id, // Adjust as per your room ID logic
            file_key: key,
          };
          console.log(metadata);
          socket.emit("save group media metadata", metadata);
          handleClose();
        }
      }
    } catch (error) {
      console.error("Error during file upload:", error);
    }
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Please choose a file to upload.
        </DialogTitle>
        <DialogContent>
          <TextField type="file" onChange={handleFileChange} />
          <DialogActions>
            <Button variant="contained" color="inherit" onClick={handleUpload}>
              Upload
            </Button>
            <Button
              variant="contained"
              color="error"
              autoFocus
              onClick={handleClose}
            >
              Cancel
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
