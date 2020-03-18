import React from "react";

import { cardStyle, card, axesImg } from '../style.js';
import Viewer from "../../viewer/index.js";
import {
  Card,
  CardTitle,
  CardBody,
} from 'reactstrap';

class AxesViewer extends React.Component {

  render() {
    return (
      <div>
        <div className="card-axis-xy" style={cardStyle}>
          <Card style={card}>
            <CardBody>
              <CardTitle> Axis XY </CardTitle>
              <Viewer imageSrc={this.props.imageSrc} imageWidth={axesImg.width}/>
            </CardBody>
          </Card>
        </div>

        <br></br>
        <div className="card-axis-yz" style={cardStyle}>
          <Card style={card}>
            <CardBody>
              <CardTitle> Axis YZ </CardTitle>
              <Viewer imageSrc={this.props.imageSrc} imageWidth={axesImg.width}/>
            </CardBody>
          </Card>
        </div>

        <br></br>
        <div className="card-axis-xz" style={cardStyle}>
          <Card style={card}>
            <CardBody>
              <CardTitle> Axis XZ </CardTitle>
              <Viewer imageSrc={this.props.imageSrc} imageWidth={axesImg.width}/>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}

export default AxesViewer;