import React, { Fragment, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import {
  Typography,
  Menu,
  MenuItem,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SwipeableViews from "react-swipeable-views";
import ClassService from "../../services/ClassService";
import { MdExpandMore } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import {
  initializePractice,
  startPractice,
} from "../../redux/actions/QuestionAction";
import { stringError } from "../../helper/common";
import { loadPracticeSidebar } from "../../redux/actions/PracticeAction";

const TIME = [
  {
    value: 5,
    title: "5 sec",
  },
  {
    value: 10,
    title: "10 sec",
  },
  {
    value: 20,
    title: "20 sec",
  },
  {
    value: 30,
    title: "30 sec",
  },
];

function SkillCard({ data, onClick }) {
  return (
    <Grid item md={3}>
      <Paper sx={{ padding: "1em" }}>
        <Typography variant="h5" gutterBottom>
          {data.title}
        </Typography>
        <List>
          {(data?.subtopics || []).map((topic) => (
            <ListItem key={topic._id} disablePadding>
              <ListItemButton onClick={() => onClick(topic._id, topic.title)}>
                <ListItemText primary={topic.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Grid>
  );
}

function StudentPractice() {
  const [selectedSubject, setSelectedSubject] = useState(0);
  const theme = useTheme();
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [difficulty, setDifficulty] = useState([]);
  const [skills, setSkills] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState({});
  const [selectedTime, setSelectedTime] = useState(0);
  const [selectedTimeText, setSelectedTimeText] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addToast } = useToasts();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (val) => {
    if (val) {
      setSelectedTime(val);
      setSelectedTimeText(`${val} Sec`);
    }
    setAnchorEl(null);
  };

  async function initApis() {
    setIsLoading(true);
    const diff = await ClassService.listDifficulty();
    const subjects = await ClassService.listSubjects();
    const _skills = new Array(subjects.length).fill(null);

    if (subjects.length > 0) {
      _skills[0] = await ClassService.listSkillsSubtopic([subjects[0]._id]);
    }

    setSkills(_skills);
    setDifficulty(diff);
    setSubjects(subjects);
    const allDiff = {};
    (diff || []).forEach((ele) => (allDiff[ele._id] = true));
    setSelectedDifficulty(allDiff);
    setIsLoading(false);
  }

  function changeDifficulty(id) {
    if (selectedDifficulty[id] === true) {
      delete selectedDifficulty[id];
    } else selectedDifficulty[id] = true;
    setSelectedDifficulty({
      ...selectedDifficulty,
    });
  }

  async function fetchSkill(i) {
    if (i > skills.length) return;
    const _skills = skills[i];
    if (_skills) return;
    setIsLoading(true);
    skills[i] = await ClassService.listSkillsSubtopic([subjects[i]._id]);
    setSkills(skills.slice());
    setIsLoading(false);
  }

  function changeSubject(i) {
    // TODO: Handle Session Timeouts.
    fetchSkill(i).catch(
      stringError((x) => {
        return addToast(x, {
          appearance: "error",
          autoDismissTimeout: 10000,
        });
      })
    );
    setSelectedSubject(i);
  }

  function submit(id, title) {
    if (Object.keys(selectedDifficulty).length <= 0) {
      return addToast("Please Select a Difficulty Level", {
        appearance: "error",
        autoDismissTimeout: 10000,
      });
    }
    const difficulties = Object.keys(selectedDifficulty);
    const request = {
      subjects: [],
      subtopics: [id],
      difficulties,
      endTime: selectedTime,
      startTime: new Date(),
    };
    dispatch(initializePractice());
    setTimeout(() => dispatch(startPractice(request)), 2000);

    if (selectedSubject > -1 && selectedSubject < subjects.length) {
      dispatch(
        loadPracticeSidebar(
          [subjects[selectedSubject]._id],
          difficulties,
          title
        )
      );
    }
    navigate("/question");
  }
  useEffect(() => {
    // TODO: Catch Session timeout error.
    initApis().catch(
      stringError((x) => {
        return addToast(x, {
          appearance: "error",
          autoDismissTimeout: 10000,
        });
      })
    );
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Grid container spacing={2} sx={{ marginBottom: "1.5em" }}>
        <Grid item md={6}>
          <Typography variant="h6" gutterBottom>
            Subject
          </Typography>
          <ButtonGroup
            variant="outlined"
            aria-label="outlined primary button group"
          >
            {subjects.map((ele, i) => (
              <Button
                key={ele._id}
                variant={i === selectedSubject ? "contained" : "outlined"}
                onClick={() => changeSubject(i)}
              >
                {ele.title}
              </Button>
            ))}
          </ButtonGroup>
        </Grid>
        <Grid item md={3}>
          <Typography variant="h6" gutterBottom>
            Difficulty
          </Typography>
          <ButtonGroup
            variant="outlined"
            aria-label="outlined primary button group"
          >
            {difficulty.map((ele, i) => (
              <Button
                key={ele._id}
                variant={
                  selectedDifficulty[ele._id] === true
                    ? "contained"
                    : "outlined"
                }
                onClick={() => changeDifficulty(ele._id)}
              >
                {ele.title}
              </Button>
            ))}
          </ButtonGroup>
        </Grid>
        <Grid item md={3}>
          <Typography variant="h6" gutterBottom>
            Timer
          </Typography>
          <ButtonGroup variant="outlined">
            <Button
              variant={selectedTime !== 0 ? "contained" : "outlined"}
              endIcon={<MdExpandMore />}
              onClick={handleClick}
            >
              {selectedTime !== 0 ? selectedTimeText : "Enable"}
            </Button>
            <Button
              variant={selectedTime === 0 ? "contained" : "outlined"}
              onClick={() => setSelectedTime(0)}
            >
              Disable
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>

      <Menu
        id="time-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleClose(0)}
      >
        {TIME.map((ele) => (
          <MenuItem onClick={() => handleClose(ele.value)} key={ele.value}>
            {ele.title}
          </MenuItem>
        ))}
      </Menu>

      {isLoading && <CircularProgress />}

      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={selectedSubject}
        onChangeIndex={(x) => setSelectedSubject(x)}
      >
        {skills.map((ele, ind) => (
          <Fragment key={ind}>
            {(ele || []).length === 0 && <CircularProgress />}
            <Grid container spacing={2}>
              {(ele || []).map((skill) => (
                <SkillCard key={skill._id} data={skill} onClick={submit} />
              ))}
            </Grid>
          </Fragment>
        ))}
      </SwipeableViews>
    </div>
  );
}

export default StudentPractice;
