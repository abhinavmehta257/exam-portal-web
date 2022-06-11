import { Box, Button } from "@mui/material";
import React from "react";
import { IMAGE_URL } from "../../../helper/common";
// import { useSelector } from "react-redux";

const marginPhone = {
  marginBottom: "1rem",
};

const margin = {
  marginRight: "1rem",
};

function Format1({ question, isMobile, answerUpdate, answer }) {
  function change(el) {
    if (answerUpdate) {
      answerUpdate(el);
    }
  }

  return (
    <Box className="mt-1">
      <h4>{question.title}</h4>
      {question.bodyImage && <img src={`${IMAGE_URL}${question.bodyImage}`} alt="Question Body" />}
      {/* todo description */}
      <div className={`d-flex mt-4 ${isMobile ? "flex-column" : ""}`}>
        {(question?.data?.options || []).map((ele, ind) => (
          <Button
            key={ind}
            variant={ele === answer ? "contained" : "outlined"}
            onClick={() => change(ele)}
            sx={isMobile ? marginPhone : margin}
          >
            {ele}
          </Button>
        ))}
      </div>
    </Box>
  );
}

export default Format1;


//create a 2d array
// const arr = [
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9],
// ];

// for(j=0;j<arr.length;j++){
//   for(i=0;i<arr[j].length;i++){
//     console.log(arr[j][i],i+(3*j));
//   }
// }