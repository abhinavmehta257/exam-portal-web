import {
  Alert,
  AlertTitle,
  Grid,
  Table,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import React, { useState } from "react";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";
import ReportService from "../../services/ReportService";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { parseAxiosError } from "../../helper/common";
import { LoadingButton } from "@mui/lab";
import { MdSearch } from "react-icons/md";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function PromoCodesInRange() {
  const [startDate, setStartDate] = useState(
    moment().startOf("month").toDate()
  );
  const [endDate, setEndDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [noData, setNoData] = useState("");

  function showData() {
    setIsLoading(true);
    setData([]);
    setNoData(false);
    setError("");
    setNoData(false);
    ReportService.getAllPromoUsed(startDate, endDate)
      .then((x) => {
        setData(x);
        setIsLoading(false);
        setNoData(x.length === 0);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
        setError(parseAxiosError(err));
      });
  }

  return (
    <Grid item md={6}>
      <Paper className="p-4">
        <h3 className="flex-1 mb-2">Promo Codes Used In Range</h3>
        <div className="d-flex justify-content-between">
          <DatePicker
            disableFuture
            // openTo="year"
            format="DD MMMM YYYY"
            label="Start Date"
            value={startDate}
            onChange={setStartDate}
          />
          <DatePicker
            disableFuture
            // openTo="year"
            format="DD MMMM YYYY"
            label="End Date"
            value={endDate}
            onChange={setEndDate}
          />
          <LoadingButton
            onClick={showData}
            endIcon={<MdSearch />}
            loading={isLoading}
            loadingPosition="end"
            variant="contained"
          >
            Search
          </LoadingButton>
        </div>
        {error && (
          <Alert severity="error" className="mt-4">
            <AlertTitle>Error</AlertTitle>
            {JSON.stringify(error)}
          </Alert>
        )}

        {noData && (
          <Alert severity="info" className="mt-4">
            <AlertTitle>Information</AlertTitle>
            No Data Found
          </Alert>
        )}

        {data.length > 0 && (
          <TableContainer className="mt-4">
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Promo Code</StyledTableCell>
                  <StyledTableCell align="right">Enrollments</StyledTableCell>
                </TableRow>
              </TableHead>
              {data.map((ele) => (
                <StyledTableRow key={ele._id}>
                  <StyledTableCell align="right">
                    {ele._id || "NO PROMO CODE"}
                  </StyledTableCell>
                  <StyledTableCell align="right">{ele.count}</StyledTableCell>
                </StyledTableRow>
              ))}
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Grid>
  );
}

function PromoReport() {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <div>
        <h2>Promo Code Reports</h2>
        <Grid container spacing={2}>
          <PromoCodesInRange />
          {/* <Grid item md={6}>
          <Paper>a</Paper>
        </Grid> */}
        </Grid>
      </div>
    </MuiPickersUtilsProvider>
  );
}

export default PromoReport;
