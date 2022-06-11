import { Alert, AlertTitle } from "@mui/material";
import React from "react";

function CorrectAnswer() {
  return (
    <Alert severity="success">
      <AlertTitle>Good Job!!</AlertTitle>
      Your answer is Correct!!
    </Alert>
  );
}

export default CorrectAnswer;
