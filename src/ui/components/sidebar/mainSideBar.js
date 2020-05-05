import React from 'react';
import {
  mainSideBarOpenStyle,
  mainSideBarClosedStyle,
} from './index.js';
import { Nav } from 'reactstrap';
import { sideBarApi } from './sideBarStore.js';
import { sideBarViewerApi } from './sideBarViewerStore.js';

class ChannelSideBar extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isOpen: false
    }
    this.initialized = false
  }

  updateOpen(open) {
    if (this.state.isOpen !== open) {
      this.setState({
        isOpen: open
      })
    }
  }

  style = () => {
    if (this.state.isOpen) {
      return mainSideBarOpenStyle
    }
    return mainSideBarClosedStyle
  }
  render() {

    if (!this.initialized) {
      this.mainViewer = sideBarViewerApi.getState().sidebar[2]
      this.initialized = true
    }
    sideBarApi.subscribe(state => {
      this.updateOpen(state.mainSideBarOpen)
    })
    return (
      <div className="channel-sidebar" style={this.style()}>
        <div className="sidebar-header" style={{background: '#6d7fcc'}} >
          <h3 style={{padding: '0.5em'}}></h3>
        </div>
        <div className="side-menu">
          <Nav vertical className="list-unstyled pb-3">
            <p style={{padding: '0.5em'}}></p>
             {this.mainViewer}
          </Nav>
        </div>
      </div>
    );
  }
}

export default ChannelSideBar