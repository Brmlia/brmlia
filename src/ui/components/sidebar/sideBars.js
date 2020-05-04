import { BrowserRouter as Router } from "react-router-dom";
import React, { useState } from 'react';

import AxisSideBar from './axisSideBar.js';
import NavBar from './navBar.js';
import { sideBarApi } from './sideBarStore.js';

class SideBars extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isOpen: false
    }
  }

  componentDidMount() {
    this.axesSideBar = sideBarApi.getState().sidebar[0];
    this.axesSideBarOpen = sideBarApi.getState().axisSideBarOpen;
  }

  toggle () {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }))
    sideBarApi.setState(prevState => ({
      ...prevState,
      axisSideBarOpen: !prevState.axisSideBarOpen
    }))
  }

  render() {
    return (
      <Router>
        <div class="sidebars">
          <NavBar toggle={this.toggle.bind(this)}/>
          <AxisSideBar toggle={this.toggle.bind(this)} isOpen={this.state.isOpen}/>
        </div>
      </Router>
    )
  }
}

export default SideBars
