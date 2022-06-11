/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  Button,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import FileUploadArea from "../../common/FileUploadArea";
import DownloadAddItemDialog from "./DownloadAddItemDialog";
import { useTheme } from "@mui/material/styles";
import DownloadService from "../../../services/DownloadService";
import { MdAdd, MdSend } from "react-icons/md";
import { useToasts } from "react-toast-notifications";
import { stringError, toDictionary } from "../../../helper/common";
import ClassService from "../../../services/ClassService";
import { LoadingButton } from "@mui/lab";

const DialogType = Object.freeze({
  Subject: 0,
  Exam: 1,
  Type: 2,
});

const mb = {
  marginBottom: "1.2rem",
};

function AddDownloadBook() {
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [prices, setPrices] = useState({});
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isFree, setIsFree] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDialog, setSelectedDialog] = useState(null);
  const [subjects, setSubjects] = React.useState([]);
  const [exams, setExams] = React.useState([]);
  const [classes, setClasses] = React.useState([]);
  const [countries, setCountries] = React.useState([]);
  const [types, setTypes] = React.useState([]);
  const [selectedClasses, setSelectedClasses] = React.useState([]);
  const [selectedSubject, setSelectedSubject] = React.useState([]);
  const [selectedExam, setSelectedExam] = React.useState([]);
  const [selectedCountries, setSelectedCountries] = React.useState([]);
  const [selectedTypes, setSelectedTypes] = React.useState([]);
  const { addToast } = useToasts();

  const theme = useTheme();
  async function initApis() {
    setIsLoading(true);
    const [_subjects, _exams, _class, _country, _types] = await Promise.all([
      DownloadService.listDownloadSubjects(),
      DownloadService.listDownloadExams(),
      ClassService.listClasses(),
      ClassService.listCountries(),
      DownloadService.listDownloadTypes(),
    ]);
    setSubjects(toDictionary(_subjects));
    setExams(toDictionary(_exams));
    setClasses(toDictionary(_class));
    setCountries(toDictionary(_country));
    setTypes(toDictionary(_types));
    setIsLoading(false);
  }

  function addSubject(title) {
    setIsLoading(true);
    DownloadService.createSubject(title)
      .then(({ data }) => {
        setSelectedDialog(null);
        setSubjects({
          ...subjects,
          [data.id]: {
            _id: data.id,
            title,
          },
        });
        setIsLoading(false);
        addToast("Subject Created", {
          appearance: "success",
          autoDismissTimeout: 50000,
        });
      })
      .catch(
        stringError((err) => {
          setIsLoading(false);
          addToast(err, {
            appearance: "error",
            autoDismissTimeout: 50000,
          });
        })
      );
  }

  function addExam(title, regions) {
    setIsLoading(true);
    DownloadService.createExam(title, regions)
      .then(({ data }) => {
        setSelectedDialog(null);
        setExams({
          ...exams,
          [data.id]: {
            _id: data.id,
            title,
          },
        });
        setIsLoading(false);
        addToast("Exam Created", {
          appearance: "success",
          autoDismissTimeout: 50000,
        });
      })
      .catch(
        stringError((err) => {
          setIsLoading(false);
          addToast(err, {
            appearance: "error",
            autoDismissTimeout: 50000,
          });
        })
      );
  }

  function addTypes(title) {
    setIsLoading(true);
    DownloadService.createType(title)
      .then(({ data }) => {
        setSelectedDialog(null);
        setTypes({
          ...types,
          [data.id]: {
            _id: data.id,
            title,
          },
        });
        addToast("Type Created", {
          appearance: "success",
          autoDismissTimeout: 50000,
        });
        setIsLoading(false);
      })
      .catch(
        stringError((err) => {
          setIsLoading(false);
          addToast(err, {
            appearance: "error",
            autoDismissTimeout: 50000,
          });
        })
      );
  }

  function getTitle() {
    if (selectedDialog === DialogType.Subject) {
      return "Subject";
    }
    if (selectedDialog === DialogType.Exam) {
      return "Exam";
    }
    if (selectedDialog === DialogType.Type) {
      return "Product Type";
    }
    return "";
  }

  function submit(dialog) {
    if (dialog === DialogType.Subject) {
      return addSubject;
    }
    if (dialog === DialogType.Exam) {
      return addExam;
    }
    return addTypes;
  }

  const handleChange = function (setter) {
    return (event) => {
      const {
        target: { value },
      } = event;
      setter(typeof value === "string" ? value.split(",") : value);
    };
  };

  function addBook() {
    const request = new FormData();
    request.append("title", title);
    request.append("thumbnail", images[0]);
    request.append("author", author);
    request.append("isFree", isFree);
    request.append("countries", selectedCountries);
    request.append("subjects", selectedSubject);
    request.append("classes", selectedClasses);
    request.append("exams", selectedExam);
    request.append("types", selectedTypes);
    request.append("file", files[0]);
    request.append(
      "prices",
      JSON.stringify(
        selectedCountries.map((c) => ({
          ...countries[c],
          price: prices[c] || 0,
        }))
      )
    );

    DownloadService.createBook(request)
      .then(() => {
        setTitle("");
        setImages([]);
        setAuthor("");
        setSelectedCountries([]);
        setSelectedSubject([]);
        setSelectedClasses([]);
        setSelectedExam([]);
        setSelectedTypes([]);
        setFiles([]);
        setIsFree(false);
        addToast("Book Created", {
          appearance: "success",
          autoDismissTimeout: 50000,
        });
      })
      .catch(
        stringError((x) =>
          addToast(x, {
            appearance: "error",
            autoDismissTimeout: 50000,
          })
        )
      );
  }

  useEffect(() => initApis(), []);

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        sx={{ padding: "1rem", width: "400px" }}
        className="d-flex flex-column"
      >
        <TextField
          label="Title *"
          variant="outlined"
          sx={mb}
          value={title}
          onChange={(x) => setTitle(x.target.value)}
        />
        <Typography variant="h4" gutterBottom>
          Thumbnail
        </Typography>
        <FileUploadArea
          buttonProps={{ style: { backgroundColor: "#016101" } }}
          value={images}
          onChange={(x) => setImages([x[0]])}
          sx={mb}
        />

        <FormControl sx={mb}>
          <InputLabel id="countries-label">Countries</InputLabel>
          <Select
            labelId="countries-label"
            id="countries-label-chip"
            multiple
            value={selectedCountries}
            onChange={handleChange(setSelectedCountries)}
            input={<OutlinedInput label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={countries[value]?.name || ""} />
                ))}
              </Box>
            )}
          >
            {Object.values(countries).map((cls) => (
              <MenuItem key={cls._id} value={cls._id}>
                {cls.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControlLabel
          control={
            <Checkbox
              value={isFree}
              onChange={(x) => setIsFree(x.target.checked)}
            />
          }
          label="Is Book Free"
        />

        <InputLabel id="exam-label">Product Types</InputLabel>
        <div className="d-flex" style={mb}>
          <div className="flex-fill">
            <Select
              labelId="types-label"
              id="types-select"
              multiple
              value={selectedTypes}
              onChange={handleChange(setSelectedTypes)}
              input={<OutlinedInput label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={types[value]?.title || ""} />
                  ))}
                </Box>
              )}
              fullWidth
            >
              {Object.values(types).map((sub) => (
                <MenuItem key={sub._id} value={sub._id}>
                  {sub.title}
                </MenuItem>
              ))}
            </Select>
          </div>
          <IconButton
            aria-label="add"
            sx={{ margin: "auto", marginLeft: "1rem" }}
            onClick={() => setSelectedDialog(DialogType.Type)}
          >
            <MdAdd />
          </IconButton>
        </div>

        {(isFree ? [] : selectedCountries).map((c) => (
          <div className="d-flex" key={c} style={mb}>
            <span style={{ fontSize: "1.5rem", margin: "auto 1rem" }}>
              {countries[c].pricePrefix}
            </span>
            <TextField
              label="Price"
              variant="outlined"
              sx={{ flex: 1 }}
              value={prices[c] || ""}
              onChange={(x) =>
                setPrices({
                  ...prices,
                  [c]: x.target.value,
                })
              }
            />
          </div>
        ))}

        <LoadingButton
          variant="contained"
          loading={isLoading}
          loadingPosition="start"
          startIcon={<MdSend />}
          onClick={addBook}
        >
          Submit
        </LoadingButton>

        <DownloadAddItemDialog
          open={selectedDialog !== null}
          dialogTitle={"Add " + getTitle()}
          handleClose={() => {
            setSelectedDialog(null);
          }}
          noCountry={selectedDialog !== DialogType.Exam}
          onSubmit={submit(selectedDialog)}
        />
      </Box>
      <Box
        sx={{ padding: "1rem", width: "400px" }}
        className="d-flex flex-column"
      >
        <TextField
          label="Author"
          variant="outlined"
          sx={mb}
          value={author}
          onChange={(x) => setAuthor(x.target.value)}
        />
        <Typography variant="h4" gutterBottom>
          Book / File
        </Typography>

        <FileUploadArea
          buttonProps={{ style: { backgroundColor: "#016101" } }}
          value={files}
          onChange={(x) => setFiles([x[0]])}
          sx={mb}
        />

        <InputLabel id="subject-label">Subject</InputLabel>
        <div className="d-flex" style={mb}>
          <div className="flex-fill">
            <Select
              labelId="subject-label"
              id="subject-select"
              multiple
              value={selectedSubject}
              onChange={handleChange(setSelectedSubject)}
              input={<OutlinedInput label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={subjects[value]?.title || ""} />
                  ))}
                </Box>
              )}
              fullWidth
            >
              {Object.values(subjects).map((sub) => (
                <MenuItem key={sub._id} value={sub._id}>
                  {sub.title}
                </MenuItem>
              ))}
            </Select>
          </div>
          <IconButton
            aria-label="add"
            sx={{ margin: "auto", marginLeft: "1rem" }}
            onClick={() => setSelectedDialog(DialogType.Subject)}
          >
            <MdAdd />
          </IconButton>
        </div>

        <FormControl sx={mb}>
          <InputLabel id="classes-label">Classes</InputLabel>
          <Select
            labelId="classes-label"
            id="classes-label-chip"
            multiple
            value={selectedClasses}
            onChange={handleChange(setSelectedClasses)}
            input={<OutlinedInput label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={classes[value]?.title || ""} />
                ))}
              </Box>
            )}
          >
            {Object.values(classes).map((cls) => (
              <MenuItem key={cls._id} value={cls._id}>
                {cls.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <InputLabel id="exam-label">Exams</InputLabel>
        <div className="d-flex" style={mb}>
          <div className="flex-fill">
            <Select
              labelId="exam-label"
              id="exam-select"
              multiple
              value={selectedExam}
              onChange={handleChange(setSelectedExam)}
              input={<OutlinedInput label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={exams[value]?.title || ""} />
                  ))}
                </Box>
              )}
              fullWidth
            >
              {Object.values(exams).map((sub) => (
                <MenuItem key={sub._id} value={sub._id}>
                  {sub.title}
                </MenuItem>
              ))}
            </Select>
          </div>
          <IconButton
            aria-label="add"
            sx={{ margin: "auto", marginLeft: "1rem" }}
            onClick={() => setSelectedDialog(DialogType.Exam)}
          >
            <MdAdd />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
}

export default AddDownloadBook;
