import React from "react";
import { useSelector } from "react-redux";
import { useMediaQuery, useTheme } from "@mui/material";

function SolvedProgressBar({ height }) {
  const question = useSelector((selector) => selector.question);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    noSsr: true,
  });
  const total = question.totalQuestions > 0 ? question.totalQuestions : 1;
  const percentage = (question.solved * 100) / total;
  let color = "#d10f18";
  if (percentage > 66) color = "#16ba04";
  else if (percentage > 33) color = "#ffc400";

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        height: height || 30,
        backgroundColor: "#EEEEEE",
        width: isMobile ? "100%" : "68%",
        left: isMobile ? 0 : "16%",
        borderRadius: 5,
      }}
    >
      <div
        style={{
          height: height || 30,
          width: `${percentage}%`,
          backgroundColor: color,
        }}
      ></div>
    </div>
  );
}

export default SolvedProgressBar;
