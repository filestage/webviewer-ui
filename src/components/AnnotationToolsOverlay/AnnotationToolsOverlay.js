import React from 'react';

import ToolButton from 'components/ToolButton';
import './AnnotationToolsOverlay.scss';

const AnnotationToolsOverlay = () => {
  return (
    <div className="Overlay AnnotationToolsOverlay" data-element="annotationToolsOverlay">
      <ToolButton
        toolName="AnnotationCreateTextHighlight"
      />
      <ToolButton
        toolName="AnnotationCreateTextStrikeout"
      />
      <ToolButton
        toolName="AnnotationCreateSticky"
      />
    </div>
  );
};

export default AnnotationToolsOverlay;