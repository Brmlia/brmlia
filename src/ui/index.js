import React from 'react';
import { mainStyle, containerStyle } from './styles/style.js';
import Menus from './components/menus.js';
import SideBars from './components/sidebar/sideBars.js';

import { Container } from 'reactstrap';

class UI extends React.Component {
  render() {
    return (
      <div className="main" style={mainStyle}>
        <br />
        <h2 align="center"> BRMLIA </h2>
        <Container style={containerStyle}>
          <Menus />
          <SideBars />
        </Container>
      </div>
    );
  }
}

export default UI;
