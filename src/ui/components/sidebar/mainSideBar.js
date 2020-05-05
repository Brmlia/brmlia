import React from 'react';
import { mainSideBarOpenStyle, mainSideBarClosedStyle } from './index.js';
import { sideBarApi } from './sideBarStore.js';
import { sideBarViewerApi } from './sideBarViewerStore.js';
import AnnotatorViewer from './../annotatorViewer.js';
import Annotator from './../../../annotator/annotator.js';
import Thumbnails from './../thumbnails.js';

class MainSideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.initialized = false;
  }

  updateOpen(open) {
    if (this.state.isOpen !== open) {
      this.setState({
        isOpen: open,
      });
    }
  }

  style = () => {
    if (this.state.isOpen) {
      return mainSideBarOpenStyle;
    }
    return mainSideBarClosedStyle;
  };
  render() {
    if (!this.initialized) {
      this.mainViewer = sideBarViewerApi.getState().sidebar[2];
      this.annotatorViewer = <AnnotatorViewer />;
      this.annotator = <Annotator />;
      this.thumbnails = <Thumbnails style={{ position: 'absolute' }} />;
      this.initialized = true;
    }
    sideBarApi.subscribe(state => {
      this.updateOpen(state.mainSideBarOpen);
    });
    return (
      <div className="main-sidebar" style={this.style()}>
        <div className="sidebar-header" style={{ background: '#6d7fcc' }}>
          <h3 style={{ padding: '0.5em' }}>Main View</h3>
        </div>
        {this.annotatorViewer}
        {this.mainViewer}
        {this.annotator}
        {this.thumbnails}
      </div>
    );
  }
}

export default MainSideBar;
