import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const FullWidthTab = props => {
  return (
    <AppBar position="static" color="default">
      <Tabs
        value={props.value}
        onChange={props.handleChange}
        indicatorColor="primary"
        textColor="primary"
        fullWidth
      >
        <Tab label="ADD people" />
        <Tab label="Friend Request" />
        <Tab label="My Friends" />
      </Tabs>
    </AppBar>
  );
};

export default FullWidthTab;
