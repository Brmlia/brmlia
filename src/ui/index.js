import React from "react";
import { mainStyle, rowStyle, container } from './style.js';
import MainViewer from "./components/mainViewer.js";
import AxesViewer from "./components/axesViewer.js";
import AnnotatorViewer from "./components/annotatorViewer.js";
import Thumbnails from "./components/thumbnails.js";
import Menus from "./components/menus.js";

import {
  Container,
  Row,
  Col,
} from 'reactstrap';

class UI extends React.Component {
  render() {
    return (
      <div className="main" style={mainStyle}>
        <Menus />
        <br>
        </br>
        <br>
        </br>
        <br>
        </br>

        <Container style={container}>
          <Row style={rowStyle}>
            <Col xs="3">
              <AxesViewer />
            </Col>

            <Col xs="6">
            <div id="testDiv"></div>
              <MainViewer />
            </Col>

            <Col xs="3">
              <AnnotatorViewer />
              <Thumbnails />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default UI;
