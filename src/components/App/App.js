import { hot } from 'react-hot-loader/root';
import React, { useEffect } from 'react';
import { useStore } from 'react-redux';
import PropTypes from 'prop-types';

import Accessibility from 'components/Accessibility';
import Header from 'components/Header';
import ViewControlsOverlay from 'components/ViewControlsOverlay';
import SearchOverlay from 'components/SearchOverlay';
import MenuOverlay from 'components/MenuOverlay';
import RedactionOverlay from 'components/RedactionOverlay';
import StampOverlay from 'components/StampOverlay';
import SignatureOverlay from 'components/SignatureOverlay';
import MeasurementOverlay from 'components/MeasurementOverlay';
import AnnotationContentOverlay from 'components/AnnotationContentOverlay';
import MouseTip from 'components/MouseTip';
import ToolsOverlay from 'components/ToolsOverlay';
import DocumentContainer from 'components/DocumentContainer';
import LeftPanel from 'components/LeftPanel';
import SearchPanel from 'components/SearchPanel';
import AnnotationPopup from 'components/AnnotationPopup';
import TextPopup from 'components/TextPopup';
import ContextMenuPopup from 'components/ContextMenuPopup';
import ToolStylePopup from 'components/ToolStylePopup';
import RichTextPopup from 'components/RichTextPopup';
import SignatureModal from 'components/SignatureModal';
import PrintModal from 'components/PrintModal';
import LoadingModal from 'components/LoadingModal';
import ErrorModal from 'components/ErrorModal';
import WarningModal from 'components/WarningModal';
import PasswordModal from 'components/PasswordModal';
import ProgressModal from 'components/ProgressModal';
import CalibrationModal from 'components/CalibrationModal';
import LinkModal from 'components/LinkModal';
import FilePickerHandler from 'components/FilePickerHandler';
import CopyTextHandler from 'components/CopyTextHandler';
import PrintHandler from 'components/PrintHandler';
import FontHandler from 'components/FontHandler';
import ZoomOverlay from 'components/ZoomOverlay';
import AnnotationToolsOverlay from 'components/AnnotationToolsOverlay';

import defineReaderControlAPIs from 'src/apis';
import fireEvent from 'helpers/fireEvent';

import './App.scss';
import 'constants/pikaday.scss';
import 'constants/quill.scss';

const propTypes = {
  removeEventHandlers: PropTypes.func.isRequired,
};

const App = ({ removeEventHandlers }) => {
  const store = useStore();

  useEffect(() => {
    defineReaderControlAPIs(store);
    fireEvent('viewerLoaded');

    return removeEventHandlers;
  // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <div className="App">
        <Accessibility />

        <LeftPanel />
        <SearchPanel />

        <AnnotationToolsOverlay />
        <DocumentContainer />

        <Header />
        
        <SearchOverlay />
        <ViewControlsOverlay />
        <RedactionOverlay />
        <StampOverlay />
        <MenuOverlay />
        <SignatureOverlay />
        <ZoomOverlay />
        <MeasurementOverlay />
        <AnnotationContentOverlay />
        <MouseTip />
        <ToolsOverlay />

        <AnnotationPopup />
        <TextPopup />
        <ContextMenuPopup />
        <ToolStylePopup />
        <RichTextPopup />

        <SignatureModal />
        <PrintModal />
        <LoadingModal />
        <ErrorModal />
        <WarningModal />
        <PasswordModal />
        <ProgressModal />
        <CalibrationModal />
        <LinkModal />
      </div>

      <PrintHandler />
      <FilePickerHandler />
      <CopyTextHandler />
      <FontHandler />
    </React.Fragment>
  );
};

App.propTypes = propTypes;

export default hot(App);
