import { Box, Button, Grid, Typography } from "@mui/material";
import { formatDate } from "../utils/helperFunctions";
import axios from "axios";
import { MessageType } from "../lib/types/message.types";
import { LoggedInUser } from "../lib/types/user.types";
interface PresignedUrlResponse {
  url: string;
}

const GroupMessageViewComponent = ({
  messagesList,
  loggedinUserInfo,
}: {
  messagesList: MessageType[];
  loggedinUserInfo: LoggedInUser;
}) => {
  const fetchPresignedUrl = async (key: string): Promise<string> => {
    try {
      const response = await axios.post<PresignedUrlResponse>(
        "http://localhost:3000/api/v1/messages/download-url",
        { key }
      );
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
  const handleFetchPresignedUrl = async (fileKey: string, fileName: string) => {
    try {
      const url = await fetchPresignedUrl(fileKey);
      console.log(url);
      if (url) {
        downloadFile(url, fileName);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Grid container gap={2} padding={2} margin="auto">
      {messagesList.map((chatMessage) => {
        if (chatMessage.sender_id !== loggedinUserInfo?.user_id) {
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
                    <Button
                      onClick={() =>
                        handleFetchPresignedUrl(
                          chatMessage.Medium?.file_key || "",
                          chatMessage.Medium?.file_name || "abc"
                        )
                      }
                    >
                      {chatMessage.Medium?.file_name}
                    </Button>
                    <Typography variant="body1" align="left">
                      {`${chatMessage.Medium?.file_size} Bytes `}
                    </Typography>
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
              {" "}
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
                    <Button
                      onClick={() =>
                        handleFetchPresignedUrl(
                          chatMessage.Medium?.file_key || "",
                          chatMessage.Medium?.file_name || "abc"
                        )
                      }
                    >
                      {chatMessage.Medium?.file_name}
                    </Button>
                    <Typography variant="body1" align="left">
                      {`${chatMessage.Medium?.file_size} Bytes `}
                    </Typography>
                  </Box>
                </Box>
              )}
            </Grid>
          );
        }
      })}
    </Grid>
  );
};

export default GroupMessageViewComponent;
