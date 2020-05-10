import React from 'react';
import { Card, CardTitle, CardBody } from 'reactstrap';

import FabricLayer from './FabricLayer.js';
import MainTiffViewer from './mainTiffViewer.js';

import { canvasApi } from '../../imagecanvas/canvasStore.js';
import { settingsApi } from '../../mainSettings.js';

import {
  fApi,
  mainViewStyle,
  mainCanvasStyle1,
  mainCanvasStyle2,
  mainCanvasStyle3,
  mainCardStyle,
} from './index.js';

class mainViewer extends React.Component {

  constructor(props) {
    super(props)

    this.views = []
  }

  canvasView() {
    var canvas = (
      <MainTiffViewer
        axis="2"
        className="annot-view"
        alt="main-canvas"
        width={window.innerWidth * 0.6}
        height="100%"
        channel="0"
        files={this.files}
      />
    );

    let width = window.innerWidth * 0.6;
    let height = window.innerHeight * 0.6;

    return (
      <div id="main-canvas-view" style={{ width: width, height: height }}>
        {canvas}
      </div>
    );
  }

  updateViews() {
    var views = []
    for (var i = 0; i < settingsApi.getState().channels.length; i++) {
      const channelSel = settingsApi.getState().channels[i].selected
      if (channelSel) {
        views.push(
          canvasApi.getState().canvas[i]
        )
      }
    }
    this.views = views
  }

  channelViews() {
    return (
      <div>
        <div style={mainCanvasStyle1}>{this.views[0]}</div>
        <div style={mainCanvasStyle2}>{this.views[1]}</div>
        <div style={mainCanvasStyle3}>{this.views[2]} </div>
      </div>
    );
  }

  updateForFile(state) {
    this.files = state.file
  }

  display() {
    if (
      this.views.length === 0
    ) {
      return this.canvasView();
    } else {
      return this.channelViews();
    }
  }

  render() {
    settingsApi.subscribe(state => {
      this.updateViews();
      this.forceUpdate();
    });
    fApi.subscribe(state => {
      this.updateForFile(state);
    });

    let width = window.innerWidth * 0.6;
    let height = window.innerHeight * 0.6;

    return (
      <div className="main-view" style={mainViewStyle}>
        <Card className="main-card" style={mainCardStyle}>
          <CardBody className="main-card-body">
            <CardTitle>
              {' '}
              <h5> Image View </h5>{' '}
            </CardTitle>
            <div
              id="main-canvas-container"
              style={{ width: width, height: height, position: 'relative' }}
            >
              {this.display()}
              <FabricLayer />
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default mainViewer;
