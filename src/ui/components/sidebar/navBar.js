import React, { useState } from 'react';
import { Container, Navbar, Button, NavbarToggler, Collapse } from 'reactstrap';
import {
  contentStyle,
} from './index.js';


class NavBar extends React.Component {

  handleClick () {
    this.props.toggle()
  }

  render() {
    return (
      <Container fluid style={contentStyle}>
        <Navbar color="light" light className="navbar shadow-sm p-3 mb-5 bg-white rounded" expand="md">
          <Button color="info" onClick={() => this.handleClick()}>
            Axes
          </Button>
          <NavbarToggler onClick={() => this.handleClick()} />
          <Collapse isOpen={true} navbar>
          </Collapse>
        </Navbar>
      </Container>
    );
  }
}

export default NavBar
