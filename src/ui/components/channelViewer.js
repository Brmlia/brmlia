import React from 'react';

import { cardStyle, card } from '../style.js';
import { Card, CardTitle, CardBody } from 'reactstrap';

import Channel from './channel.js';

class ChannelViewer extends React.Component {
  render() {
    return (
      <div className="annotations-channel" style={cardStyle}>
        <Card style={card}>
          <CardBody>
            <CardTitle> Channel Selection </CardTitle>
            <Channel ch="1" />
            <Channel ch="2" />
            <Channel ch="3" />
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default ChannelViewer;
