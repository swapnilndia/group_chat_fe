import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/appStore";
import { emptySearchedUser } from "../redux/reducers/groupSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addUserToGroupSchema } from "../lib/schema";
import {
  addUserToContactAction,
  searchUserAction,
} from "../redux/actions/userAsyncActions";
import {
  deleteSearchedContact,
  selectSearchedContact,
} from "../redux/reducers/userSlice";

export default function AddNewContactDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const dispatch: AppDispatch = useDispatch();
  const searchedContact = useSelector(selectSearchedContact);
  console.log(searchedContact);
  const handleClose = () => {
    reset();
    setOpen(false);
    dispatch(emptySearchedUser());
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      phone: "",
    },
    resolver: yupResolver(addUserToGroupSchema),
  });
  const searchButtonClickHandler = async (data: {
    email?: string;
    phone?: string;
  }) => {
    await dispatch(
      searchUserAction({
        email: data.email ?? "",
        phone: data.phone ?? "",
      })
    );
    reset();
  };

  const addButtonClickHandler = async (userId: number) => {
    await dispatch(addUserToContactAction({ contact_user_id: userId }));
    dispatch(deleteSearchedContact());
    handleClose();
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
          Please enter full email or phone to add user.
        </DialogTitle>
        <form noValidate onSubmit={handleSubmit(searchButtonClickHandler)}>
          <DialogContent>
            <TextField
              margin="normal"
              autoFocus
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              {...register("email")}
              helperText={errors.email?.message}
            />
            <TextField
              margin="normal"
              autoFocus
              label="Phone"
              type="text"
              fullWidth
              variant="outlined"
              {...register("phone")}
              helperText={errors.phone?.message}
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained" color="inherit">
              Search
            </Button>
            <Button
              onClick={handleClose}
              variant="contained"
              color="error"
              autoFocus
            >
              Cancel
            </Button>
          </DialogActions>
        </form>

        {searchedContact && (
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            p={2}
          >
            <Typography align="center" variant="subtitle1">
              {searchedContact.name}
            </Typography>
            <Typography align="center" variant="subtitle1">
              {searchedContact.email}
            </Typography>
            <Button
              variant="contained"
              autoFocus
              onClick={() => addButtonClickHandler(searchedContact.user_id)}
            >
              Add
            </Button>
          </Box>
        )}
      </Dialog>
    </React.Fragment>
  );
}
