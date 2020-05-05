import React from 'react';
import { mainStyle, rowStyle, containerStyle } from './styles/style.js';
import MainViewer from './components/mainViewer.js';
import AxesViewer from './components/axesViewer.js';
import AnnotatorViewer from './components/annotatorViewer.js';
import Thumbnails from './components/thumbnails.js';
import Menus from './components/menus.js';
import Annotator from './../annotator/annotator.js';
import ChannelViewer from './components/channelViewer.js';
import SideBars from './components/sidebar/sideBars.js';

import { Container, Row, Col } from 'reactstrap';

class UI extends React.Component {
  render() {
    return (
      <div className="main" style={mainStyle}>
        <h2 align="center"> BRMLIA </h2>
        <Menus />
        <br></br>
        <br></br>
        <br></br>

        <Container style={containerStyle}>
          <SideBars />
          <Row style={rowStyle}>
            <Col xs="4">
              {/*<Thumbnails /> */}
            </Col>

            <Col xs="8">
              {/*<AnnotatorViewer />*/}
              <br />
              {/*<MainViewer />*/}
            </Col>
          </Row>
        </Container>
        <Annotator />
      </div>
    );
  }
}

export default UI;
