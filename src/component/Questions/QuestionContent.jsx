import React, { Fragment, useEffect } from "react";
import { Alert, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import StartingPractice from "./StartingPractice";
import CorrectAnswer from "./CorrectAnswer";
import {
  nextQuestion,
  prevQuestion,
  submitAnswer,
} from "../../redux/actions/QuestionAction";
import CircularProgress from "@mui/material/CircularProgress";
import IncorrectAnswer from "./IncorrectAnswer";
import SolvedProgressBar from "../Student/SolvedProgressBar";
import { startTimer, stopTimer } from "../../redux/actions/TimerAction";
import GenericFormat from "./Formats/GenericFormat";
import PracticeResult from "./PracticeResult";
import QuestionHeader from "./QuestionHeader";

function QuestionContent() {
  const practice = useSelector((selector) => selector.question);
  const timer = useSelector((selector) => selector.timer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (practice.question && !timer.isRunning) {
      dispatch(startTimer());
    }
  }, [dispatch, practice.question, timer.isRunning]);

  function submit() {
    dispatch(stopTimer());
    dispatch(submitAnswer()).then((x) => {
      if (x) {
        dispatch(startTimer());
      }
    });
  }

  function next() {
    dispatch(nextQuestion());
  }

  function previous() {
    if (practice.isPrevious) {
      dispatch(prevQuestion());
    }
  }

  if (!practice.initialized)
    return <Alert severity="error">Please Start the Practice session!</Alert>;

  if (practice.error) return <Alert severity="error">{practice.error}</Alert>;

  return (
    <Fragment>
      <div style={{ minHeight: "80vh", marginBottom: 50 }}>
        <QuestionHeader />

        <div>
          {practice.isLoading &&
            !(practice.isStarting && practice.initialized) && (
              <CircularProgress />
            )}
          {practice.isStarting && practice.initialized && <StartingPractice />}

          {practice.ansCorrect === true && <CorrectAnswer />}
          {practice.ansCorrect === false && <IncorrectAnswer />}

          <GenericFormat />

          {/* TODO: Add Solution Here. */}
        </div>

        {practice.solved + practice.wrong === practice.totalQuestions && (
          <PracticeResult />
        )}

        {practice.initialized && (
          <div className="d-flex justify-content-start mt-5">
            <Button
              variant="contained"
              color="error"
              disabled={!practice.isPrevious || practice.ansCorrect !== null}
              onClick={previous}
              sx={{ marginRight: "1rem" }}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              color="success"
              disabled={!practice.isSubmit}
              sx={{ marginRight: "1rem" }}
              onClick={submit}
            >
              Submit
            </Button>

            <Button
              variant="contained"
              disabled={practice.nextQuestion === null}
              onClick={next}
            >
              Next
            </Button>
          </div>
        )}
      </div>
      <SolvedProgressBar />
    </Fragment>
  );
}

export default QuestionContent;
