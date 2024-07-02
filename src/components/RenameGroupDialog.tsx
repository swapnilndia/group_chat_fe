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

export default function RenameGroupDialog({
  open,
  setOpen,
  groupId,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  groupId: number;
}) {
  const dispatch: AppDispatch = useDispatch();
  const [name, setName] = React.useState("");
  const handleClose = () => {
    setName("");
    setOpen(false);
  };

  const renameGroupHandler = async () => {
    dispatch(renameGroupAction({ group_id: groupId, newGroupName: name }));
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
          Please enter new Name of Group
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
            onClick={renameGroupHandler}
            variant="contained"
            color="inherit"
          >
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
      </Dialog>
    </React.Fragment>
  );
}
