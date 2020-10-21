import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import core from "core";
import ToolButton from "components/ToolButton";
import "./AnnotationToolsOverlay.scss";

const AnnotationToolsOverlay = () => {
  const [t] = useTranslation();

  const getIsTextAnnotationToolMode = (toolName) =>
    toolName === "AnnotationCreateTextStrikeout" ||
    toolName === "AnnotationCreateTextHighlight";

  const getIsStickyToolMode = (toolName) =>
    toolName === "AnnotationCreateSticky";

  const currentToolName = core.getToolMode().name;

  const [isTextAnnotationToolMode, setIsTextAnnotationToolMode] = useState(
    getIsTextAnnotationToolMode(currentToolName)
  );

  const [isStickyToolMode, setIsStickyToolMode] = useState(
    getIsStickyToolMode(currentToolName)
  );

  useEffect(() => {
    const onToolModeUpdated = (toolMode) => {
      const { name } = toolMode;
      setIsStickyToolMode(getIsStickyToolMode(name));
      setIsTextAnnotationToolMode(getIsTextAnnotationToolMode(name));
    };

    core.addEventListener("toolModeUpdated", onToolModeUpdated);
    return () => {
      core.removeEventListener("toolModeUpdated", onToolModeUpdated);
    };
  }, [isTextAnnotationToolMode, isStickyToolMode]);

  return (
    <div
      className="Overlay AnnotationToolsOverlay"
      data-element="annotationToolsOverlay"
    >
      <div className="toolbar">
        <ToolButton toolName="AnnotationCreateTextHighlight" />
        <ToolButton toolName="AnnotationCreateTextStrikeout" />
        <ToolButton toolName="AnnotationCreateSticky" />
      </div>
      {!isStickyToolMode && (
        <div className="help-text">
          {t(
            `action.${
              isTextAnnotationToolMode ? "selectToComment" : "selectToAnnotate"
            }`
          )}
        </div>
      )}
    </div>
  );
};

export default AnnotationToolsOverlay;
