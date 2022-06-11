import { LoadingButton } from "@mui/lab";
import {
  Alert,
  AlertTitle,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { MdSearch } from "react-icons/md";
import { useToasts } from "react-toast-notifications";
import { stringError } from "../../helper/common";
import ClassService from "../../services/ClassService";
import QuestionService from "../../services/QuestionService";
const ITEM_PER_PAGE = 15;

const HEADERS = {
  "61bace9584476677d477e76b": [
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4",
    "Answer",
  ],
  "61bace9584476677d477e76c": ["LHS", "LHS Unit", "RHS", "RHS Unit", "Answer"],
  "61bace9584476677d477e76d": [
    "Addend 1",
    "Operator",
    "Addend 2",
    "Result",
    "Answer",
  ],
  "61bace9584476677d477e76e": ["Equation", "Options", "Answer"],
};

function QuestionRow({ row, format }) {
  function formatValues() {
    // Format 1
    if (format === "61bace9584476677d477e76b")
      return [...(row.data.options || []), row.answer];
    // Format 2
    if (format === "61bace9584476677d477e76c")
      return [
        row.data.lhs === null ? "__" : row.data.lhs,
        row.data.lhsUnit,
        row.data.rhs === null ? "__" : row.data.rhs,
        row.data.rhsUnit,
        row.answer,
      ];
    // Format 3
    if (format === "61bace9584476677d477e76d")
      return [
        row.data.addend1.map((eq) => (eq === null ? "__" : eq)).join(""),
        row.data.operator,
        row.data.addend2.map((eq) => (eq === null ? "__" : eq)).join(""),
        row.data.result.join(""),
        row.answer.join(","),
      ];
    // Format 4
    if (format === "61bace9584476677d477e76e")
      return [
        row.data.equation.map((eq) => (eq === null ? "__" : eq)).join(" "),
        row.data.options.join(","),
        row.answer.join(","),
      ];
    return [];
  }

  return (
    <TableRow
      hover
      role="checkbox"
      //   onClick={(event) => handleClick(event, row.name)}
      //   aria-checked={isItemSelected}
      //   selected={isItemSelected}
      tabIndex={-1}
      key={row.name}
    >
      <TableCell align="right" sx={{ fontWeight: "bold" }}>
        {row.serial}
      </TableCell>
      <TableCell align="left" sx={{ minWidth: 150 }}>
        {row.country.map((c) => c.name).join(",")}
      </TableCell>
      <TableCell align="left" sx={{ minWidth: 150 }}>
        {row.classes.map((c) => c.title).join(",")}
      </TableCell>
      <TableCell align="right">{row.difficulty?.title}</TableCell>
      <TableCell align="right">{row.subject?.title}</TableCell>
      <TableCell align="right">{row.skill?.title}</TableCell>
      <TableCell align="right">{row.subtopic?.title}</TableCell>
      <TableCell align="left" sx={{ minWidth: 300 }}>
        {row.title}
      </TableCell>
      {/* Answer and other data based on format */}
      {formatValues().map((val, ind) => (
        <TableCell align="right" key={ind}>
          {val}
        </TableCell>
      ))}
      <TableCell align="right">{row.hintAudio}</TableCell>
      <TableCell align="right">{row.hintVideo}</TableCell>
      <TableCell align="right">{row.rubricAudio}</TableCell>
    </TableRow>
  );
}

function QuestionHead({ format }) {
  return (
    <TableHead>
      <TableRow>
        <TableCell align="center" sx={{ fontWeight: "bold" }}>
          Serial
        </TableCell>
        <TableCell align="left">Regions</TableCell>
        <TableCell align="left">Class {"&"} Year</TableCell>
        <TableCell align="center">Difficulty</TableCell>
        <TableCell align="center">Subject</TableCell>
        <TableCell align="center">Skills</TableCell>
        <TableCell align="center">Subtopic</TableCell>
        <TableCell align="left">Question</TableCell>
        {(HEADERS[format] || []).map((h) => (
          <TableCell align="left" key={h}>
            {h}
          </TableCell>
        ))}
        <TableCell align="left">Hint Audio</TableCell>
        <TableCell align="left">Hint Video</TableCell>
        <TableCell align="left">Rurbic Audio</TableCell>
      </TableRow>
    </TableHead>
  );
}

function AllQuestionsTable() {
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToasts();
  const [formats, setFormats] = useState([]);
  const [selectedFormat, setSelectedFormat] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(0);
  const [maxPage, setMaxPage] = useState(0);
  const [end, setEnd] = useState(false);
  const [error, setError] = useState("");

  function initApis() {
    setIsLoading(true);
    ClassService.listFormats()
      .then((_formats) => setFormats(_formats))
      .catch(
        stringError((err) =>
          addToast(err, {
            appearance: "error",
            autoDismissTimeout: 50000,
          })
        )
      );
    setIsLoading(false);
  }

  function loadQuestions(page = 1) {
    if (!selectedFormat) return setError("Please Select a Format");
    if (!HEADERS[selectedFormat._id]) return setError("Format Not Supported");
    setError("");
    setIsLoading(true);
    QuestionService.adminLoadQuestions(selectedFormat._id, page)
      .then((ques) => {
        setIsLoading(false);
        const _end = ques.length < ITEM_PER_PAGE;
        if (maxPage < page) setMaxPage(page);
        if (page === 1) {
          setQuestions(ques);
        } else if (page > 1) {
          setQuestions(questions.concat(ques));
        }
        if (end === false && _end === true) {
          setPage(page - 1);
        }
        setEnd(_end);
      })
      .catch(stringError((x) => setError(x)));
  }

  const handleChangePage = (_, newPage) => {
    if (newPage + 1 <= maxPage) {
      setPage(newPage);
    } else loadQuestions(newPage + 1);
  };

  function search() {
    setEnd(false);
    setMaxPage(0);
    setPage(0);
    loadQuestions(1);
  }

  useEffect(() => {
    initApis();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // const emptyRows =
  //   page > 0 ? Math.max(0, (1 + page) * ITEM_PER_PAGE - questions.length) : 0;
  return (
    <Box>
      <div className="d-flex" style={{ width: "70%", marginBottom: "1rem" }}>
        <FormControl fullWidth>
          <InputLabel id="type">Question Format</InputLabel>
          <Select
            labelId="type"
            id="selectType"
            value={selectedFormat?._id || ""}
            label="Question Type"
            onChange={(e) => {
              setSelectedFormat(
                formats.find((ele) => ele._id === e.target.value)
              );
              setQuestions("");
            }}
          >
            {formats.map((ele) => (
              <MenuItem key={ele._id} value={ele._id}>
                {ele.title} ({ele.label})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <LoadingButton
          variant="contained"
          loading={isLoading}
          loadingPosition="start"
          startIcon={<MdSearch />}
          sx={{ marginLeft: "1rem" }}
          onClick={search}
        >
          Search
        </LoadingButton>
      </div>
      {error && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}
      {questions.length > 0 && (
        <Paper sx={{ width: "calc(100vw - 300px)", mb: 2 }}>
          <TableContainer sx={{ height: 500 }}>
            <Table
              // sx={{ minWidth: 750, maxWidth: "100%" }}
              // size={"medium"}
              stickyHeader
            >
              <QuestionHead format={selectedFormat._id} />
              <TableBody>
                {questions
                  .slice(page * ITEM_PER_PAGE, (page + 1) * ITEM_PER_PAGE)
                  .map((ele) => (
                    <QuestionRow
                      row={ele}
                      key={ele._id}
                      format={selectedFormat._id}
                    />
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[15]}
            component="div"
            count={questions.length + (end ? 0 : 1)}
            rowsPerPage={15}
            page={page}
            onPageChange={handleChangePage}
          />
        </Paper>
      )}
    </Box>
  );
}

export default AllQuestionsTable;
