import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Hidden from "@material-ui/core/Hidden";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTranslation } from "react-i18next";

import Tooltip from "components/Tooltip";

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

const renderContent = () => {
  const [t] = useTranslation();

  return (
    <div className="ToggleMarkersSwitch">
      {t("action.hideMarkers")}
    </div>
  );
};

const ToggleMarkersSwitch = () => {
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <ThemeProvider theme={theme}>
      {matches ? (
        <Tooltip content="action.hideMarkers">{renderContent()}</Tooltip>
      ) : (
        renderContent()
      )}
    </ThemeProvider>
  );
};

export default React.memo(ToggleMarkersSwitch);
