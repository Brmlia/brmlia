import React from 'react';

import { cardStyle, card, axesImg } from '../style.js';
import Viewer from '../../viewer/index.js';
import { Card, CardTitle, CardBody } from 'reactstrap';

class AxesViewer extends React.Component {
  render() {
    return (
      <div>
        <div className="card-axis-xy" style={cardStyle}>
          <Card style={card}>
            <CardBody>
              <CardTitle> Axis XY </CardTitle>
              <Viewer imageWidth={axesImg.width} type="1" />
            </CardBody>
          </Card>
        </div>

        <br></br>
        <div className="card-axis-yz" style={cardStyle}>
          <Card style={card}>
            <CardBody>
              <CardTitle> Axis YZ </CardTitle>
              <Viewer imageWidth={axesImg.width} type="2" />
            </CardBody>
          </Card>
        </div>

        <br></br>
        <div className="card-axis-xz" style={cardStyle}>
          <Card style={card}>
            <CardBody>
              <CardTitle> Axis XZ </CardTitle>
              <Viewer imageWidth={axesImg.width} type="3" />
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}

export default AxesViewer;
