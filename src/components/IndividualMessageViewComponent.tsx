import { Box, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { Contact } from "../lib/types/user.types";
import { formatDate } from "../utils/helperFunctions";
import axios from "axios";
import { MessageType } from "../lib/types/message.types";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";
import ViewMediaMessage from "./ViewMediaMessage";
interface PresignedUrlResponse_GET {
  data: string;
  message: string;
  status: number;
}
const Base_url = import.meta.env.VITE_BASE_URL;
const IndividualMessageViewComponent = ({
  messagesList,
  selectedContact,
}: {
  messagesList: MessageType[];
  selectedContact: Contact;
}) => {
  const [open, setOpen] = useState(false);
  const [viewURL, setViewURL] = useState("");

  const fetchPresignedUrl_GET = async (
    key: string
  ): Promise<PresignedUrlResponse_GET> => {
    try {
      const response = await axios.post<PresignedUrlResponse_GET>(
        `${Base_url}/messages/download-url`,
        { key }
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Error fetching presigned URL:", error);
      throw new Error("Could not fetch presigned URL");
    }
  };

  const downloadFile = (url: string, fileName: string) => {
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };
  const handleFetchPresignedUrl_Download = async (
    fileKey: string,
    fileName: string
  ) => {
    try {
      const url = await fetchPresignedUrl_GET(fileKey);
      if (url) {
        downloadFile(url.data, fileName);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleFetchPresignedUrl_View = async (fileKey: string) => {
    try {
      const url = await fetchPresignedUrl_GET(fileKey);
      console.log(url);
      if (url) {
        setOpen(true);
        setViewURL(url.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Grid container gap={2} padding={2} margin="auto">
      {messagesList.map((chatMessage) => {
        if (chatMessage.receiver_id !== selectedContact.user_id) {
          return (
            <Grid key={chatMessage.message_id} item xs={12}>
              {chatMessage.media_id === null ? (
                <Box
                  width="75%"
                  border="1px solid grey"
                  borderRadius="2rem"
                  padding="0.5rem"
                  bgcolor="#d4edda" // Light green background
                >
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body1" align="left">
                      {chatMessage.sender_name}
                    </Typography>
                    <Typography variant="body1" align="left">
                      {formatDate(chatMessage.createdAt)}
                    </Typography>
                  </Box>

                  <Typography align="left" color="#155724">
                    {chatMessage.content}
                  </Typography>
                </Box>
              ) : (
                <Box
                  width="75%"
                  border="1px solid grey"
                  borderRadius="2rem"
                  padding="0.5rem"
                  bgcolor="#d4edda" // Light green background
                >
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body1" align="left">
                      {chatMessage.sender_name}
                    </Typography>
                    <Typography variant="body1" align="left">
                      {formatDate(chatMessage.createdAt)}
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body1" align="left">
                      {chatMessage.Medium?.file_name}
                    </Typography>
                    <Typography variant="body1" align="left">
                      {`${Math.ceil(
                        (chatMessage.Medium?.file_size || 0) / 1000
                      )} Kb `}
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body1" align="left">
                      {chatMessage.sender_name}
                    </Typography>
                    <Typography variant="body1" align="left">
                      {formatDate(chatMessage.createdAt)}
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Tooltip title="View Media">
                      <IconButton
                        onClick={() =>
                          handleFetchPresignedUrl_View(
                            chatMessage.Medium?.file_key || ""
                          )
                        }
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Download Media">
                      <IconButton
                        onClick={() =>
                          handleFetchPresignedUrl_Download(
                            chatMessage.Medium?.file_key || "",
                            chatMessage.Medium?.file_name || "abc"
                          )
                        }
                      >
                        <DownloadIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              )}
            </Grid>
          );
        } else {
          return (
            <Grid
              key={chatMessage.message_id}
              item
              xs={12}
              display="flex"
              justifyContent="end"
              alignItems="end"
            >
              {chatMessage.media_id === null ? (
                <Box
                  width="75%"
                  border="1px solid grey"
                  borderRadius="2rem"
                  padding="1rem"
                  bgcolor="#d0f0fd" // Light blue background
                >
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body1" align="left">
                      {chatMessage.sender_name}
                    </Typography>
                    <Typography variant="body1" align="left">
                      {formatDate(chatMessage.createdAt)}
                    </Typography>
                  </Box>
                  <Typography variant="body2" align="left" color="#004085">
                    {chatMessage.content}
                  </Typography>
                </Box>
              ) : (
                <Box
                  width="75%"
                  border="1px solid grey"
                  borderRadius="2rem"
                  padding="1rem"
                  bgcolor="#d0f0fd" // Light blue background
                >
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body1" align="left">
                      {chatMessage.sender_name}
                    </Typography>
                    <Typography variant="body1" align="left">
                      {formatDate(chatMessage.createdAt)}
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body1" align="left">
                      {chatMessage.Medium?.file_name}
                    </Typography>
                    <Typography variant="body1" align="left">
                      {`${Math.ceil(
                        (chatMessage.Medium?.file_size || 0) / 1000
                      )} Kb `}
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Tooltip title="View Media">
                      <IconButton
                        onClick={() =>
                          handleFetchPresignedUrl_View(
                            chatMessage.Medium?.file_key || ""
                          )
                        }
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Download Media">
                      <IconButton
                        onClick={() =>
                          handleFetchPresignedUrl_Download(
                            chatMessage.Medium?.file_key || "",
                            chatMessage.Medium?.file_name || "abc"
                          )
                        }
                      >
                        <DownloadIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              )}
            </Grid>
          );
        }
      })}
      {open && (
        <ViewMediaMessage
          open={open}
          setOpen={setOpen}
          viewURL={viewURL}
          setViewURL={setViewURL}
        />
      )}
    </Grid>
  );
};

export default IndividualMessageViewComponent;
