import React from 'react';

import { cardStyle, card, axesImg } from '../style.js';
import Viewer from '../../viewer/index.js';
import { Card, CardTitle, CardBody } from 'reactstrap';
import ImageCanvas from './../../imagecanvas/ImageCanvas.js';

class AxesViewer extends React.Component {

  // view1 = <Viewer imageWidth={axesImg.width} type="1" />
  // view2 = <Viewer imageWidth={axesImg.width} type="2" />
  // view3 = <Viewer imageWidth={axesImg.width} type="3" />
  view1 =
    <ImageCanvas
      className="axis-xy-view"
      alt="xy-canvas-view"
      height="100px"
      channel="4"
    />
  view2 =
    <ImageCanvas
      className="axis-yz-view"
      alt="yz-canvas-view"
      height="100px"
      channel="4"
    />
  view3 =
    <ImageCanvas
      className="axis-xz-view"
      alt="xz-canvas-view"
      height="100px"
      channel="4"
    />

  render() {
    return (
      <div>
        <div className="card-axis-xy" style={cardStyle}>
          <Card style={card}>
            <CardBody>
              <CardTitle> Axis XY </CardTitle>
              {this.view1}
            </CardBody>
          </Card>
        </div>

        <br></br>
        <div className="card-axis-yz" style={cardStyle}>
          <Card style={card}>
            <CardBody>
              <CardTitle> Axis YZ </CardTitle>
              {this.view2}
            </CardBody>
          </Card>
        </div>

        <br></br>
        <div className="card-axis-xz" style={cardStyle}>
          <Card style={card}>
            <CardBody>
              <CardTitle> Axis XZ </CardTitle>
              {this.view3}
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}

export default AxesViewer;
