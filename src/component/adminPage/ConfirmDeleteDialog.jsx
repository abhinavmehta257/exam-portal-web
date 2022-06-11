import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import React from "react";
import { Button } from "react-bootstrap";
import ClassService from "../../services/ClassService";

function ConfirmDeleteDialog({
  open,
  handleClose,
  subject,
  skill,
  subtopic,
  removeSubject,
  removeSkill,
  removeSubtopic,
}) {
  function submit() {
    // Api Calls.
    if (subject) {
      ClassService.deleteSubject(subject)
        .then(() => {
            removeSubject(subject);
            handleClose();
        })
        .catch();
    } else if (skill) {
      ClassService.deleteSkill(skill)
        .then(() => {
            removeSkill(skill);
            handleClose();
        })
        .catch();
    } else if (subtopic) {
      ClassService.deleteSubtopic(subtopic.id)
        .then(() => {
            removeSubtopic(subtopic);
            handleClose();
        })
        .catch();
    }
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>Are you sure you want to Delete</DialogTitle>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={submit}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDeleteDialog;
