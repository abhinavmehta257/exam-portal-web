import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  initializePractice,
  startPractice,
} from "../../redux/actions/QuestionAction";
import { stopTimer } from "../../redux/actions/TimerAction";

function TopicsSameSubject() {
  const [selectedIndex, setSelectedIndex] = React.useState("");
  const practice = useSelector((selector) => selector.practice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleListItemClick = (_, id) => {
    setSelectedIndex(id);
    dispatch(stopTimer());
    // console.log(practice.difficulties);
    const difficulties = practice.difficulties;
    const request = {
      subjects: [],
      subtopics: [id],
      difficulties,
      endTime: 0,
      startTime: new Date(),
    };
    dispatch(initializePractice());
    setTimeout(() => dispatch(startPractice(request)), 2000);
  };

  return (
    <Box sx={{ width: "100%", background: "#f4f2f2", height: "100%" }}>
      <List
        component="nav"
        subheader={
          <ListSubheader sx={{ backgroundColor: "#f4f2f2" }}>
            Options
          </ListSubheader>
        }
      >
        <ListItemButton onClick={() => navigate("/student")}>
          <ListItemText primary={"Dashboard"} />
        </ListItemButton>
      </List>
      <Divider />
      {practice.skills.map((ele, index) => (
        <React.Fragment key={ele._id}>
          <List
            component="nav"
            subheader={
              <ListSubheader sx={{ backgroundColor: "#f4f2f2" }}>
                {ele.title}
              </ListSubheader>
            }
          >
            {(ele.subtopics || []).map((subtopic) => (
              <ListItemButton
                key={subtopic._id}
                selected={selectedIndex === subtopic._id}
                onClick={(event) => handleListItemClick(event, subtopic._id)}
              >
                <ListItemText primary={subtopic.title} />
              </ListItemButton>
            ))}
          </List>
          {index + 1 < practice.skills.length && <Divider />}
        </React.Fragment>
      ))}
    </Box>
  );
}

export default TopicsSameSubject;
