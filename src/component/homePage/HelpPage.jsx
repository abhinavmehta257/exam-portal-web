import {
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProgrammeHeader from "./ProgrammeHeader";

const IAM = ["Student", "Parent", "OTHER"];
const INTEREST = ["Competitions", "Battles", "Subscription", "OTHER"];

function HelpPage() {
  const [iam, setIam] = useState("");
  const [interested, setInterested] = useState("");

  return (
    <div style={{ background: "#f0f0f0", minHeight: "100vh" }}>
      <ProgrammeHeader />
      <div className="row">
        <div className="col-md-2" />
        <div className="col-md-8" style={{ paddingTop: "1rem" }}>
          <Paper sx={{ p: "1rem" }}>
            <Typography variant="h3" gutterBottom component="div">
              Ask a Query
            </Typography>

            <div className="d-flex" style={{ marginBottom: "1.2rem" }}>
              <div className="col-md-6" style={{ paddingRight: "1.25rem" }}>
                <FormControl fullWidth>
                  <InputLabel id="iam">I am a...</InputLabel>
                  <Select
                    labelId="iam"
                    id="iam-select"
                    value={iam}
                    label="I am a..."
                    onChange={(ev) => setIam(ev.target.value)}
                  >
                    {IAM.map((i) => (
                      <MenuItem key={i} value={i}>
                        {i}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="col-md-6" style={{ paddingLeft: "1.25rem" }}>
                <FormControl fullWidth>
                  <InputLabel id="interested">
                    I am interested in ...
                  </InputLabel>
                  <Select
                    labelId="interested"
                    id="interested-select"
                    value={interested}
                    label="I am interested in ..."
                    onChange={(ev) => setInterested(ev.target.value)}
                  >
                    {INTEREST.map((i) => (
                      <MenuItem key={i} value={i}>
                        {i}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>

            <TextField
              label="Message"
              multiline
              rows={4}
              placeholder="Details..."
              variant="filled"
              fullWidth
              sx={{ marginBottom: "1.2rem" }}
            />
            <div className="d-flex" style={{ marginBottom: "1.2rem" }}>
              <div className="col-md-6" style={{ paddingRight: "1.25rem" }}>
                <TextField
                  required
                  label="First Name"
                  variant="filled"
                  fullWidth
                />
              </div>
              <div className="col-md-6" style={{ paddingLeft: "1.25rem" }}>
                <TextField
                  required
                  label="Last Name"
                  variant="filled"
                  fullWidth
                />
              </div>
            </div>

            <div className="d-flex" style={{ marginBottom: "1.2rem" }}>
              <div className="col-md-6" style={{ paddingRight: "1.25rem" }}>
                <TextField
                  required
                  type="email"
                  label="Email"
                  variant="filled"
                  fullWidth
                />
              </div>
              <div className="col-md-6" style={{ paddingLeft: "1.25rem" }}>
                <TextField
                  required
                  type="tel"
                  label="Phone"
                  variant="filled"
                  fullWidth
                />
              </div>
            </div>
            <div className="d-flex" style={{ marginBottom: "1.2rem" }}>
              <Checkbox />
              <span style={{ margin: "auto 0" }}>
                I have read and agree to your{" "}
                <Link to="/terms_and_conditions">Terms and Conditions</Link>
              </span>
            </div>
            <div className="d-flex">
              <Button variant="contained" sx={{ margin: "auto" }}>
                Submit
              </Button>
            </div>
          </Paper>
        </div>
      </div>
    </div>
  );
}

export default HelpPage;
