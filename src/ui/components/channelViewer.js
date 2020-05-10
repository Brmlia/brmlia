import React from 'react';
import { Card, CardTitle, CardBody, Nav, NavLink, NavItem, TabPane, TabContent } from 'reactstrap';

import Channel from './channel.js';

import {
  channelCardStyle,
  channelCardBodyStyle,
  volApi,
} from './index.js';

class ChannelViewer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: "1",
      channels: 3
    }
  }

  toggle(tab) {
    this.setState({
      active: tab
    })
  }

  navs() {
    var navs = []
    for (var i = 0; i < this.state.channels; i++) {
      const idxStr = (i+1).toString()
      navs.push(
        <NavItem>
          <NavLink
            active={this.state.active === idxStr}
            onClick={() => { this.toggle(idxStr) }}
          >
          Channel {idxStr}
          </NavLink>
        </NavItem>
      )
    }
    return navs
  }

  content() {
    var contents = []
    for (var i = 0; i < this.state.channels; i++) {
      const idxStr = (i+1).toString()
      contents.push(
        <TabPane tabId={idxStr}>
          <Card style={channelCardStyle}>
            <CardBody style={channelCardBodyStyle}>
              <CardTitle>
                {' '}
                <h5> Channel {idxStr} </h5>{' '}
              </CardTitle>
              <Channel ch={idxStr} />
            </CardBody>
          </Card>
        </TabPane>
      )
    }
    return contents
  }

  updateCustomSettings(channels) {
    this.setState(prevState => ({
      ...prevState,
      channels: channels,
    }))
  }

  render() {
    volApi.subscribe(state => {
      this.updateCustomSettings(state.channels);
    })
    return (
      <div className="annotations-channel">
        <Nav tabs style={{color: "white"}}>
          {this.navs()}
        </Nav>
        <TabContent activeTab={this.state.active}>
          {this.content()}
        </TabContent>
      </div>
    );
  }
}

export default ChannelViewer;
