import React from 'react';
import { Card, CardTitle, CardBody } from 'reactstrap';

import FabricLayer from './FabricLayer.js';
import MainTiffViewer from './mainTiffViewer.js';

import { canvasApi } from '../../imagecanvas/canvasStore.js';
import { settingsApi } from '../../mainSettings.js';

import {
  mainImgStyle,
  mainViewStyle,
  mainCanvasStyle0,
  mainCanvasStyle1,
  mainCanvasStyle2,
  mainCanvasStyle3,
  mainCardStyle,
  mainCardBodyStyle,
} from './index.js';

class mainViewer extends React.Component {
  canvasView() {
    var canvas = (
      <MainTiffViewer
        axis="2"
        className="annot-view"
        alt="main-canvas"
        width={window.innerWidth * 0.6}
        height="100%"
        channel="4"
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

  channelViews() {
    var view1;
    var view2;
    var view3;

    if (settingsApi.getState().channels[0].selected) {
      console.log('displaying 1');
      view1 = canvasApi.getState().canvas[0];
    }
    if (settingsApi.getState().channels[1].selected) {
      console.log('displaying 2');
      view2 = canvasApi.getState().canvas[1];
    }
    if (settingsApi.getState().channels[2].selected) {
      console.log('displaying 3');
      view3 = canvasApi.getState().canvas[2];
    }
    return (
      <div>
        <div style={mainCanvasStyle1}>{view1}</div>
        <div style={mainCanvasStyle2}>{view2}</div>
        <div style={mainCanvasStyle3}>{view3} </div>
      </div>
    );
  }

  display() {
    if (
      !settingsApi.getState().channels[0].selected &&
      !settingsApi.getState().channels[1].selected &&
      !settingsApi.getState().channels[2].selected
    ) {
      return this.canvasView();
    } else {
      return this.channelViews();
    }
  }

  render() {
    settingsApi.subscribe(state => {
      this.forceUpdate();
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
