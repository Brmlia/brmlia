import React from 'react';
import { Card, CardTitle, CardBody } from 'reactstrap';

import AxisTiffViewer from './axisTiffViewer.js';

import {
  axisViewStyle,
  axisCardStyle,
  axisCardBodyStyle,
} from './index.js';

class AxesViewer extends React.Component {
  view1 = (<AxisTiffViewer axis="2" />);
  view2 = (<AxisTiffViewer axis="0" />);
  view3 = (<AxisTiffViewer axis="1" />);

  render() {
    return (
      <div>
        <div className="card-axis-xy" style={axisViewStyle}>
          <Card style={axisCardStyle}>
            <CardBody style = {axisCardBodyStyle}>
              <CardTitle> <h3> Axis XY </h3> </CardTitle>
              {this.view1}
            </CardBody>
          </Card>
        </div>

        <br></br>
        <div className="card-axis-yz" style={axisViewStyle}>
          <Card style={axisCardStyle}>
            <CardBody style = {axisCardBodyStyle}>
              <CardTitle> <h3> Axis YZ </h3> </CardTitle>
              {this.view2}
            </CardBody>
          </Card>
        </div>

        <br></br>
        <div className="card-axis-xz" style={axisViewStyle}>
          <Card style={axisCardStyle}>
            <CardBody style = {axisCardBodyStyle}>
              <CardTitle> <h3> Axis XZ </h3> </CardTitle>
              {this.view3}
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}

export default AxesViewer;
