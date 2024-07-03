import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/appStore";
import { createGroupAction } from "../redux/actions/groupAsyncAction";
import { useForm } from "react-hook-form";
import { createGroupSchema } from "../lib/schema";
import { yupResolver } from "@hookform/resolvers/yup";

export default function AddNewGroupDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const dispatch: AppDispatch = useDispatch();
  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
    },
    resolver: yupResolver(createGroupSchema),
  });

  const createGroupHandler = async (data: { name: string }) => {
    await dispatch(createGroupAction({ groupName: data.name }));
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
          Please enter name of New Group
        </DialogTitle>
        <form noValidate onSubmit={handleSubmit(createGroupHandler)}>
          <DialogContent>
            <TextField
              margin="normal"
              autoFocus
              required
              label="Group Name"
              type="text"
              fullWidth
              variant="outlined"
              {...register("name")}
              helperText={errors.name?.message}
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained" color="inherit">
              Create
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
      </Dialog>
    </React.Fragment>
  );
}
