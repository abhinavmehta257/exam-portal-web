import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAnswer } from "../../../redux/actions/QuestionAction";
import Format1 from "./Format1";
import Format1A from "./Format1A";
import Format2 from "./Format2";
import Format2A from "./Format2A";
import Format2B from "./Format2B";
import Format3 from "./Format3";
import Format4 from "./Format4";
import Format6 from "./Format6";
import Format13 from "./Format13";
import { useMediaQuery, useTheme } from "@mui/material";

function GenericFormat() {
  const practice = useSelector((selector) => selector.question);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    noSsr: true,
  });
  const { answer } = useSelector((selector) => selector.question);

  function answerUpdate(changed) {
    dispatch(updateAnswer(changed));
  }

  if (practice.question?.formatID === "61bace9584476677d477e76b")
    return (
      <Format1
        question={practice.question}
        isMobile={isMobile}
        answerUpdate={answerUpdate}
        answer={answer}
      />
    );

  if (practice.question?.formatID === "628e7711c9d54c6fbf3a0d86")
    return (
      <Format1A
        question={practice.question}
        isMobile={isMobile}
        answerUpdate={answerUpdate}
        answer={answer}
      />
    );

  if (practice.question?.formatID === "61bace9584476677d477e76c")
    return (
      <Format2
        question={practice.question}
        isMobile={isMobile}
        answerUpdate={answerUpdate}
        answer={answer}
      />
    );

  if (practice.question?.formatID === "6293b3d8c494331a7e5103fe")
    return (
      <Format2A
        question={practice.question}
        isMobile={isMobile}
        answerUpdate={answerUpdate}
        answer={answer}
      />
    );

  if (practice.question?.formatID === "629a3ca4028696e73dbc9913")
    return (
      <Format2B
        question={practice.question}
        isMobile={isMobile}
        answerUpdate={answerUpdate}
        answer={answer}
      />
    );

  if (practice.question?.formatID === "61bace9584476677d477e76d")
    return (
      <Format3
        question={practice.question}
        isMobile={isMobile}
        answerUpdate={answerUpdate}
        answer={answer}
      />
    );

  if (practice.question?.formatID === "61bace9584476677d477e76e")
    return (
      <Format4
        question={practice.question}
        isMobile={isMobile}
        answerUpdate={answerUpdate}
        answer={answer}
      />
    );

    if (practice.question?.formatID === "61bace9584476677d477e770")
    return (
      <Format6
        question={practice.question}
        isMobile={isMobile}
        answerUpdate={answerUpdate}
        answer={answer}
      />
    );

  if (practice.question?.formatID === "61bace9584476677d477e777")
    return (
      <Format13
        question={practice.question}
        isMobile={isMobile}
        answerUpdate={answerUpdate}
        answer={answer}
      />
    );

  return <div />;
}

export default GenericFormat;
