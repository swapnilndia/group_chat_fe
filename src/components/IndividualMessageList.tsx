import { useEffect, useState } from "react";
import { IconButton, TextField, Box } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserContactInfo,
  selectUserInfo,
} from "../redux/reducers/userSlice";
import { AppDispatch } from "../redux/appStore";
import { getPersonalMessageAction } from "../redux/actions/chatAsyncActions";
import {
  receivePersonalMessage,
  selectPersonalMessages,
} from "../redux/reducers/chatSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { sendMessageSchema } from "../lib/schema";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import AddAttachmentDialog from "./AddAttachmentDialog";
import IndividualMessageViewComponent from "./IndividualMessageViewComponent";
import socket from "../lib/socket";
import { MessageType } from "../lib/types/message.types";

const IndividualMessageList = () => {
  const selectedContact = useSelector(selectUserContactInfo);
  const [open, setOpen] = useState(false);
  const userInfo = useSelector(selectUserInfo);
  const messagesList = useSelector(selectPersonalMessages);
  console.log(messagesList);
  const dispatch: AppDispatch = useDispatch();

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
    if (selectedContact !== null) {
      dispatch(
        getPersonalMessageAction({ contactId: selectedContact.user_id })
      );
    }

    const roomId = selectedContact?.Contact.connectionKey;
    if (roomId) {
      console.log("room joined", roomId);
      socket.emit("join", roomId);
    }

    const messageHandler = (message: MessageType) => {
      dispatch(receivePersonalMessage(message));
    };

    if (roomId) {
      socket.on("personal message", messageHandler);
    }

    return () => {
      if (roomId) {
        console.log("room left", roomId);
        socket.emit("leave", roomId); // Leave the room when the component unmounts or selectedContact changes
        socket.off("personal message", messageHandler);
      }
    };
  }, [selectedContact, dispatch, userInfo?.user_id]);

  const sendMessageHandler = async (data: { text: string }) => {
    if (userInfo && selectedContact) {
      const message = {
        sender_id: userInfo.user_id,
        receiver_id: selectedContact.user_id,
        room_id: selectedContact.Contact.connectionKey,
        content: data.text,
        sender_name: userInfo.name,
      };
      // Emit the personal message event with an acknowledgment callback
      socket.emit("personal message", message);
      reset(); // Reset form input after sending message
    }
  };

  return (
    <>
      <Box display="flex" flexDirection="column" height="80vh">
        <Box
          flexGrow={1}
          overflow="auto"
          display="flex"
          flexDirection="column-reverse"
        >
          {messagesList.length > 0 && selectedContact && (
            <IndividualMessageViewComponent
              messagesList={messagesList}
              selectedContact={selectedContact}
            />
          )}
        </Box>
        <Box
          display="flex"
          alignItems="center"
          padding="1rem"
          borderTop="1px solid #ccc"
        >
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
              <SendIcon />
            </IconButton>
          </form>
        </Box>
      </Box>
      {userInfo && selectedContact && (
        <AddAttachmentDialog
          sender_id={userInfo.user_id}
          sender_name={userInfo.name}
          receiver_id={selectedContact.user_id}
          open={open}
          setOpen={setOpen}
          socket={socket}
          room_id={selectedContact.Contact.connectionKey}
        />
      )}
    </>
  );
};

export default IndividualMessageList;
