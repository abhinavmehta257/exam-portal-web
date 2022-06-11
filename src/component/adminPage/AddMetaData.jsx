import React, { useState, useEffect, Fragment } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  Avatar,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
} from "@mui/material";
import { MdOutlineAdd, MdDelete } from "react-icons/md";
import ClassService from "../../services/ClassService";
import { useToasts } from "react-toast-notifications";
import { stringError } from "../../helper/common";
import SwipeableViews from "react-swipeable-views/lib/SwipeableViews";
import { useTheme } from "@emotion/react";
import DialogAddSubject from "./DialogAddSubject";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";

function SkillCard({
  data,
  onClick,
  addSubtopic,
  removeSkill,
  removeSubtopic,
}) {
  return (
    <Grid item md={3}>
      <Paper sx={{ padding: "1em" }}>
        <div className="d-flex">
          <Typography
            variant="h5"
            gutterBottom
            sx={{ margin: "auto 0", flex: 1 }}
          >
            {data.title}
          </Typography>
          <IconButton color="primary" component="span" onClick={addSubtopic}>
            <MdOutlineAdd />
          </IconButton>
          <IconButton
            edge="end"
            sx={{ color: "#eb0505" }}
            onClick={() => removeSkill(data._id)}
          >
            <MdDelete />
          </IconButton>
        </div>

        <List>
          {(data?.subtopics || []).map((topic, index) => (
            <ListItem
              key={topic._id}
              disablePadding
              secondaryAction={
                <IconButton
                  edge="end"
                  sx={{ color: "#eb0505" }}
                  onClick={() =>
                    removeSubtopic({
                      id: topic._id,
                      skillId: data._id,
                    })
                  }
                >
                  <MdDelete />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar>{index + 1}</Avatar>
              </ListItemAvatar>
              <ListItemButton onClick={() => onClick(topic._id)}>
                <ListItemText primary={topic.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Grid>
  );
}

function AddMetaData() {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToasts();
  const theme = useTheme();
  const [skills, setSkills] = useState([]);
  const [addSubjectOpen, setAddSubjectOpen] = useState(false);
  const [addSkillOpen, setAddSkillOpen] = useState(false);
  const [addSubtopicOpen, setAddSubtopicOpen] = useState(null);
  const [deleteSubject, setDeleteSubject] = useState("");
  const [deleteSkill, setDeleteSkill] = useState("");
  const [deleteSubtopic, setDeleteSubtopic] = useState("");

  const handleChange = async (_, newValue) => {
    if (subjects.length > newValue) {
      const _skills = skills;
      _skills[newValue] = await ClassService.listSkillsSubtopic([
        subjects[newValue]._id,
      ]);
      setSkills([..._skills]);
      setSelectedSubject(newValue);
    }
  };

  async function initApis() {
    setIsLoading(true);
    const subjects = await ClassService.listSubjects();
    const _skills = new Array(subjects.length).fill(null);
    if (subjects.length > 0) {
      _skills[0] = await ClassService.listSkillsSubtopic([subjects[0]._id]);
    }

    setSkills(_skills);
    setSubjects(subjects);
    setIsLoading(false);
  }

  async function addSubject(title, ids) {
    const { data } = await ClassService.addSubject(title, ids);
    setSubjects([
      ...subjects,
      {
        _id: data.id,
        title: title,
      },
    ]);
    return true;
  }

  async function addSkill(title, ids) {
    const { data } = await ClassService.addSkill(
      subjects[selectedSubject]._id,
      title,
      ids
    );
    skills[selectedSubject].push({
      _id: data.id,
      title,
    });
    setSkills([...skills]);
    return true;
  }

  function removeSkill(id) {
    skills[selectedSubject] = skills[selectedSubject].filter(
      (ele) => ele._id !== id
    );
    setSkills([...skills]);
  }

  async function addSubtopic(title, ids) {
    const skillId = addSubtopicOpen._id;
    const { data } = await ClassService.addSubtopic(skillId, title, ids);
    let _skill = skills[selectedSubject];
    _skill = _skill.map((ele) => {
      if (ele._id === skillId) {
        ele.subtopics.push({
          _id: data.id,
          title,
          skillId,
        });
      }
      return ele;
    });
    skills[selectedSubject] = _skill;
    return true;
  }

  function removeSubtopic(subtopic) {
    const skillId = subtopic.skillId;
    if (selectedSubject < 0 || selectedSubject > skills.length) return;
    let _skill = skills[selectedSubject];
    _skill = _skill.map((ele) => {
      if (ele._id === skillId) {
        ele.subtopics = ele.subtopics.filter((ele) => ele._id !== subtopic.id);
      }
      return ele;
    });
    skills[selectedSubject] = _skill;
    setSkills([...skills]);
  }

  function removeSubject(id) {
    const index = subjects.findIndex((ele) => ele._id === id);
    if (index < 0 || index > subjects.length) {
      return;
    }
    setSelectedSubject(0);
    setSkills(skills.filter((_, ind) => ind !== index));
    setSubjects(subjects.filter((ele) => ele._id !== id));
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
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{ borderBottom: 1, borderColor: "divider", marginBottom: "1rem" }}
      >
        <Tabs value={selectedSubject} onChange={handleChange}>
          {subjects.map((ele) => (
            <Tab
              component={Box}
              label={ele.title}
              key={ele._id}
              icon={
                <div>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    sx={{ color: "#eb0505" }}
                    onClick={(e) => setDeleteSubject(ele._id)}
                  >
                    <MdDelete />
                  </IconButton>
                </div>
              }
              iconPosition="end"
            />
          ))}
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            onClick={() => setAddSubjectOpen(true)}
          >
            <MdOutlineAdd />
          </IconButton>
        </Tabs>
      </Box>
      {isLoading && <CircularProgress />}

      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={selectedSubject}
        onChangeIndex={(x) => setSelectedSubject(x)}
      >
        {skills.map((ele, ind) => (
          <Fragment key={ind}>
            <Grid container spacing={2}>
              <Grid item md={3}>
                <Box
                  sx={{
                    border: "1px dashed #000",
                    display: "flex",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <Button
                    variant="outlined"
                    sx={{ margin: "auto" }}
                    onClick={() => setAddSkillOpen(true)}
                  >
                    Add Skill
                  </Button>
                </Box>
              </Grid>

              {(ele || []).map((skill) => (
                <SkillCard
                  key={skill._id}
                  data={skill}
                  addSubtopic={() => setAddSubtopicOpen(skill)}
                  removeSubtopic={(id) => setDeleteSubtopic(id)}
                  removeSkill={(id) => setDeleteSkill(id)}
                />
              ))}
            </Grid>
          </Fragment>
        ))}
      </SwipeableViews>

      {addSubjectOpen && (
        <DialogAddSubject
          open={addSubjectOpen}
          handleClose={() => setAddSubjectOpen(false)}
          dialogTitle={"Add Subject"}
          onSubmit={addSubject}
        />
      )}

      {addSkillOpen && (
        <DialogAddSubject
          open={addSkillOpen}
          handleClose={() => setAddSkillOpen(false)}
          dialogTitle={"Add Skill for " + subjects[selectedSubject].title}
          onSubmit={addSkill}
        />
      )}

      {addSubtopicOpen && (
        <DialogAddSubject
          open={Boolean(addSubtopicOpen !== null)}
          handleClose={() => setAddSubtopicOpen(null)}
          dialogTitle={"Add Subtopic for " + addSubtopicOpen?.title}
          onSubmit={addSubtopic}
        />
      )}

      <ConfirmDeleteDialog
        open={Boolean(deleteSubject || deleteSkill || deleteSubtopic)}
        handleClose={() => {
          setDeleteSubject("");
          setDeleteSkill("");
          setDeleteSubtopic("");
        }}
        subject={deleteSubject}
        skill={deleteSkill}
        subtopic={deleteSubtopic}
        removeSubject={removeSubject}
        removeSkill={removeSkill}
        removeSubtopic={removeSubtopic}
      />
    </Box>
  );
}

export default AddMetaData;
