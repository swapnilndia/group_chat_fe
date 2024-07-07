import { useEffect } from "react";
import { Box, Grid, IconButton, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/appStore";
import { getGroupMessageAction } from "../redux/actions/chatAsyncActions";
import {
  receiveGroupMessage,
  selectGroupMessages,
} from "../redux/reducers/chatSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { sendMessageSchema } from "../lib/schema";
import { selectedGroupInfo } from "../redux/reducers/groupSlice";
import { selectUserInfo } from "../redux/reducers/userSlice";
import io from "socket.io-client";
const socket = io("http://localhost:3000");
const GroupMessageList = () => {
  const selectedGroup = useSelector(selectedGroupInfo);
  const messagesList = useSelector(selectGroupMessages);
  const loggedinUserInfo = useSelector(selectUserInfo);
  console.log(selectedGroup, messagesList);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (selectedGroup !== null) {
      dispatch(getGroupMessageAction({ groupId: selectedGroup.group_id }));
    }
  }, [selectedGroup, dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      text: "",
    },
    resolver: yupResolver(sendMessageSchema),
  });

  useEffect(() => {
    if (selectedGroup !== null) {
      dispatch(getGroupMessageAction({ groupId: selectedGroup.group_id }));
    }

    const roomId = selectedGroup?.group_id;
    socket.emit("join", roomId);
    // Define the message handler
    const messageHandler = (message) => {
      console.log(message);
      dispatch(receiveGroupMessage(message));
    };

    if (roomId) {
      // Subscribe to the personal message event for this user
      socket.on("group message", messageHandler);
    }

    return () => {
      // Cleanup the event listener on unmount or when userId changes
      if (roomId) {
        socket.off(`group message`, messageHandler);
      }
    };
  }, [selectedGroup, dispatch]);

  const sendMessageHandler = async (data: { text: string }) => {
    if (loggedinUserInfo && selectedGroup) {
      const message = {
        sender_id: loggedinUserInfo.user_id,
        group_id: selectedGroup.group_id,
        room_id: selectedGroup.group_id,
        content: data.text,
      };

      // Emit the personal message event with an acknowledgment callback
      socket.emit("group message", message);
      reset(); // Reset form input after sending message
    }
  };

  // const sendMessageHandler = async (data: { text: string }) => {
  //   if (selectedGroup) {
  //     await dispatch(
  //       sendGroupMessageAction({
  //         group_id: selectedGroup.group_id,
  //         content: data.text,
  //       })
  //     );
  //   }

  //   reset();
  // };

  return (
    <>
      {messagesList && messagesList.length > 0 && selectedGroup && (
        <Grid container gap={2} padding={2} margin="auto">
          {messagesList.map((chatMessage) => {
            if (chatMessage.sender_id !== loggedinUserInfo?.user_id) {
              return (
                <Grid key={chatMessage.message_id} item xs={12}>
                  <Box
                    width="75%"
                    border="1px solid grey"
                    borderRadius="2rem"
                    padding="0.5rem"
                    bgcolor="#d4edda" // Light green background
                  >
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body1" align="left">
                        {chatMessage.sender_id}
                      </Typography>
                      <Typography variant="body1" align="left">
                        {chatMessage.createdAt}
                      </Typography>
                    </Box>

                    <Typography align="left" color="#155724">
                      {chatMessage.content}
                    </Typography>
                  </Box>
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
                  <Box
                    width="75%"
                    border="1px solid grey"
                    borderRadius="2rem"
                    padding="1rem"
                    bgcolor="#d0f0fd" // Light blue background
                  >
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body1" align="left">
                        {chatMessage.receiver_id}
                      </Typography>
                      <Typography variant="body1" align="left">
                        {chatMessage.createdAt}
                      </Typography>
                    </Box>
                    <Typography variant="body2" align="left" color="#004085">
                      {chatMessage.content}
                    </Typography>
                  </Box>
                </Grid>
              );
            }
          })}
        </Grid>
      )}
      <Grid item xs={12}>
        <form
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            gap: "1rem",
            color: "#25D366",
            alignItems: "center",
          }}
          noValidate
          onSubmit={handleSubmit(sendMessageHandler)}
        >
          <TextField
            margin="normal"
            autoFocus
            label="Message"
            type="text"
            fullWidth
            variant="outlined"
            {...register("text")}
            helperText={errors.text?.message}
            size="medium"
          />

          <IconButton type="submit">
            Send <SendIcon />
          </IconButton>
        </form>
      </Grid>
    </>
  );
};

export default GroupMessageList;
