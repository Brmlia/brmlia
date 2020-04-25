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
            <FabricLayer zIndex={5} channel={3} />
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

    var fabricCanvas1;
    var fabricCanvas2;
    var fabricCanvas3;

    var lastSelected = settingsApi.getState().lastSelected;
    if (settingsApi.getState().channels[0].selected) {
      console.log('displaying 1');
      view1 = canvasApi.getState().canvas[0];
      var canvasZIndex = lastSelected === '1' ? 10 : 4;
      var opacity = lastSelected === '1' ? 1 : 0.5;
      fabricCanvas1 = (
        <FabricLayer zIndex={canvasZIndex} opacity={opacity} channel={0} />
      );
    }
    if (settingsApi.getState().channels[1].selected) {
      console.log('displaying 2');
      view2 = canvasApi.getState().canvas[1];
      var canvasZIndex = lastSelected === '2' ? 10 : 6;
      var opacity = lastSelected === '2' ? 1 : 0.5;
      fabricCanvas2 = (
        <FabricLayer zIndex={canvasZIndex} opacity={opacity} channel={1} />
      );
    }
    if (settingsApi.getState().channels[2].selected) {
      console.log('displaying 3');
      view3 = canvasApi.getState().canvas[2];
      var canvasZIndex = lastSelected === '3' ? 10 : 8;
      var opacity = lastSelected === '3' ? 1 : 0.5;

      fabricCanvas3 = (
        <FabricLayer zIndex={canvasZIndex} opacity={opacity} channel={2} />
      );
    }
    return (
      <Card style={card}>
        <CardBody>
          <CardTitle> Image View </CardTitle>
          <div id="canvasContainer">
            <div style={canvasStyle1}>{view1}</div>
            {fabricCanvas1}
            <div style={canvasStyle2}>{view2}</div>
            {fabricCanvas2}
            <div style={canvasStyle3}>{view3} </div>
            {fabricCanvas3}
          </div>
        </CardBody>
        <br></br>
      </Card>
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
        {/* <FabricLayer /> */}
      </div>
    );
  }
}

export default mainViewer;
