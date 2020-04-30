import React from 'react';
import { Card, CardTitle, CardBody } from 'reactstrap';

import MainTiffViewer from './mainTiffViewer.js';

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

  componentDidMount() {
  }

  canvasView() {
    var canvas = (
      <MainTiffViewer
        axis="2"
        className="annot-view"
        alt="main-canvas"
        width={window.innerWidth * 0.6}
        height={window.innerHeight * 0.6}
        channel="4"
      />
    );

    return (
      <div id="main-canvas-view" style={mainCanvasStyle0}>
        {canvas}
      </div>
    );
  }

  channelViews() {
  }

  display() {
    return this.canvasView();
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
          <CardBody>
            <CardTitle> <h3> Image View </h3> </CardTitle>
            <div id="main-canvas-container" style={{ width: width, height: height }}>
              {this.display()}
            </div>
          </CardBody>
          <br></br>
        </Card>
      </div>
    );
  }
}

export default mainViewer;
