import React from 'react';
import { mainStyle, rowStyle, containerStyle } from './styles/style.js';
import MainViewer from './components/mainViewer.js';
import AxesViewer from './components/axesViewer.js';
import AnnotatorViewer from './components/annotatorViewer.js';
import Thumbnails from './components/thumbnails.js';
import Menus from './components/menus.js';
import Annotator from './../annotator/annotator.js';
import ChannelViewer from './components/channelViewer.js';

import { Container, Row, Col } from 'reactstrap';

class UI extends React.Component {
  render() {
    return (
      <div className="main" style={mainStyle}>
        <Menus />
        <br></br>
        <br></br>
        <br></br>

        <Container style={containerStyle}>
          <Row style={rowStyle}>
            <Col xs="4">
              <AxesViewer />
              <Thumbnails />
            </Col>

            <Col xs="8">
              <MainViewer />
              <AnnotatorViewer />
              <ChannelViewer />
            </Col>
          </Row>
        </Container>
        <Annotator />
      </div>
    );
  }
}

export default UI;
