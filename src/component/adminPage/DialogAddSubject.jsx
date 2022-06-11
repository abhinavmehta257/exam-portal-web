import {
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { stringError } from "../../helper/common";
import ClassService from "../../services/ClassService";
import LoadingButton from "@mui/lab/LoadingButton";

const mb = { marginBottom: "1em" };

function DialogAddSubject({ open, handleClose, dialogTitle, onSubmit }) {
  const [countries, setCountries] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [countryById, setCountryById] = useState({});
  const [classesByCode, setClassesByCode] = useState({});
  const [classesByID, setClassesByID] = useState({});
  const [selectedClass, setSelectedClass] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleRegionChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedRegions(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  async function initApis() {
    setIsLoading(true);
    const [_countries, _classes] = await Promise.all([
      ClassService.listCountries(),
      ClassService.listClasses(),
    ]);
    setCountries(_countries);
    const tmp = {};
    _countries.forEach((ele) => (tmp[ele.code] = ele.name));
    setCountryById(tmp);

    const tmpCountry = {},
      tmpClass = {};
    _classes.forEach((ele) => {
      tmpClass[ele._id] = ele.title;
      if (!(ele.countryCode in tmpCountry)) {
        tmpCountry[ele.countryCode] = [];
      }
      tmpCountry[ele.countryCode].push(ele);
    });
    setClassesByID(tmpClass);
    setClassesByCode(tmpCountry);
    setIsLoading(false);
  }

  async function submitButtonClick() {
    setError("");
    if (!title) {
      return setError("Please Enter Title");
    }
    const ids = [];
    let regionError = "";
    selectedRegions.forEach((ele) => {
      const inDict = Object.keys(selectedClass[ele] || {});
      if (inDict.length < 0) {
        regionError = "For a Selected Region Class is Empty!";
      }
      ids.push(...inDict);
    });
    if (regionError) return setError(regionError);
    setIsLoading(true);
    if (onSubmit) {
      onSubmit(title, ids)
        .then(() => {
          if (handleClose) {
            handleClose();
          }
        })
        .catch(stringError((x) => setError(x)));
    }
    setIsLoading(false);
  }

  function addClass(code) {
    return (ev) => {
      const tmp = selectedClass;
      const { value } = ev.target;
      const ids = typeof value === "string" ? value.split(",") : value;
      // if(ids.length <= 0) return;
      // const id = ids[ids.length - 1];

      // if (tmp[ele] && tmp[ele][id]) {
      //   if (tmp[ele][id] === true) {
      //     const byEle = tmp[ele];
      //     delete byEle[id];
      //     tmp[ele] = byEle;
      //   } else tmp[ele][id] = true;
      // } else {
      //   if (tmp[ele]) tmp[ele][id] = true;
      //   else
      //     tmp[ele] = {
      //       [id]: true,
      //     };
      // }
      tmp[code] = {};
      ids.forEach((ele) => (tmp[code][ele] = true));
      setSelectedClass({
        ...tmp,
      });
    };
  }

  useEffect(() => {
    initApis();
  }, []);

  return (
    <Dialog open={open}>
      <DialogTitle
        sx={{ m: 0, p: 2, display: "flex", justifyContent: "space-between" }}
      >
        <Typography
          variant="h6"
          gutterBottom
          component="div"
          sx={{ margin: "auto 0" }}
        >
          {dialogTitle}
        </Typography>

        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <MdClose />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ width: "480px" }}>
        {error && (
          <Alert severity="error" sx={{ marginBottom: "1rem" }}>
            {error}
          </Alert>
        )}

        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          sx={mb}
          onChange={(e) => setTitle(e.target.value)}
        />

        <FormControl fullWidth sx={mb}>
          <InputLabel id="region">Region</InputLabel>
          <Select
            labelId="region"
            id="selectRegion"
            value={selectedRegions}
            label="Region"
            multiple
            onChange={handleRegionChange}
            renderValue={(selected) =>
              selected.map((ele) => countryById[ele]).join(", ")
            }
          >
            {countries.map((c) => (
              <MenuItem key={c.code} value={c.code}>
                <Checkbox checked={selectedRegions.indexOf(c.code) > -1} />
                <ListItemText primary={c.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {selectedRegions.map((ele) => {
          if (classesByCode[ele]) {
            return (
              <FormControl key={ele} fullWidth sx={mb}>
                <InputLabel id="classes">
                  {ele === "IN" ? "Class" : "Year"}
                </InputLabel>
                <Select
                  labelId="classes"
                  id="selectClasses"
                  value={[...Object.keys(selectedClass[ele] || {})]}
                  label={ele === "IN" ? "Class" : "Year"}
                  multiple
                  onChange={addClass(ele)}
                  renderValue={(selected) =>
                    selected.map((id) => classesByID[id] || "").join(", ")
                  }
                >
                  {classesByCode[ele].map((classCode) => (
                    <MenuItem key={classCode._id} value={classCode._id}>
                      <Checkbox
                        checked={
                          (selectedClass[ele] || {})[classCode._id] === true
                        }
                      />
                      <ListItemText primary={classCode.title} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            );
          }
          return null;
        })}
      </DialogContent>
      <DialogActions>
        <LoadingButton
          variant="contained"
          loading={isLoading}
          loadingPosition="start"
          onClick={submitButtonClick}
        >
          Submit
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default DialogAddSubject;
