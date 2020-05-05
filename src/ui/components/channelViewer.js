import React from 'react';
import { Row, Col, Card, CardTitle, CardBody } from 'reactstrap';

import Channel from './channel.js';
import { sideBarApi } from './sidebar/sideBarStore.js';

import {
  channelViewStyle,
  channelViewStyleCollapsed,
  channelCardStyle,
  channelCardBodyStyle,
} from './index.js';

class ChannelViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }
  updateOpen(open) {
    if (this.state.isOpen !== open) {
      this.setState({
        isOpen: open,
      });
    }
  }

  style = () => {
    if (this.state.isOpen) {
      return channelViewStyle;
    }
    return channelViewStyleCollapsed;
  };

  render() {
    sideBarApi.subscribe(state => {
      this.updateOpen(state.channelSideBarOpen);
    });

    return (
      // <div className="annotations-channel">
      <div className="annotations-channel" style={this.style()}>
        <br />
        <Row>
          <Col sm="4">
            <Card style={channelCardStyle}>
              <CardBody style={channelCardBodyStyle}>
                <CardTitle>
                  {' '}
                  <h3> Channel 1 </h3>{' '}
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
                  <h3> Channel 2 </h3>{' '}
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
                  <h3> Channel 3 </h3>{' '}
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
