import React, { Component } from 'react';
import ProgressBar from '../../datacube/datacubeControls.js';
import DataCube from '../../datacube/datacube.js';

import {
  fApi,
  Volume,
  loadSlices,
} from './index.js'

class mainTiffViewer extends Component {
  constructor(props) {
    super(props);

    this.canvas = React.createRef();
    this.state = {
      axes: ['x', 'y', 'z'],
      axisIdx: props.axis,
      sliceIdx: 0,
      cntxt: null,
    };
    this.fileLength = 0;
    this.length = 0;

    // 0: multifile
    // 1: multipage
    this.type = 1;

    this.cube = {
      x: 256,
      y: 256,
      z: 256,
    };
  }

  componentDidMount() {
    this.setState(prevState => ({
      cntxt: this.canvas.current.getContext('2d'),
    }));
  }

  async updateForFile(state) {
    if (state && state.file) {
      const idx = state.file.length - 1;

      if (
        state.file.length > 0 &&
        state.file[idx].pages &&
        state.file[idx].pages.length > 0 &&
        state.file.length !== this.fileLength
      ) {
        if (this.type === 0) {
          this.fileLength = this.length = state.file.length;
        } else if (this.type === 1) {
          this.fileLength = state.file.length;
          this.length = state.file[idx].pages.length;
        }

        this.cube.x = this.cube.y = this.cube.z = Math.max(256, this.length);

        this.volume = new Volume({
          channel: new DataCube({
            bytes: 1,
            size: this.cube,
            context: this.state.cntxt,
          }),
        });

        await loadSlices(
          this.state.cntxt,
          this.volume,
          this.state.axes,
          2,
          state.file,
          this.type
        );
      }
    }
    this.forceUpdate();
  }

  clamp(val, min, max) {
    return Math.min(Math.max(val, min), max);
  }

  render() {
    fApi.subscribe(state => {
      this.updateForFile(state);
    });

    let width = window.innerWidth * 0.6;
    let height = window.innerHeight * 0.6;
    return (
      <div>
        <canvas
          id="canvas-1"
          ref={this.canvas}
          width={width}
          height={height}
        ></canvas>
        <ProgressBar />
      </div>
    );
  }
}

export default mainTiffViewer;
