import React from 'react';
import { chSideBarOpenStyle, chSideBarClosedStyle } from './index.js';
import { sideBarApi } from './sideBarStore.js';
import { sideBarViewerApi } from './sideBarViewerStore.js';

class ChannelSideBar extends React.Component {
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
      return chSideBarOpenStyle;
    }
    return chSideBarClosedStyle;
  };
  render() {
    if (!this.initialized) {
      this.channelViewer = sideBarViewerApi.getState().sidebar[1];
      this.initialized = true;
    }
    sideBarApi.subscribe(state => {
      this.updateOpen(state.channelSideBarOpen);
    });
    return (
      <div className="channel-sidebar" style={this.style()}>
        <div className="sidebar-header" style={{ background: '#6d7fcc' }}>
          <h3 style={{ padding: '0.5em' }}>Channels</h3>
        </div>
        {this.channelViewer}
      </div>
    );
  }
}

export default ChannelSideBar;
