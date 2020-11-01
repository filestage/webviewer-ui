import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import core from "core";
import selectors from "selectors";
import ToolButton from "components/ToolButton";
import "./AnnotationToolsOverlay.scss";

const MAX_INACTIVITY_MS = 3000;

const AnnotationToolsOverlay = () => {
  const isDisabled = useSelector((state) =>
    selectors.isElementDisabled(state, "annotationToolsOverlay")
  );

  const [timeoutId, setTimeoutId] = useState(undefined);
  const [isHiddenDueToInactivity, setIsHiddenDueToInactivity] = useState(false);

  useEffect(() => {
    const onMouseHover = (e) => {
      setIsHiddenDueToInactivity(false);

      if (typeof timeoutId === "number") {
        clearTimeout(timeoutId);
      }

      setTimeoutId(
        setTimeout(() => {
          setIsHiddenDueToInactivity(true), setTimeoutId(undefined);
        }, MAX_INACTIVITY_MS)
      );
    };

    core.addEventListener("mouseMove", onMouseHover);
    return () => {
      if (typeof timeoutId === "number") {
        clearTimeout(timeoutId);
      }

      core.removeEventListener("mouseMove", onMouseHover);
    };
  }, [timeoutId]);

  return isDisabled || isHiddenDueToInactivity ? null : (
    <div
      className="Overlay AnnotationToolsOverlay"
      data-element="annotationToolsOverlay"
    >
      <ToolButton toolName="AnnotationCreateTextHighlight" />
      <ToolButton toolName="AnnotationCreateTextStrikeout" />
      <ToolButton toolName="AnnotationCreateSticky" />
    </div>
  );
};

export default AnnotationToolsOverlay;
