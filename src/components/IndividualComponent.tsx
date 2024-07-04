import { Avatar, Box, Button, Card, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserContact,
  selectUserContactId,
  selecteUserId,
} from "../redux/reducers/userSlice";
import { AppDispatch } from "../redux/appStore";
import { userContactsAction } from "../redux/actions/userAsyncActions";
import AddNewContactDialog from "./AddNewContactDialog";

const IndividualComponent = () => {
  const listOfContacts = useSelector(selectUserContact);
  const selectedContactId = useSelector(selectUserContactId);
  const [open, setOpen] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSelectedUser = (id: number) => {
    dispatch(selecteUserId(id));
  };

  useEffect(() => {
    if (listOfContacts === null) {
      dispatch(userContactsAction());
    }
  }, [listOfContacts]);

  return (
    <Card>
      <Box height="750px" bgcolor="lightgrey">
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          padding={1}
          gap={1}
          borderBottom="1px solid black"
        >
          <Button variant="contained" onClick={handleOpen}>
            Add new Contact
          </Button>
        </Box>
        {listOfContacts &&
          listOfContacts.Contacts.length > 0 &&
          listOfContacts.Contacts.map((contact) => (
            <Box
              key={contact.user_id}
              display="flex"
              flexDirection="row"
              padding={1}
              gap={1}
              borderBottom="1px solid black"
              onClick={() => handleSelectedUser(contact.user_id)}
              bgcolor={
                selectedContactId === contact.user_id
                  ? "lightgreen"
                  : "lightgrey"
              }
            >
              <Avatar sx={{ bgcolor: deepPurple[500] }}>Sk</Avatar>
              <div>
                <Typography variant="body1">{contact.name}</Typography>
                <Typography variant="subtitle2">{contact.phone}</Typography>
              </div>
            </Box>
          ))}
      </Box>
      <AddNewContactDialog open={open} setOpen={setOpen} />
    </Card>
  );
};

export default IndividualComponent;
