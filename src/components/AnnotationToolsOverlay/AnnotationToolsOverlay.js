import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import core from "core";
import selectors from "selectors";
import { isIOS, isAndroid, isMobile } from "helpers/device";

import ToolButton from "components/ToolButton";
import "./AnnotationToolsOverlay.scss";

const MAX_INACTIVITY_MS = 3000;

const AnnotationToolsOverlay = () => {
  const isDisabled = useSelector((state) =>
    selectors.isElementDisabled(state, "annotationToolsOverlay")
  );

  const [isHiddenDueToInactivity, setIsHiddenDueToInactivity] = useState(false);

  useEffect(() => {
    let timeoutId = null;

    const onMouseHover = (e) => {
      setIsHiddenDueToInactivity(false);

      if (typeof timeoutId === "number") {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        setIsHiddenDueToInactivity(true);
        timeoutId = null;
      }, MAX_INACTIVITY_MS);
    };

    core.addEventListener("mouseMove", onMouseHover);

    return () => {
      core.removeEventListener("mouseMove", onMouseHover);

      if (typeof timeoutId === "number") {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return isDisabled || (isHiddenDueToInactivity && !isMobile()) ? null : (
    <div
      className="Overlay AnnotationToolsOverlay"
      data-element="annotationToolsOverlay"
    >
      <div className="AnnotationsToolbar">
        <ToolButton toolName="AnnotationCreateTextHighlight" />
        <ToolButton toolName="AnnotationCreateTextStrikeout" />
        {(isIOS || isAndroid) && (
          <ToolButton toolName="AnnotationCreateSticky" />
        )}
      </div>
    </div>
  );
};

export default AnnotationToolsOverlay;
