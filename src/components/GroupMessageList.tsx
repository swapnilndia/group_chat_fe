import { useEffect, useState } from "react";
import { Grid, IconButton, TextField } from "@mui/material";
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
import GroupMessageViewComponent from "./GroupMessageViewComponent";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import AddAttachmentDialog_Group from "./AddAttachmentDialog_Group";

const socket = io("http://localhost:3000");
const GroupMessageList = () => {
  const selectedGroup = useSelector(selectedGroupInfo);
  const messagesList = useSelector(selectGroupMessages);
  const loggedinUserInfo = useSelector(selectUserInfo);
  console.log(selectedGroup, messagesList);
  const dispatch: AppDispatch = useDispatch();
  const [open, setOpen] = useState(false);

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

    const roomId = selectedGroup?.connectionKey;
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
        sender_name: loggedinUserInfo.name,
        group_id: selectedGroup.group_id,
        room_id: selectedGroup.connectionKey,
        content: data.text,
      };

      // Emit the personal message event with an acknowledgment callback
      socket.emit("group message", message);
      reset(); // Reset form input after sending message
    }
  };

  return (
    <>
      {messagesList &&
        messagesList.length > 0 &&
        selectedGroup &&
        loggedinUserInfo && (
          <GroupMessageViewComponent
            messagesList={messagesList}
            loggedinUserInfo={loggedinUserInfo}
          />
        )}
      <Grid item xs={12}>
        <IconButton size="large" type="submit" onClick={() => setOpen(true)}>
          <AttachFileIcon />
        </IconButton>
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
      {loggedinUserInfo && selectedGroup && (
        <AddAttachmentDialog_Group
          sender_id={loggedinUserInfo?.user_id}
          sender_name={loggedinUserInfo?.name}
          group_id={selectedGroup.group_id}
          open={open}
          setOpen={setOpen}
          socket={socket}
          room_id={selectedGroup.connectionKey}
        />
      )}
    </>
  );
};

export default GroupMessageList;
