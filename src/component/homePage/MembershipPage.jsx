import React from "react";
import ProgrammeHeader from "./ProgrammeHeader";
import { Typography } from "@mui/material";

function MembershipPage() {
  return (
    <div>
      <ProgrammeHeader />
      <div className="row">
        <div className="col-md-2" />
        <div
          className="col-md-8"
          style={{ padding: "2rem", maxWidth: "100vw", overflow: "hidden" }}
        >
          <Typography variant="h3" gutterBottom>
            JOIN THE SuperC
          </Typography>
          <Typography variant="h5" gutterBottom>
            For Kids Aged 8 -13
          </Typography>
          <Typography variant="body1">
            As a member your child can have up to three different extraordinary
            practice level on SuperC application along with unlimited
            participation of the competition. You will also benefit from
            discounts on private tuition, face-to-face sessions (when its safe
            to run again) and a range of events we will run throughout the year.
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default MembershipPage;
