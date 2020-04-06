import React, { Component } from 'react';
import { withFileStore } from '../utils/index.js';
import '../styles.css';

import Zpp from '../ui/components/zoom/zpp.js';
import Zoom from '../ui/components/zoom/zoom.js';
import { useZoomApi } from '../ui/components/zoom/zoomSettings.js';
import { settingsApi } from '../mainSettings.js';

class Viewer extends Component {
  state = {
    image: '',
    zoom: 0,
  };

  init() {
    if (this.state.image === '') {
      if (this.props.api.getState().file.length > 0) {
        this.setState({
          image: this.props.api.getState().file[
            this.props.api.getState().selected
          ].image,
        });
      }
    }
  }

  render() {
    this.init();
    this.props.api.subscribe(state => {
      if (state) {
        const img = state.file[state.selected].image;
        if (img) {
          this.setState({
            image: img,
          });
          this.forceUpdate();
        }
      }
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
