import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';

import AxisSideBar from './axisSideBar.js';
import ChannelSideBar from './channelSideBar.js';
import MainSideBar from './mainSideBar.js';
import NavBar from './navBar.js';
import { sideBarApi } from './sideBarStore.js';
import { sideBarViewerApi } from './sideBarViewerStore.js';
import { Row } from 'reactstrap';

class SideBars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  componentDidMount() {
    this.axesSideBar = sideBarViewerApi.getState().sidebar[0];
    this.axesSideBarOpen = sideBarApi.getState().axisSideBarOpen;
  }

  toggleAxisSidebar() {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
    sideBarApi.setState(prevState => ({
      ...prevState,
      axisSideBarOpen: !prevState.axisSideBarOpen,
    }));
  }

  toggleChannelSidebar() {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
    sideBarApi.setState(prevState => ({
      ...prevState,
      channelSideBarOpen: !prevState.channelSideBarOpen,
    }));
  }

  toggleMainSidebar() {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
    sideBarApi.setState(prevState => ({
      ...prevState,
      mainSideBarOpen: !prevState.mainSideBarOpen,
    }));
  }

  render() {
    return (
      <Router>
        <div class="sidebars">
          <NavBar
            toggleMainSidebar={this.toggleMainSidebar.bind(this)}
            toggleAxisSidebar={this.toggleAxisSidebar.bind(this)}
            toggleChannelSidebar={this.toggleChannelSidebar.bind(this)}
          />
          <Row>
            <MainSideBar />
            <AxisSideBar />
            <ChannelSideBar />
          </Row>
        </div>
      </Router>
    );
  }
}

export default SideBars;
