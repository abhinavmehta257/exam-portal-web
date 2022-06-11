import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { stringError } from "../../helper/common";
import UserHelpService from "../../services/UserHelpService";

function AskQueryDialog({ open, handleClose }) {
  const { addToast } = useToasts();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const question = useSelector((selector) => selector.question);

  function submit() {
    setIsLoading(true);
    const questionId = question?.question?._id;
    // console.log(questionId);
    UserHelpService.askQuery(message, questionId)
      .then(() => {
        setIsLoading(false);
        addToast("Query Asked!", {
          appearance: "success",
          autoDismissTimeout: 50000,
        });
        handleClose();
      })
      .catch(
        stringError((x) => {
          setIsLoading(false);
          addToast(x, {
            appearance: "error",
            autoDismissTimeout: 50000,
          });
          handleClose();
        })
      );
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Ask your Query</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Message"
          type="text"
          fullWidth
          variant="standard"
          multiline
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <LoadingButton
          variant="contained"
          disabled={message.length <= 10}
          loading={isLoading}
          // loadingPosition="start"
          onClick={submit}
        >
          Submit
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default AskQueryDialog;
