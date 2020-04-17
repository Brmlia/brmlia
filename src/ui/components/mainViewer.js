import React from 'react';

import {
  cardStyle,
  card,
  mainImg,
  mainCanvasStyle,
  canvasStyle1,
  canvasStyle2,
  canvasStyle3,
} from '../style.js';
import Viewer from '../../viewer/index.js';
import { Card, CardTitle, CardBody } from 'reactstrap';
import { canvasApi } from '../../imagecanvas/canvasStore.js';
import { settingsApi } from '../../mainSettings.js';
import FabricLayer from './FabricLayer.js';
import ImageCanvas from './../../imagecanvas/ImageCanvas.js';

class mainViewer extends React.Component {
  altView() {
    return (
      <Card style={card}>
        <CardBody>
          <CardTitle> Image View </CardTitle>
          <Viewer imageWidth={mainImg.width} type="0" />
        </CardBody>
        <br></br>
      </Card>
    );
  }
  canvasView() {
    var canvas = (
      <ImageCanvas
        className="annot-view"
        alt="main-canvas"
        height="100px"
        channel="4"
      />
    );
    return (
      <Card style={card}>
        <CardBody>
          <CardTitle> Image View </CardTitle>
          <div id="canvasContainer">
            <div id="main-canvas-view" style={mainCanvasStyle}>
              {canvas}
            </div>
            <FabricLayer />
          </div>
        </CardBody>
        <br></br>
      </Card>
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
      <div id="canvasContainer">
        <div style={canvasStyle1}>{view1}</div>
        <div style={canvasStyle2}>{view2}</div>
        <div style={canvasStyle3}>{view3}</div>
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
    return (
      <div className="main-view" style={cardStyle}>
        {this.display()}
      </div>
    );
  }
}

export default mainViewer;
