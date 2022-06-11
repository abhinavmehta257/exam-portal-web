import { Box } from "@mui/material";
import React,{useEffect} from "react";
// import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
function NumberWithBoxes({ ele, onChange,value }) {
  if (ele === null)
    return (
      <TableCell align="right">
       <input
        // className="digit"
        type="number"
        min={0}
        max={9}
        value={value}
        onChange={onChange}
      />
      </TableCell>
    );
  return <TableCell align="right">{ele}</TableCell>;
}


function Format6({ question, isMobile, answerUpdate, answer }) {
  const table = question?.data?.table || [];
  const ans = answer || [];
  let tmp = ans;

  function change(index) {
    console.log(index);
    return (el) => {
      if (tmp.length !== (question?.data?.boxes || 0)) {
        tmp = new Array(question?.data?.boxes);
      }
      if (index > tmp.length || index <= 0) {
        return;
      }
      tmp[index-1] = String(el.target.value);
      console.log(tmp);
      answerUpdate([...tmp]);

    };
  }

  let blocks = 0;
  return (
    <Box className="mt-1">
      <h4>{question.title}</h4>
      <div style={{ width: "fit-content", fontSize: "1.2rem" }}>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell align="right">Number of Equale groups</TableCell>
            <TableCell align="right">Amount in Each Group</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {table.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {row.map((cell,ind)=>{
                if (cell === null) {
                  ++blocks;
                }
                return (
                  <NumberWithBoxes
                    key={"add1" + ind}
                    ele={cell}
                    value={tmp[blocks-1] || ''}
                    onChange={change(blocks)}
                  />
                );
                })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </div>
    </Box>
  );

}
export default Format6;
