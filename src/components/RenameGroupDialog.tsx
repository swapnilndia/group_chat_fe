import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/appStore";
import { renameGroupAction } from "../redux/actions/groupAsyncAction";
import { renameGroupSchema } from "../lib/schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function RenameGroupDialog({
  openRenameDialog,
  setOpenRenameDialog,
  groupId,
}: {
  openRenameDialog: boolean;
  setOpenRenameDialog: React.Dispatch<React.SetStateAction<boolean>>;
  groupId: number;
}) {
  const dispatch: AppDispatch = useDispatch();
  const handleClose = () => {
    reset();
    setOpenRenameDialog(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      newGroupName: "",
    },
    resolver: yupResolver(renameGroupSchema),
  });

  const renameGroupHandler = async (data: { newGroupName: string }) => {
    dispatch(
      renameGroupAction({ group_id: groupId, newGroupName: data.newGroupName })
    );
    handleClose();
  };

  return (
    <React.Fragment>
      <Dialog
        open={openRenameDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Please enter new Name of Group
        </DialogTitle>
        <form noValidate onSubmit={handleSubmit(renameGroupHandler)}>
          <DialogContent>
            <TextField
              margin="normal"
              autoFocus
              required
              label="New Group Name"
              type="text"
              fullWidth
              variant="outlined"
              {...register("newGroupName")}
              helperText={errors.newGroupName?.message}
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained" color="inherit">
              Update
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
