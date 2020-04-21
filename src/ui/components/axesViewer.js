import React from 'react';

import { cardStyle, card } from '../style.js';
import { Card, CardTitle, CardBody } from 'reactstrap';
import AxisTiffViewer from './axisTiffViewer.js';

class AxesViewer extends React.Component {

  view1 = <AxisTiffViewer axis="2"/>
  view2 = <AxisTiffViewer axis="0"/>
  view3 = <AxisTiffViewer axis="1"/>

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
