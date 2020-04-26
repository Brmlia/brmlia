import React from 'react';
import { Card, CardTitle, CardBody } from 'reactstrap';

import MainTiffViewer from './mainTiffViewer.js';

import { settingsApi } from '../../mainSettings.js';

import {
  cardStyle,
  card,
  mainImg,
  mainCanvasStyle,
  canvasStyle1,
  canvasStyle2,
  canvasStyle3,
  fabricApi,
  initFabricLayers,
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
        width="500px"
        height="500px"
        channel="4"
      />
    );

    let width = window.innerWidth * 0.6;
    let height = window.innerHeight * 0.6;

    return (
      <Card style={card}>
        <CardBody>
          <CardTitle> Image View </CardTitle>
          <div id="canvasContainer" style={{ width: width, height: height }}>
            <div id="main-canvas-view" style={mainCanvasStyle}>
              {canvas}
            </div>
          </div>
        </CardBody>
        <br></br>
      </Card>
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
    return (
      <div className="main-view" style={cardStyle}>
        {this.display()}
      </div>
    );
  }
}

export default mainViewer;
