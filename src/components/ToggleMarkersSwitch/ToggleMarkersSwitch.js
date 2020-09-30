import React from "react";
import Switch from "@material-ui/core/Switch";

import core from "core";
import "./ToggleMarkersSwitch.scss";

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#13d83a",
    },
  },
});

const ToggleMarkersSwitch = () => {
  return (
    <ThemeProvider theme={theme}>
      <Switch
        color="primary"
        onChange={(evt) => {
          if (evt.target.checked) {
            core.hideAnnotations(core.getAnnotationsList());
          } else {
            core.showAnnotations(core.getAnnotationsList());
          }
        }}
      />
    </ThemeProvider>
  );
};

export default React.memo(ToggleMarkersSwitch);
