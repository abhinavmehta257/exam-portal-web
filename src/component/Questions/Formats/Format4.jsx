import { Box, Button, ButtonGroup } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";

function Format4({ question, isMobile, answerUpdate, answer }) {
  const [selected, setSelected] = useState([]);

  function change(el, ind) {
    if (selected.length <= question?.data?.variableCount) {
      // Store Answer temporary.
      let tmpAnswer = answer;
      let tmpSelected = selected;
      const keys = question?.data?.variablePos || [];
      if (Object.keys(answer || {}).length <= 0) {
        tmpAnswer = {};
        question?.data?.variablePos.forEach(
          (ele) => (tmpAnswer[ele] = undefined)
        );
        tmpSelected = [];
      }

      if (tmpSelected.indexOf(ind) > -1) {
        const _key = "" + keys[tmpSelected.length - 1];
        tmpSelected = tmpSelected.filter((sel) => ind !== sel);
        tmpAnswer[_key] = "";
      } else {
        if (tmpSelected.length < keys.length) {
          const _key = "" + keys[tmpSelected.length];
          tmpSelected.push(ind);
          tmpAnswer[_key] = el;
        }
      }
      setSelected([...tmpSelected]);
      answerUpdate({ ...tmpAnswer });
    }
  }

  useEffect(() => {
    if (answer === null) {
      setSelected([]);
    }
  }, [answer]);

  return (
    <Box className="mt-1">
      <h4>{question.title}</h4>
      {/* todo body Image */}
      {/* todo description */}
      <div className={`d-flex mt-4 flex-column`}>
        <ButtonGroup variant="outlined">
          {(question?.data?.options || []).map((ele, ind) => (
            <Button
              key={ind}
              // variant={ele === answer ? "contained" : "outlined"}
              onClick={() => change(ele, ind)}
              sx={
                selected.indexOf(ind) > -1 ? { backgroundColor: "#d8e1f0" } : {}
              }
            >
              {ele}
            </Button>
          ))}
        </ButtonGroup>
        <div className="equation d-flex mt-4">
          {(question?.data?.equation || []).map((ele, ind) => {
            if (ele === 0 || ele) {
              return (
                <span key={ind} style={{ margin: "0 .5rem" }}>
                  {ele}
                </span>
              );
            }
            // if (ele === null) {
            //   try {
            return (
              <div
                key={ind}
                style={{
                  border: "1px solid #000",
                  minWidth: "60px",
                  padding: "0 .25rem",
                }}
              >
                {(answer || {})[ind] || ""}
              </div>
            );
          })}
        </div>
      </div>
    </Box>
  );
}

export default Format4;
