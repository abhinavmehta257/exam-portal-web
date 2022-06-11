import { Box } from "@mui/material";
import React from "react";

function NumberWithBoxes({ ele, onChange, value }) {
  if (ele === null)
    return (
      <input
        className="digit"
        type="number"
        min={0}
        max={9}
        value={value}
        onChange={onChange}
      />
    );
  return <div>{ele}</div>;
}

function Format3({ question, isMobile, answerUpdate, answer }) {
  const addend1 = question?.data?.addend1 || [];
  const addend2 = question?.data?.addend2 || [];
  const result = question?.data?.result || [];
  const digits = question?.data?.digits || -1;
  const ans = answer || [];
  const styling = {
    display: "grid",
    gridTemplateColumns: `repeat(${digits + 1}, 24px)`,
    textAlign: "center",
    rowGap: ".31rem",
    columnGap: "2px",
  };

  function change(index) {
    return (el) => {
      let tmp = ans;
      if (tmp.length !== (question?.data?.boxes || 0)) {
        tmp = new Array(question?.data?.boxes);
      }
      if (index > tmp.length || index <= 0) {
        return;
      }
      tmp[index - 1] = String(el.target.value)[0];
      answerUpdate([...tmp]);
    };
  }

  function genArray(n) {
    const num = digits + 1 - n;
    return [...Array(num > 0 ? num : 0)];
  }

  // console.log(question.data);

  let blocks = 0;
  return (
    <Box className="mt-1">
      <h4>{question.title}</h4>
      <div style={{ width: "fit-content", fontSize: "1.2rem" }}>
        <div style={{ ...styling }}>
          {genArray(addend1.length).map((_, i) => (
            <div key={"e" + i} />
          ))}

          {addend1.map((ele, ind) => {
            if (ele === null) {
              ++blocks;
            }
            return (
              <NumberWithBoxes
                key={"add1" + ind}
                ele={ele}
                value={ans[blocks - 1] || ''}
                onChange={change(blocks)}
              />
            );
          })}

          {genArray(1 + addend2.length).map((e, i) => (
            <div key={"e2" + i} />
          ))}
          <div>{question.data.operator}</div>
          {addend2.map((ele, ind) => {
            if (ele === null) {
              ++blocks;
            }
            return (
              <NumberWithBoxes
                key={"add2" + ind}
                ele={ele}
                value={ans[blocks - 1] || ''}
                onChange={change(blocks)}
              />
            );
          })}
        </div>
        <div
          style={{
            ...styling,
            borderTop: "1px solid #000",
            marginTop: ".25rem",
            paddingTop: ".25rem",
          }}
        >
          {genArray(result.length).map((e, i) => (
            <div key={"e" + i} />
          ))}
          {result.map((ele, ind) => {
            if (ele === null) {
              ++blocks;
            }
            return (
              <NumberWithBoxes
                key={"res" + ind}
                ele={ele}
                value={ans[blocks - 1] || ''}
                onChange={change(blocks)}
              />
            );
          })}
        </div>
      </div>
    </Box>
  );
}

export default Format3;
