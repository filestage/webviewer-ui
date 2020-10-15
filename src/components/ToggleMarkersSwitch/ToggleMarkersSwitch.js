import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Hidden from "@material-ui/core/Hidden";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { useTranslation } from "react-i18next";

import core from "core";
import "./ToggleMarkersSwitch.scss";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#13d83a",
    },
  },
});

const ToggleMarkersSwitch = () => {
  const [t] = useTranslation();

  return (
    <ThemeProvider theme={theme}>
      <FormControlLabel
        control={
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
        }
        label={<Hidden xsDown>{t("action.hideMarkers")}</Hidden>}
      />
    </ThemeProvider>
  );
};

export default React.memo(ToggleMarkersSwitch);
