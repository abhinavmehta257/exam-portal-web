import { Paper, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

function ScoreBar() {
  const question = useSelector((selector) => selector.question);
  return (
    <Paper
      sx={{
        padding: "1rem",
        textAlign: "center",
        margin: ".5rem",
        background: "#f4f2f2",
      }}
    >
      <Typography variant="subtitle2" gutterBottom>
        Score
      </Typography>
      <Typography variant="h3" gutterBottom component="div">
        {question.solved} / {question.totalQuestions}
      </Typography>
    </Paper>
  );
}

export default ScoreBar;
