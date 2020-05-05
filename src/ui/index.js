import React from 'react';
import {
  mainStyle,
  mainMenuStyle,
  rowStyle,
  containerStyle,
} from './styles/style.js';
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
        <Container fluid style={mainMenuStyle}>
          <Row style={{ justifyContent: 'space-between' }}>
            <Col xs="auto">
              <Menus />
            </Col>
            <Col xs="auto">
              <h3
                style={{
                  color: '#fff',
                  verticalAlign: 'center',
                  padding: '15px 7px',
                }}
              >
                BRMLIA
              </h3>
            </Col>
          </Row>
        </Container>

        <Container style={containerStyle}>
          <Row style={rowStyle}>
            <Col xs="4">
              <AxesViewer />
              <Thumbnails />
            </Col>

            <Col xs="8">
              <AnnotatorViewer />
              <MainViewer />
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
