import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userInfoAction } from "../redux/actions/userAsyncActions";
import {
  selectLoggedInStatus,
  selectUserInfo,
} from "../redux/reducers/userSlice";
import { AppDispatch } from "../redux/appStore";

import {
  getAllMessageAction,
  sendMessageAction,
} from "../redux/actions/chatAsyncActions";

import { selectChatlist } from "../redux/reducers/chatSlice";
const MessageList = () => {
  const loggedInStatus = useSelector(selectLoggedInStatus);
  const [message, setMessage] = useState("");
  const userInfo = useSelector(selectUserInfo);
  const chatLists = useSelector(selectChatlist);

  const dispatch: AppDispatch = useDispatch();
  const handleSendMessage = async () => {
    dispatch(sendMessageAction({ message }));
    setMessage("");
  };
  useEffect(() => {
    if (loggedInStatus === true) {
      dispatch(userInfoAction());
      dispatch(getAllMessageAction());
    }
  }, [loggedInStatus]);
  return (
    <>
      {chatLists && chatLists.length > 0 && userInfo && (
        <Grid container gap={2} padding={2} margin="auto">
          {chatLists.map((chatMessage) => {
            if (chatMessage.userId !== userInfo.id) {
              return (
                <Grid key={chatMessage.id} item xs={12}>
                  <Box
                    width="75%"
                    border="1px solid grey"
                    borderRadius="2rem"
                    padding="0.5rem"
                  >
                    <Box display="flex" justifyContent="space-between">
                      <Typography color="aqua" variant="body1" align="left">
                        {chatMessage.userName}
                      </Typography>
                      <Typography color="aqua" variant="body1" align="left">
                        {chatMessage.createdAt}
                      </Typography>
                    </Box>

                    <Typography variant="body2" align="left">
                      {chatMessage.message}
                    </Typography>
                  </Box>
                </Grid>
              );
            } else {
              return (
                <Grid
                  key={chatMessage.id}
                  item
                  xs={12}
                  display="flex"
                  justifyContent="end"
                  alignItems="end"
                >
                  <Box
                    width="75%"
                    border="1px solid grey"
                    borderRadius="2rem"
                    padding="1rem"
                  >
                    <Box display="flex" justifyContent="space-between">
                      <Typography color="aqua" variant="body1" align="left">
                        {chatMessage.userName}
                      </Typography>
                      <Typography color="aqua" variant="body1" align="left">
                        {chatMessage.createdAt}
                      </Typography>
                    </Box>
                    <Typography variant="body2" align="left">
                      {chatMessage.message}
                    </Typography>
                  </Box>
                </Grid>
              );
            }
          })}

          <Grid
            item
            display="flex"
            justifyContent="flex-end"
            alignContent="center"
            xs={12}
            gap={2}
          >
            <TextField
              multiline
              fullWidth
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></TextField>
            <Button
              onClick={handleSendMessage}
              variant="contained"
              endIcon={<SendIcon />}
            >
              Send
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default MessageList;
