import React, { Component } from 'react';
import { withFileStore } from '../utils/index.js';
import '../styles.css';

import Zpp from '../ui/components/zoom/zpp.js';
import Zoom from '../ui/components/zoom/zoom.js';
import { useZoomApi } from '../ui/components/zoom/zoomSettings.js';

class Viewer extends Component {
  state = {
    image: this.props.api.getState().file[this.props.api.getState().selected]
      .image,
    zoom: 0,
  };

  render() {
    this.props.api.subscribe(state => {
      this.setState({
        image: state.file[state.selected].image,
      });
      this.forceUpdate();
    });
    useZoomApi.subscribe(state => {
      const zoom = state.views[this.props.type].zoomPct;
      const zppZoom = state.views[this.props.type].zoomZppPct;

      if (
        (this.state.zoom !== zoom || this.state.zoom !== zppZoom) &&
        this.props.type === state.last
      ) {
        this.setState(prevState => ({
          zoom: zoom,
        }));
      }
    });

    return (
      <div className="viewer-wrapper">
        <Zpp
          type={this.props.type}
          img={this.state.image}
          imageWidth={this.props.imageWidth}
        />
        <Zoom type={this.props.type} />
      </div>
    );
  }
}

export default withFileStore(Viewer);
