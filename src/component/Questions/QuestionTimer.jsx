import React, { useEffect } from "react";
import { styled } from "@mui/system";
import { MdOutlineTimer } from "react-icons/md";
import { useStopwatch } from "react-timer-hook";
import { useDispatch, useSelector } from "react-redux";
const TimerContainer = styled("div")({
  border: "1px solid black",
  display: "flex",
  padding: "0.25rem 1rem",
  marginRight: "1rem",
  borderRadius: "0.25rem",
});

const TimerIcon = styled(MdOutlineTimer)({
  margin: "auto 0.5rem auto 0",
});

const Dot = styled("span")({
  fontWeight: "bold",
});

function QuestionTimer() {
  const timer = useSelector((selector) => selector.timer);
  const dispatch = useDispatch();

  const { seconds, minutes, hours, start, pause } = useStopwatch({
    autoStart: false,
  });

  useEffect(() => {
    if (timer.start) {
      start();
    } else {
      pause();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, timer.start]);

  return (
    <TimerContainer>
      <TimerIcon />
      <span>
        {hours < 10 ? 0 : ""}
        {hours}
      </span>
      <Dot>:</Dot>
      <span>
        {minutes < 10 ? 0 : ""}
        {minutes}
      </span>
      <Dot>:</Dot>
      <span>
        {seconds < 10 ? 0 : ""}
        {seconds}
      </span>
    </TimerContainer>
  );
}

export default QuestionTimer;
