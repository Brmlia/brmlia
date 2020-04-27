import React from 'react';
import { mainStyle, rowStyle, container } from './style.js';
import MainViewer from './components/mainViewer.js';
import AxesViewer from './components/axesViewer.js';
import Thumbnails from './components/thumbnails.js';
import Menus from './components/menus.js';
import ChannelViewer from './components/channelViewer.js';
import SampleMesh from './components/sampleMesh.js';

import { Container, Row, Col } from 'reactstrap';

class UI extends React.Component {
  render() {
    return (
      <div className="main" style={mainStyle}>
        <Menus />
        <br></br>
        <br></br>
        <br></br>

        <Container style={container}>
          <Row style={rowStyle}>
            <Col xs="4">
              <AxesViewer />
              <Thumbnails />
            </Col>

            <Col xs="8">
              <SampleMesh />
              <MainViewer />
              <ChannelViewer />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default UI;
