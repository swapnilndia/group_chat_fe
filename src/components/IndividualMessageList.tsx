import { useEffect, useState } from "react";
import { Grid, IconButton, TextField } from "@mui/material";
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
import io from "socket.io-client";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import AddAttachmentDialog from "./AddAttachmentDialog";
import IndividualMessageViewComponent from "./IndividualMessageViewComponent";
const socket = io("http://localhost:3000");

const IndividualMessageList = () => {
  const selectedContact = useSelector(selectUserContactInfo);
  const [open, setOpen] = useState(false);
  console.log(selectedContact);
  const userInfo = useSelector(selectUserInfo);
  console.log(userInfo);
  const messagesList = useSelector(selectPersonalMessages);
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
    socket.emit("join", roomId);
    // Define the message handler
    const messageHandler = (message) => {
      console.log(message);
      dispatch(receivePersonalMessage(message));
    };

    if (roomId) {
      // Subscribe to the personal message event for this user
      socket.on("personal message", messageHandler);
    }

    return () => {
      // Cleanup the event listener on unmount or when userId changes
      if (roomId) {
        socket.off(`personal message`, messageHandler);
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
      console.log(message);
      // Emit the personal message event with an acknowledgment callback
      socket.emit("personal message", message);
      reset(); // Reset form input after sending message
    }
  };

  return (
    <>
      {messagesList && messagesList.length > 0 && selectedContact && (
        <IndividualMessageViewComponent
          messagesList={messagesList}
          selectedContact={selectedContact}
        />
      )}{" "}
      <Grid
        container
        xs={12}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {" "}
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
      </Grid>
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
