import React from 'react';
import { Container, Navbar, Button, NavbarToggler, Collapse } from 'reactstrap';
import {
  contentStyle,
} from './index.js';


class NavBar extends React.Component {

  handleAxisSbClick () {
    this.props.toggleAxisSidebar()
  }

  handleChSbClick () {
    this.props.toggleChannelSidebar()
  }

  handleMainSbClick () {
    this.props.toggleMainSidebar()
  }

  render() {
    return (
      <Container fluid style={contentStyle}>
        <Navbar color="light" light className="navbar shadow-sm p-3 mb-5 bg-white rounded" expand="md">
          <Button color="info" onClick={() => this.handleAxisSbClick()}>
            Axes
          </Button>
          <NavbarToggler onClick={() => this.handleAxisSbClick()} />
          <Collapse isOpen={true} navbar>
          </Collapse>

          <Button color="info" onClick={() => this.handleMainSbClick()}>
            Main View
          </Button>
          <NavbarToggler onClick={() => this.handleMainSbClick()} />
          <Collapse isOpen={true} navbar>
          </Collapse>

          <div align="right">
            <Button color="info" onClick={() => this.handleChSbClick()}>
              Channels
            </Button>
            <NavbarToggler onClick={() => this.handleChSbClick()} />
            <Collapse isOpen={true} navbar>
            </Collapse>
          </div>
        </Navbar>
      </Container>
    );
  }
}

export default NavBar
