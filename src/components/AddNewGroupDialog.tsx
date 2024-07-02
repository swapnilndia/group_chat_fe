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

export default function AddNewGroupDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const dispatch: AppDispatch = useDispatch();
  const [name, setName] = React.useState("");
  const handleClose = () => {
    setName("");
    setOpen(false);
  };

  const createGroupHandler = async () => {
    setName("");
    await dispatch(createGroupAction({ groupName: name }));
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
        <DialogContent>
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          ></TextField>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={createGroupHandler}
            variant="contained"
            color="inherit"
          >
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
      </Dialog>
    </React.Fragment>
  );
}
