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
  typography: {
    fontFamily: ["'Lato'", "sans-serif"].join(","),
    htmlFontSize: 10,
    body1: { fontSize: "1.4rem" },
  },
});

const ToggleMarkersSwitch = () => {
  const [t] = useTranslation();

  return (
    <ThemeProvider theme={theme}>
      <div className="ToggleMarkersSwitch">
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
          label={<Hidden smDown>{t("action.hideMarkers")}</Hidden>}
        />
      </div>
    </ThemeProvider>
  );
};

export default React.memo(ToggleMarkersSwitch);
