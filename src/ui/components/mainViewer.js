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
import MainTiffViewer from './mainTiffViewer.js';
import { fabricApi, initFabricLayers } from '../../fabric/fabricControl.js';

var fabricLayers = [
  <FabricLayer zIndex={8} channel={0} />,
  <FabricLayer zIndex={9} channel={1} />,
  <FabricLayer zIndex={10} channel={2} />,
  <FabricLayer zIndex={11} channel={3} />,
];

class mainViewer extends React.Component {

  componentDidMount() {
    initFabricLayers(8, 0)
    initFabricLayers(9, 1)
    initFabricLayers(10, 2)
    initFabricLayers(11, 3)
  }

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
            {fabricLayers[3]}
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

    let width = window.innerWidth * 0.6;
    let height = window.innerHeight * 0.6;

    var lastSelected = settingsApi.getState().lastSelected;
    if (settingsApi.getState().channels[0].selected) {
      console.log('displaying 1');
      view1 = canvasApi.getState().canvas[0];
      fabricCanvas1 = fabricApi.getState().layers[0];
      // fabricCanvas1 = fabricLayers[0];
    }
    if (settingsApi.getState().channels[1].selected) {
      console.log('displaying 2');
      view2 = canvasApi.getState().canvas[1];
      fabricCanvas2 = fabricLayers[1];
    }
    if (settingsApi.getState().channels[2].selected) {
      console.log('displaying 3');
      view3 = canvasApi.getState().canvas[2];
      fabricCanvas3 = fabricLayers[2];
    }
    return (
      <Card style={card}>
        <CardBody>
          <CardTitle> Image View </CardTitle>
          <div id="canvasContainer" style={{ width: width, height: height }}>
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
      </div>
    );
  }
}

export default mainViewer;
