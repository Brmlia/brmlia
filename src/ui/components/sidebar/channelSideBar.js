import React from 'react';
import {
  chSideBarOpenStyle,
  chSideBarClosedStyle,
} from './index.js';
import { Nav } from 'reactstrap';
import { sideBarApi } from './sideBarStore.js';

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
      return chSideBarOpenStyle
    }
    return chSideBarClosedStyle
  }
  render() {

    if (!this.initialized) {
      this.channelViewer = sideBarApi.getState().sidebar[1]
      this.initialized = true
    }
    sideBarApi.subscribe(state => {
      this.updateOpen(state.channelSideBarOpen)
    })
    return (
      <div className="channel-sidebar" style={this.style()}>
        <div className="sidebar-header" style={{background: '#6d7fcc'}} >
          <h3 style={{padding: '0.5em'}}>Bootstrap Sidebar</h3>
        </div>
        <div className="side-menu">
          <Nav vertical className="list-unstyled pb-3">
            <p style={{padding: '0.5em'}}>Dummy Heading</p>
             {this.channelViewer}
          </Nav>
        </div>
      </div>
    );
  }
}

export default ChannelSideBar