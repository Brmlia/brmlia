import React, { useState } from 'react';
import {
  sideBarOpenStyle,
  sideBarClosedStyle,
  linkStyle,
} from './index.js';
import { NavItem, NavLink, Nav } from 'reactstrap';
import {Link} from 'react-router-dom';
import AxesViewer from './../axesViewer.js';
import { sideBarApi } from './sideBarStore.js';

class AxisSideBar extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isOpen: false
    }
    this.initialized = false
  }

  submenus = [
    [
      {
        title: "Home 1",
        target: "Home-1"
      },
      {
        title: "Home 2",
        target: "Home-2",
      },
      {
        itle: "Home 3",
        target: "Home-3",
      }
    ],
    [
      {
        title: "Page 1",
        target: "Page-1",
      },
      {
        title: "Page 2",
        target: "Page-2",
      }
    ]
  ]

  updateOpen(open) {
    if (this.state.isOpen !== open) {
      this.setState({
        isOpen: open
      })
    }
  }

  style = () => {
    if (this.state.isOpen) {
      return sideBarOpenStyle
    }
    return sideBarClosedStyle
  }
  render() {

    if (!this.initialized) {
      this.axesViewer = sideBarApi.getState().sidebar[0]
      this.initialized = true
    }
    sideBarApi.subscribe(state => {
      this.updateOpen(state.axisSideBarOpen)
    })
    return (
      <div className="axis-sidebar" style={this.style()}>
        <div className="sidebar-header" style={{background: '#6d7fcc'}} >
          <h3 style={{padding: '0.5em'}}>Bootstrap Sidebar</h3>
        </div>
        <div className="side-menu">
          <Nav vertical className="list-unstyled pb-3">
            <p style={{padding: '0.5em'}}>Dummy Heading</p>
             {this.axesViewer}
          </Nav>
        </div>
      </div>
    );
  }
}

export default AxisSideBar