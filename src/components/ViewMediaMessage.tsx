import { Dialog, DialogContent } from "@mui/material";

export default function ViewMediaMessage({
  open,
  setOpen,
  viewURL,
  setViewURL,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setViewURL: React.Dispatch<React.SetStateAction<string>>;
  viewURL: string;
}) {
  const handleClose = () => {
    setOpen(false);
    setViewURL("");
  };
  console.log(setViewURL);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <iframe
          width="750px"
          height="900px"
          name="Viewer"
          allowFullScreen={true}
          src={viewURL}
        ></iframe>
      </DialogContent>
    </Dialog>
  );
}
