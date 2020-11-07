import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useTranslation } from "react-i18next";

import classNames from "classnames";

import Button from "components/Button";
import ActionButton from "components/ActionButton";
import CustomizablePopup from "components/CustomizablePopup";

import core from "core";
import { getTextPopupPositionBasedOn } from "helpers/getPopupPosition";
import createTextAnnotationAndSelect from "helpers/createTextAnnotationAndSelect";
import copyText from "helpers/copyText";
import useOnClickOutside from "hooks/useOnClickOutside";
import actions from "actions";
import selectors from "selectors";

import "./TextPopup.scss";

const TextPopup = () => {
  const [isDisabled, isOpen, popupItems, activeTextAnnotation] = useSelector(
    (state) => [
      selectors.isElementDisabled(state, "textPopup"),
      selectors.isElementOpen(state, "textPopup"),
      selectors.getPopupItems(state, "textPopup"),
      selectors.getActiveTextAnnotation(state),
    ],
    shallowEqual
  );
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const [isCopyFeedbackShown, setIsCopyFeedbackShown] = useState(false);
  const popupRef = useRef();
  useOnClickOutside(popupRef, () => {
    dispatch(actions.closeElement("textPopup"));
  });

  useEffect(() => {
    if (isOpen) {
      dispatch(actions.closeElements(["annotationPopup", "contextMenuPopup"]));
    }
  }, [dispatch, isOpen]);

  useEffect(() => {
    const textSelectTool = core.getTool("TextSelect");

    const onSelectionComplete = (startQuad, allQuads) => {
      if (popupRef.current && popupItems.length > 0) {
        setPosition(getTextPopupPositionBasedOn(allQuads, popupRef));
        dispatch(actions.openElement("textPopup"));
      }
    };

    textSelectTool.on("selectionComplete", onSelectionComplete);
    return () => textSelectTool.off("selectionComplete", onSelectionComplete);
  }, [dispatch, popupItems]);

  const isActive = (textAnnotation) => activeTextAnnotation === textAnnotation;

  useEffect(() => {
    const timeoutID = setTimeout(() => setIsCopyFeedbackShown(false), 1000);
    return () => clearTimeout(timeoutID);
  }, [isCopyFeedbackShown]);

  const onCopyClick = () => {
    if (isCopyFeedbackShown) {
      return;
    }
    copyText();

    setIsCopyFeedbackShown(true);
  };

  return isDisabled ? null : (
    <div
      className={classNames({
        Popup: true,
        TextPopup: true,
        open: isOpen,
        closed: !isOpen,
      })}
      data-element="textPopup"
      ref={popupRef}
      style={{ ...position }}
    >
      <div
        className={classNames({
          Overlay: true,
          CopyFeedbackOverlay: true,
          open: isCopyFeedbackShown,
        })}
        data-element="copyFeedbackOverlay"
        style={{ right: 0, top: "100%" }}
      >
        {t("component.copyFeedbackOverlay")}
      </div>
      <CustomizablePopup dataElement="textPopup">
        <Button
          className={classNames({
            "Button--green": isCopyFeedbackShown,
          })}
          dataElement="copyTextButton"
          title="action.copy"
          img={`ic_${isCopyFeedbackShown ? "check" : "copy"}_black_24px`}
          onClick={onCopyClick}
        />
        <ActionButton
          dataElement="textHighlightToolButton"
          title="annotation.highlight"
          img="ic_annotation_highlight_black_24px"
          onClick={() =>
            createTextAnnotationAndSelect(
              dispatch,
              Annotations.TextHighlightAnnotation
            )
          }
          isActive={isActive("highlight")}
        />
        <ActionButton
          dataElement="textUnderlineToolButton"
          title="annotation.underline"
          img="ic_annotation_underline_black_24px"
          onClick={() =>
            createTextAnnotationAndSelect(
              dispatch,
              Annotations.TextUnderlineAnnotation
            )
          }
        />
        <ActionButton
          dataElement="textSquigglyToolButton"
          title="annotation.squiggly"
          img="ic_annotation_squiggly_black_24px"
          onClick={() =>
            createTextAnnotationAndSelect(
              dispatch,
              Annotations.TextSquigglyAnnotation
            )
          }
        />
        <ActionButton
          title="annotation.strikeout"
          img="ic_annotation_strikeout_black_24px"
          onClick={() =>
            createTextAnnotationAndSelect(
              dispatch,
              Annotations.TextStrikeoutAnnotation
            )
          }
          dataElement="textStrikeoutToolButton"
          isActive={isActive("strikeout")}
        />
        <ActionButton
          title="tool.Link"
          img="icon-tool-link"
          onClick={() => dispatch(actions.openElement("linkModal"))}
          dataElement="linkButton"
        />
        {core.isCreateRedactionEnabled() && (
          <ActionButton
            dataElement="textRedactToolButton"
            title="option.redaction.markForRedaction"
            img="ic_annotation_add_redact_black_24px"
            onClick={() =>
              createTextAnnotationAndSelect(
                dispatch,
                Annotations.RedactionAnnotation
              )
            }
          />
        )}
      </CustomizablePopup>
    </div>
  );
};

export default TextPopup;
