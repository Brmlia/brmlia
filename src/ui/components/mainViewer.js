import React from "react";

import { cardStyle, card, mainImg, canvasStyle } from '../style.js';
import Viewer from "../../viewer/index.js";
import {
  Card,
  CardTitle,
  CardBody,
} from 'reactstrap';
import {canvasApi} from '../../imagecanvas/canvasStore.js'
import { Canvas } from 'react-three-fiber';
import { settingsApi } from '../../mainSettings.js';
import Channel from "./channel.js"

class mainViewer extends React.Component {

  state = {
    view: <Viewer imageWidth={mainImg.width}/>,
    channel: 1
  }

  altView() {
    return (
      <Card style={card}>
        <CardBody>
          <CardTitle> Image View </CardTitle>
        </CardBody>
        <div id="mainView"></div>
        {this.state.view}
        <br>
        </br>
      </Card>
    );
  }

  channelViews() {

    // copy display from last enabled channel for now
    var view;

    if (settingsApi.getState().channels[this.state.channel-1].selected) {
      view = canvasApi.getState().canvas[this.state.channel-1]
    }

    return (
      <div id="stage"  style={canvasStyle}>
        <Canvas>
          {view}
        </Canvas>
      </div>
    );
  }

  display() {
    if (
      !settingsApi.getState().channels[0].selected
      && !settingsApi.getState().channels[1].selected
      && !settingsApi.getState().channels[2].selected
    ) {
      return this.altView()
    }
    else {
      return this.channelViews()
    }
  }

  render() {
    settingsApi.subscribe(state => {
      this.state.channel = state.lastSelected;
      this.forceUpdate();
    })
    return (
      <div className="main-view" style={cardStyle}>
        {this.display()}
      </div>
    );
  }
}

export default mainViewer;