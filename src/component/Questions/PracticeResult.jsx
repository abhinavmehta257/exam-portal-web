import { Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import CircularGauge from "../common/CircularGauge/CircularGauge";

// 100% Divided by 5 Message each with range of 20
const MESSAGES = [
  "You need More Practice",
  "You need Little More Practice",
  "You can Do Better",
  "You can Do Little Better",
  "Keep Up the Good Work",
];

function PracticeResult() {
  const question = useSelector((selector) => selector.question);
  const practice = useSelector((selector) => selector.practice);

  if (question.totalQuestions <= 0) return <div />;
  const messagePos = Math.min(
    MESSAGES.length,
    Math.floor((question.solved * MESSAGES.length) / question.totalQuestions)
  );
  const today = new Date();

  return (
    <div
      className="d-flex flex-column"
      style={{ width: "fit-content", margin: "auto" }}
    >
      <Typography variant="h4" gutterBottom component="div">
        Result
      </Typography>
      <div style={{ margin: "0 auto" }}>
        <CircularGauge
          score={question.solved}
          total={question.totalQuestions}
        />
      </div>

      <span style={{ fontSize: "1.2rem", margin: "1rem auto" }}>
        {MESSAGES[messagePos]}
      </span>
      <table>
        <tbody>
          <tr>
            <td>
              <b>Exam</b>
            </td>
            <td>Practice Test of {practice.title}</td>
          </tr>
          <tr>
            <td style={{ paddingRight: "1rem" }}>
              <b>Exam Date</b>
            </td>
            <td>
              {today.getDate()} / {today.getMonth() + 1} / {today.getFullYear()}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default PracticeResult;
