import React from 'react';
import {
  Button,
  Navbar,
  Card,
  Row,
} from 'reactstrap';
import {
  mainSideBarOpenStyle,
  mainSideBarClosedStyle,
} from './index.js';
import {
  modes,
  setMode,
  undo,
  redo,
} from './../index.js';
import { sideBarApi } from './sideBarStore.js';
import { sideBarViewerApi } from './sideBarViewerStore.js';
import AnnotatorViewer from './../annotatorViewer.js';
import Annotator from './../../../annotator/annotator.js';
import Thumbnails from './../thumbnails.js';

class MainSideBar extends React.Component {

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

  displayDrawMenu() {
    return (
      <div style={{padding: '20px'}}>
          <Button
            color="primary"
            className="draw-rectangle-btn"
            onClick={e => setMode(modes.RECT)}
          >
            Draw Rectangle
          </Button> &nbsp;
          <Button
            color="primary"
            className="draw-rectangle-btn"
            onClick={e => setMode(modes.FREE)}
          >
            Draw Freehand
          </Button> &nbsp;
          <Button
            color="primary"
            className="draw-rectangle-btn"
            onClick={e => undo()}
          >
            Undo
          </Button> &nbsp;
          <Button
            color="primary"
            className="draw-rectangle-btn"
            onClick={e => redo()}
          >
            Redo
          </Button> &nbsp;
      </div>
    )
  }

  displayEditMenu() {
    return (
      <div>
      </div>
    )
  }

  displayMenus() {
    return (
      <div style={{padding: "0px", width: "100%"}}>
        <Card>
          <Row>
          {this.displayEditMenu()}
          {this.displayDrawMenu()}
          </Row>
        </Card>
      </div>
    );
  }

  render() {

    if (!this.initialized) {
      this.mainViewer = sideBarViewerApi.getState().sidebar[2]
      this.annotatorViewer = <AnnotatorViewer />
      this.annotator = <Annotator />
      this.thumbnails = <Thumbnails style={{position: 'absolute'}}/>
      this.initialized = true
    }
    sideBarApi.subscribe(state => {
      this.updateOpen(state.mainSideBarOpen)
    })
    return (
      <div className="main-sidebar" style={this.style()}>
        <div className="sidebar-header" style={{background: '#6d7fcc'}} >
          <h3 style={{padding: '0.5em'}}>Main View</h3>
        </div>
        {this.annotatorViewer}
        {this.displayMenus()}
        {this.mainViewer}
        {this.annotator}
        {this.thumbnails}
      </div>
    );
  }
}

export default MainSideBar