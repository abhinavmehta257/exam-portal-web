import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import {
  fetchCompetitions,
  deleteCompetitions,
  competitionStatus,
} from "../../redux";
import ChooseQuestions from "./ChooseQuestions";
import { useToasts } from "react-toast-notifications";
import moment from "moment";
import { COMPETITION_NOTIFICATION } from "../../redux/actions/competitionType";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import {
  MdDelete,
  MdModeEdit,
  MdFormatListNumbered,
  MdOutlinePlaylistAdd,
  MdOutlineCheck,
  MdOutlineClose,
} from "react-icons/md";
import { BiBlock } from "react-icons/bi";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import CompetitionService from "../../services/CompetitionService";
import { updateResult } from "../../redux/actions/competitionAction";

export const ExamList = (props) => {
  const [status, setStatus] = useState(false);
  const [quesStatus, setQuesStatus] = useState(false);
  const [quesModalType, setquesModalType] = useState("edit");
  const [data, setData] = useState({});
  const { addToast } = useToasts();
  const navigation = useNavigate();

  function questionPanel(type, comp) {
    setquesModalType(type);
    setQuesStatus(!quesStatus);
    setData(comp);
  }

  function updatePanel(comp) {
    setStatus(!status);
    setData(comp);
  }

  if (quesStatus !== false) {
    var questionChoose = (
      <ChooseQuestions
        quesStatus={quesStatus}
        onHide={() => setQuesStatus(false)}
        data={data}
        quesModalType={quesModalType}
      />
    );
  }

  let { page } = useParams();
  if (!page) {
    page = 1;
  }
  const { count, perPage } = props.competitions;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCompetitions(page));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const deleteCompetition = async (id) => {
    const confirm = window.confirm("Are you really want to delete this post?");
    if (confirm) {
      try {
        dispatch(deleteCompetitions(id));
      } catch (error) {
        // TODO: Show Error.
        // console.log(error);
      }
    }
  };

  useEffect(() => {
    if (props.competitions.msg !== "") {
      if (props.competitions.msg) {
        if (props.competitions.msgType === "success") {
          addToast(props.competitions.msg, {
            appearance: "success",
            autoDismissTimeout: 5000,
          });
        } else {
          addToast(props.competitions.msg, {
            appearance: "error",
            autoDismissTimeout: 5000,
          });
        }
        props.msgReset();
        return;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.competitions.msg]);

  const updateResultClick = (resultOut, id) =>
    dispatch(updateResult(resultOut, id));

  return (
    <Box>
      {questionChoose}

      <div
        className="d-flex mb-4"
        style={{ width: "100%", justifyContent: "space-between" }}
      >
        <h2>Competition List</h2>
        <Button
          variant="contained"
          loadingPosition="start"
          // startIcon={<MdSearch />}
          href="/admin/competitions"
          to="/admin/competitions"
          component={Link}
          sx={{
            color: "#fff !important",
            // backgroundColor: "#198754",
          }}
          color="success"
        >
          Add Competition
        </Button>
      </div>

      <Paper sx={{ width: "calc(100vw - 300px)", mb: 2 }}>
        <TableContainer>
          <Table
          // sx={{ minWidth: 750, maxWidth: "100%" }}
          // size={"medium"}
          // stickyHeader
          >
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Serial
                </TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Subject</TableCell>
                <TableCell align="center">Questions</TableCell>
                <TableCell align="center">Country</TableCell>
                <TableCell align="center">Start Date</TableCell>
                <TableCell align="center">Marks</TableCell>
                <TableCell align="left">Pay Status</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Result Out</TableCell>
                <TableCell align="left">Question</TableCell>
                <TableCell align="left">Edit</TableCell>
                <TableCell align="left">Delete</TableCell>
              </TableRow>
            </TableHead>
            {props.competitions.loading ? (
              <TableRow>
                <TableCell colSpan={12} className="text-center">
                  <CircularProgress color="success" />
                </TableCell>
              </TableRow>
            ) : (
              (props?.competitions?.competitionsData || []).map((val, i) => (
                <TableRow key={i}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell onClick={() => updatePanel(val)}>
                    {val.competitionName}
                  </TableCell>
                  <TableCell>
                    {val.classData.title} / {val.subjectData.title}
                  </TableCell>
                  <TableCell>
                    {val.totalQuestion}/{val.questions.length}
                  </TableCell>
                  <TableCell>
                    {val.countryData.name} / {val.classData.countryCode}
                  </TableCell>
                  <TableCell>
                    {moment(val.startDateTime).format("DD/MM/YYYY HH:mm")}
                  </TableCell>
                  {/* <td>
                    {moment(
                      new Date(
                        new Date(val.startDateTime).getTime() - 2 * 60000
                      )
                    ).format("DD/MM/YYYY HH:mm")}
                  </td> */}
                  <TableCell>{val.totalMarks}</TableCell>
                  <TableCell>
                    {val.payStatus ? (
                      <b className="text-danger">Payment</b>
                    ) : (
                      <b className="text-success">Free</b>
                    )}
                  </TableCell>
                  <TableCell>
                    {val.status ? (
                      <AiFillEye
                        className="pointer text-success"
                        onClick={() => props.competitionStatus(val._id, 0)}
                        size={25}
                      />
                    ) : (
                      <AiFillEyeInvisible
                        className="pointer text-danger"
                        onClick={() => props.competitionStatus(val._id, 1)}
                        size={24}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="result-out"
                      size="large"
                      onClick={() => updateResultClick(!val.resultOut, val._id)}
                      color={val.resultOut ? "success" : "error"}
                    >
                      {val.resultOut ? <MdOutlineCheck /> : <MdOutlineClose />}
                    </IconButton>
                  </TableCell>
                  {moment(
                    new Date(new Date(val.startDateTime).valueOf() - 2 * 60000)
                  ) <= moment(new Date()).valueOf() ? (
                    <>
                      <TableCell>
                        <IconButton
                          aria-label="delete"
                          size="large"
                          onClick={() => questionPanel("preview", val)}
                          title="Question List"
                        >
                          <MdFormatListNumbered />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <BiBlock />
                      </TableCell>
                      <TableCell>
                        <BiBlock />
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>
                        <IconButton
                          aria-label="edit-questions"
                          size="large"
                          onClick={() => questionPanel("edit", val)}
                          title="Edit Questions"
                        >
                          <MdOutlinePlaylistAdd />
                        </IconButton>

                        <IconButton
                          aria-label="delete"
                          size="large"
                          onClick={() => questionPanel("preview", val)}
                          title="Question List"
                        >
                          <MdFormatListNumbered />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="delete"
                          size="large"
                          to={`/admin/edit-competition/${val._id}`}
                          component={Link}
                          sx={{ color: "#0d6efd" }}
                          title="Edit Competition"
                        >
                          <MdModeEdit />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="delete"
                          size="large"
                          onClick={() => deleteCompetition(val._id)}
                          sx={{ color: "red" }}
                          title="Delete"
                        >
                          <MdDelete />
                        </IconButton>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))
            )}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[perPage]}
          component="div"
          count={Math.ceil(count)}
          rowsPerPage={perPage}
          page={parseInt(page || 1) - 1}
          onPageChange={(e, newPage) => {
            navigation(`/admin/competitionlist/${newPage + 1}`);
          }}
        />
      </Paper>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  competitions: state.competitions,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCompetitions: function () {
      dispatch(fetchCompetitions());
    },
    competitionStatus: function (id, status) {
      dispatch(competitionStatus(id, status));
    },
    msgReset: function () {
      dispatch({
        type: COMPETITION_NOTIFICATION,
        msg: "",
        msgType: "",
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExamList);
