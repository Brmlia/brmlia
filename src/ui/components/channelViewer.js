import React from 'react';
import { Row, Col, Card, CardTitle, CardBody } from 'reactstrap';

import Channel from './channel.js';

import {
  channelViewStyle,
  channelCardStyle,
  channelCardBodyStyle,
} from './index.js';

class ChannelViewer extends React.Component {
  render() {
    return (
      <div className="annotations-channel" style={channelViewStyle}>
        <br />
        <Row>
          <Col sm="4">
            <Card style={channelCardStyle}>
              <CardBody style={channelCardBodyStyle}>
                <CardTitle>
                  {' '}
                  <h5> Channel 1 </h5>{' '}
                </CardTitle>
                <Channel ch="1" />
              </CardBody>
            </Card>
          </Col>
          <Col sm="4">
            <Card style={channelCardStyle}>
              <CardBody style={channelCardBodyStyle}>
                <CardTitle>
                  {' '}
                  <h5> Channel 2 </h5>{' '}
                </CardTitle>
                <Channel ch="2" />
              </CardBody>
            </Card>
          </Col>
          <Col sm="4">
            <Card style={channelCardStyle}>
              <CardBody style={channelCardBodyStyle}>
                <CardTitle>
                  {' '}
                  <h5> Channel 3 </h5>{' '}
                </CardTitle>
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
