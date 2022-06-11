import { Box, Button } from "@mui/material";
import Badge from '@mui/material/Badge';
import React from "react";
// import { IMAGE_URL } from "../../../helper/common";
import { useState, useEffect } from "react";


const marginPhone = {
  marginBottom: "1rem",
};

const margin = {
  marginRight: "1rem",
};

function Format13({ question, isMobile, answerUpdate, answer }) {
  const [order, setOrder] = React.useState([]);
  function change(el) {
    if(order.indexOf(el) != -1){
      order.splice(order.indexOf(el), 1);
      setOrder([...order]);
    }else{
      if(order.length < question.data.options.length) {
        order.push(el);
        setOrder([...order]);
        console.log(order);
      }
    }
    if (answerUpdate) {
      answerUpdate([...order]);
    }
    
  }

  useEffect(() => {
    if (answer === null) {
      setOrder([]);
    }
  }, [answer]);

  
  return (
    <Box className="mt-1">
      <h4>{question.title}</h4>
      {question.bodyImage && <img src={`https://mui.com/static/branding/companies/amazon-dark.svg`} alt="Question Body" />}
      {/* todo description */}
      <div className={`d-flex mt-4 ${isMobile ? "flex-column" : ""}`}>
        {(question?.data?.options || []).map((ele, ind) => (
          <Badge badgeContent={order.indexOf(ele) == -1 ? 0 : order.indexOf(ele)+1} overlap="circular"  color="success">
            <Button
              key={ind}
              variant={"contained"}
              onClick={() => change(ele, ind)}
              sx={isMobile ? marginPhone : margin}
            >
              {ele}
            </Button>
          </Badge>
        ))}
      </div>
    </Box>
  );
}

export default Format13;