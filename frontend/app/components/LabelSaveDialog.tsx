import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

type FormDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  saveLabel: (title: string) => void;
};

export default function LabelSaveDialog({ open, setOpen, saveLabel }: FormDialogProps) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const title = formJson.title;
            saveLabel(title);
            handleClose();
        },
      }}
    >
      <DialogTitle>Save As New Label</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please provide a name for the saved label
        </DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          id="title"
          name="title"
          label="Label Title"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Save</Button>
      </DialogActions>
    </Dialog>
  );
}
