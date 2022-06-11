import React, { useState, useEffect } from "react";
import {
  Alert,
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
} from "@mui/material";
import { MdClose } from "react-icons/md";
import { LoadingButton } from "@mui/lab";
import ClassService from "../../../services/ClassService";
import { stringError } from "../../../helper/common";
const mb = { marginBottom: "1em" };

function DownloadAddItemDialog({
  open,
  dialogTitle,
  handleClose,
  noCountry,
  onSubmit,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [countryById, setCountryById] = useState({});

  async function submitButtonClick() {
    onSubmit(title, selectedRegions);
    setTitle("");
    setSelectedRegions([]);
  }

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
    const _countries = await ClassService.listCountries();
    const tmp = {};
    _countries.forEach((ele) => (tmp[ele._id] = ele));
    setCountryById(tmp);
    setIsLoading(false);
  }

  useEffect(() => {
    initApis().catch(stringError((x) => setError(x)));
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

        {!noCountry && (
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
                selected.map((ele) => countryById[ele].name).join(", ")
              }
            >
              {Object.values(countryById).map((c) => (
                <MenuItem key={c._id} value={c._id}>
                  <Checkbox checked={selectedRegions.indexOf(c._id) > -1} />
                  <ListItemText primary={c.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
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

export default DownloadAddItemDialog;
