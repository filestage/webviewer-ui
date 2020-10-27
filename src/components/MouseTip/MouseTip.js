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
  const isElementDisabled = useSelector((state) =>
    selectors.isElementDisabled(state, "mouseTip")
  );
  const [isDisabled, setIsDisabled] = useState(true);
  const [overlayPosition, setOverlayPosition] = useState({
    left: 0,
    top: 0,
  });

  useEffect(() => {
    const onMouseHover = (e) => {
      const viewElement = core.getViewerElement();
      let annotation = core.getAnnotationManager().getAnnotationByMouseEvent(e);

      const isTextToolMode = core.getToolMode().name.includes("Text");

      if (!annotation && isTextToolMode && viewElement.contains(e.target)) {
        setOverlayPosition({
          left: e.clientX + 25,
          top: e.clientY + 10,
        });
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    };

    core.addEventListener("mouseMove", onMouseHover);
    return () => {
      core.removeEventListener("mouseMove", onMouseHover);
    };
  }, [isDisabled]);

  if (isDisabled || isElementDisabled || isReadOnly || isMobileDevice) {
    return null;
  } else {
    return (
      <div
        className="Overlay MouseTip"
        data-element="mouseTip"
        style={{ ...overlayPosition }}
      >
        {t("action.selectToComment")}
      </div>
    );
  }
};

export default MouseTip;
