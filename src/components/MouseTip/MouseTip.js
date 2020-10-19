/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import core from "core";
import { isMobileDevice } from "helpers/device";
import selectors from "selectors";

import "./MouseTip.scss";

const MouseTip = () => {
  const isReadOnly = useSelector((state) =>
    selectors.isDocumentReadOnly(state)
  );

  const [t] = useTranslation();
  const [isEnabled, setIsEnabled] = useState(false);
  const [overlayPosition, setOverlayPosition] = useState({
    left: 0,
    top: 0,
  });

  useEffect(() => {
    const onMouseHover = (e) => {
      const viewElement = core.getViewerElement();
      let annotation = core.getAnnotationManager().getAnnotationByMouseEvent(e);

      const isTextSelectToolMode = core.getToolMode().name === "TextSelect";

      if (
        !annotation &&
        isTextSelectToolMode &&
        viewElement.contains(e.target)
      ) {
        setOverlayPosition({
          left: e.clientX + 5,
          top: e.clientY + 5,
        });
        setIsEnabled(true);
      } else {
        setIsEnabled(false);
      }
    };

    core.addEventListener("mouseMove", onMouseHover);
    return () => {
      core.removeEventListener("mouseMove", onMouseHover);
    };
  }, [isEnabled]);

  if (isReadOnly || isMobileDevice || !isEnabled) {
    return null;
  } else {
    return (
      <div
        className="Overlay MouseTip"
        data-element="MouseTip"
        style={{ ...overlayPosition }}
      >
        {t("action.selectToComment")}
      </div>
    );
  }
};

export default MouseTip;
