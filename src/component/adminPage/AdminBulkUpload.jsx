import {
  Alert,
  AlertTitle,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ClassService from "../../services/ClassService";
import FileUploadArea from "../common/FileUploadArea";
import { IMAGE_URL, BASE_URL, getCookie } from "../../helper/common";
import { MdFileDownload, MdSave } from "react-icons/md";
import { styled } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import LoadingButton from "@mui/lab/LoadingButton";
import { useToasts } from "react-toast-notifications";
import QuestionService from "../../services/QuestionService";
import { stringError } from "../../helper/common";

const mb = { marginBottom: "1em" };

const PurpleButton = styled(LoadingButton)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  "&:hover": {
    backgroundColor: purple[700],
  },
}));

function AdminBulkUpload() {
  // For Region.
  const [countries, setCountries] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [countryById, setCountryById] = useState({});
  // Class.
  const [classesByCode, setClassesByCode] = useState({});
  const [selectedClass, setSelectedClass] = useState({});

  const [formats, setFormats] = useState([]);
  const [selectedFormat, setSelectedFormat] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [difficulties, setDifficulty] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToasts();

  async function initApis() {
    setIsLoading(true);
    const [_countries, _subjects, _formats, _difficulties, _classes] =
      await Promise.all([
        ClassService.listCountries(),
        ClassService.listSubjects(),
        ClassService.listFormats(),
        ClassService.listDifficulty(),
        ClassService.listClasses(),
      ]);
    setCountries(_countries);
    const tmp = {};
    _countries.forEach((ele) => (tmp[ele.code] = ele.name));
    setCountryById(tmp);

    const tmpCountry = {},
      tmpClass = {};
    _classes.forEach((ele) => {
      if (!(ele.countryCode in tmpCountry)) {
        tmpCountry[ele.countryCode] = [];
        tmpClass[ele.countryCode] = "";
      }
      tmpCountry[ele.countryCode].push(ele);
    });

    setClassesByCode(tmpCountry);
    setSelectedClass(tmpClass);
    setSubjects(_subjects);
    setFormats(_formats);
    setDifficulty(_difficulties);
    setIsLoading(false);
  }

  async function fetchSkills(subject) {
    if (!subject) return;
    setIsLoading(true);
    const _skills = await ClassService.listSkills([subject]);
    setSkills(_skills);
    setIsLoading(false);
  }

  function submit() {
    let message = "";
    // if (selectedRegions.length <= 0) message = "Please Select Region!";
    // else if (!selectedClass) message = 'Please Select Class';
    // else
    if (!selectedFormat?._id) message = "Please Select Question Type";
    // else if (!selectedSubject) message = "Please Select Subject";
    // else if (!selectedSkill) message = "Please Select Skill";
    // else if (!selectedDifficulty) message = "Please Select Difficulty";
    else if (!selectedCategory) message = "Please Select Category";
    else if (files.length <= 0) message = "Please Upload File";

    if (message) {
      addToast(message, {
        appearance: "error",
        autoDismissTimeout: 50000,
      });
      return;
    }

    const request = new FormData();
    if (selectedRegions.length > 0) {
      request.append("country", selectedRegions);
    }
    request.append("format", selectedFormat.label);
    const classes = Object.values(selectedClass).filter((ele) => ele !== "");
    if (classes.length > 0) {
      request.append("class", classes);
    }
    if (selectedSubject) {
      request.append("subject", selectedSubject);
    }
    if (selectedSkill) {
      request.append("skill", selectedSkill);
    }
    if (selectedDifficulty) {
      request.append("difficulty", selectedDifficulty);
    }
    request.append("file", files[0]);
    request.append("category", selectedCategory.toUpperCase());
    // request.append("country", selectedRegions);
    // request.append("difficulty", selectedDifficulty);
    setIsLoading(true);
    QuestionService.uploadQuestions(request)
      .then(() => {
        addToast("File Uploaded", {
          appearance: "success",
          autoDismissTimeout: 50000,
        });
        setIsLoading(false);
        setSelectedRegions([]);
        setSelectedFormat(null);
        setSelectedClass({});
        setSelectedSubject("");
        setSelectedDifficulty("");
        setSelectedSkill("");
        setFiles([]);
      })
      .catch(
        stringError((x) => {
          addToast(x, {
            appearance: "error",
            autoDismissTimeout: 50000,
          });
          setIsLoading(false);
        })
      );
  }

  useEffect(() => {
    initApis();
  }, []);

  const handleRegionChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedRegions(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  function downloadSample() {
    // TODO: Change with Axios.
    fetch(`${BASE_URL}/question/format/download?id=${selectedFormat?.label}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/pdf",
        Authorization: `Bearer ${getCookie("token")}`,
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        console.log(blob);
        // Create blob link to download
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${selectedFormat.label}.xlsx`);

        // Append to html link element page
        document.body.appendChild(link);

        // Start download
        link.click();

        // Clean up and remove the link
        link.parentNode.removeChild(link);
      });
    // TODO: Catch error
  }

  return (
    <div>
      <div className="d-flex mb-4">
        <h2>Bulk Upload</h2>
        <PurpleButton
          variant="contained"
          sx={{ marginLeft: "2rem" }}
          loading={isLoading}
          startIcon={<MdSave />}
          loadingPosition="start"
          onClick={submit}
        >
          Save
        </PurpleButton>
      </div>

      <Alert severity="info" className="mb-4">
        <AlertTitle>Note</AlertTitle>
        Optional Value needs to be included in Excel With a Proper Spelling
        Otherwise You Will get Invalid Data.
      </Alert>

      <form className="d-flex w-100 justify-content-between">
        <div className="col-md-4">
          <FormControl fullWidth sx={mb}>
            <InputLabel id="region">Region (Optional)</InputLabel>
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
                    value={selectedClass[ele]}
                    label={ele === "IN" ? "Class" : "Year"}
                    onChange={(e) =>
                      setSelectedClass({
                        ...selectedClass,
                        [ele]: e.target.value,
                      })
                    }
                  >
                    {classesByCode[ele].map((ele) => (
                      <MenuItem key={ele._id} value={ele._id}>
                        {ele.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              );
            }
            return null;
          })}

          <FormControl fullWidth sx={mb}>
            <InputLabel id="subject">Subject (Optional)</InputLabel>
            <Select
              labelId="subject"
              id="selectSubject"
              value={selectedSubject}
              label="Subject (Optional)"
              onChange={(e) => {
                setSelectedSubject(e.target.value);
                fetchSkills(e.target.value);
              }}
            >
              {subjects.map((ele) => (
                <MenuItem key={ele._id} value={ele._id}>
                  {ele.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={mb}>
            <InputLabel id="skills">Skills (Optional)</InputLabel>
            <Select
              labelId="skills"
              id="selectSkill"
              value={selectedSkill}
              label="Skills (Optional)"
              onChange={(e) => setSelectedSkill(e.target.value)}
            >
              {skills.map((ele) => (
                <MenuItem key={ele._id} value={ele._id}>
                  {ele.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={mb}>
            <InputLabel id="difficulty">Difficulty (Optional)</InputLabel>
            <Select
              labelId="difficulty"
              id="selectDifficulty"
              value={selectedDifficulty}
              label="Difficulty (Optional)"
              onChange={(e) => setSelectedDifficulty(e.target.value)}
            >
              {difficulties.map((ele) => (
                <MenuItem key={ele._id} value={ele._id}>
                  {ele.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={mb}>
            <InputLabel id="type">Question Type</InputLabel>
            <Select
              labelId="type"
              id="selectType"
              value={selectedFormat?._id || ""}
              label="Question Type"
              onChange={(e) =>
                setSelectedFormat(
                  formats.find((ele) => ele._id === e.target.value)
                )
              }
            >
              {formats.map((ele) => (
                <MenuItem key={ele._id} value={ele._id}>
                  {ele.title} ({ele.label})
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={mb}>
            <InputLabel id="category">Category</InputLabel>
            <Select
              labelId="category"
              id="selectCategory"
              value={selectedCategory}
              label="Category"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {["Practice", "Competition", "Battle"].map((ele) => (
                <MenuItem key={ele} value={ele}>
                  {ele}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* <label htmlFor="btn-upload">
          <input
            id="btn-upload"
            name="btn-upload"
            style={{ display: "none" }}
            type="file"
            // onChange={this.selectFile}
          />
        </label> */}

          <div className="d-flex justify-content-end mt-4"></div>
        </div>
        <div className="col-md-7 d-flex flex-column">
          {selectedFormat?.image && (
            <img
              src={IMAGE_URL + selectedFormat.image}
              alt="Format"
              style={{ maxWidth: "100%" }}
            />
          )}

          <Button
            variant="contained"
            component="span"
            disabled={selectedFormat?.image ? false : true}
            startIcon={<MdFileDownload />}
            // component={Link}
            // target="_blank" download
            // href={`${BASE_URL}/question/format/download?id=${selectedFormat?.label}`}
            sx={{ margin: "1em 0" }}
            onClick={downloadSample}
          >
            Download Sample
          </Button>

          <FileUploadArea
            buttonProps={{ style: { backgroundColor: "#016101" } }}
            value={files}
            onChange={setFiles}
          />
        </div>
      </form>
    </div>
  );
}

export default AdminBulkUpload;
