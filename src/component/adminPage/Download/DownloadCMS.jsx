/* eslint-disable no-unused-vars */
import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import SwipeableViews from "react-swipeable-views/lib/SwipeableViews";
import { useTheme } from "@mui/material/styles";
import AddDownloadBook from "./AddDownloadBook";
import ViewDownloadBooks from "./ViewDownloadBooks";

function DownloadCMS() {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="List Books" />
          <Tab label="Add Books" />
        </Tabs>
      </Box>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={(x) => setValue(x)}
      >
        <ViewDownloadBooks />
        <AddDownloadBook />
      </SwipeableViews>
    </Box>
  );
}

export default DownloadCMS;
