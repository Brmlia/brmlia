import React from 'react';
import { Row, Col, Card, CardTitle, CardBody } from 'reactstrap';

import Channel from './channel.js';

import {
  cardStyle,
  cardBody,
  card,
} from './index.js';

class ChannelViewer extends React.Component {
  render() {
    return (
      <div className="annotations-channel" style={cardStyle}>
        <br />
        <Row>
          <Col sm="4">
            <Card style={card}>
              <CardBody style={cardBody}>
                <CardTitle> Channel 1 </CardTitle>
                <Channel ch="1" />
              </CardBody>
            </Card>
          </Col>
          <Col sm="4">
            <Card style={card}>
              <CardBody style={cardBody}>
                <CardTitle> Channel 2 </CardTitle>
                <Channel ch="2" />
              </CardBody>
            </Card>
          </Col>
          <Col sm="4">
            <Card style={card}>
              <CardBody style={cardBody}>
                <CardTitle> Channel 3 </CardTitle>
                <Channel ch="3" />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ChannelViewer;
