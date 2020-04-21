import React, { Component } from 'react';
import { fApi } from '../../utils/index.js';
import { Volume } from '../../datacube/volume.js';
import ProgressBar, {
  loadSlices,
  updateChannelSlice,
} from '../../datacube/datacubeControls.js';
import DataCube from '../../datacube/datacube.js';
import Slider from './slider.js';

class TiffViewer extends Component {
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
          this.state.axisIdx,
          state.file,
          this.type
        );
      }
    }
    this.forceUpdate();
  }

  slice(value) {
    this.setState(prevState => ({
      ...prevState,
      sliceIdx: value,
    }));
    updateChannelSlice(
      this.state.cntxt,
      this.volume,
      value,
      this.state.axes,
      this.state.axisIdx
    );
    this.forceUpdate();
  }

  nextSlice(dec) {
    var slice;
    if (dec)
      slice = this.clamp(
        this.state.sliceIdx - 1,
        0,
        Math.max(0, this.length - 1)
      );
    else
      slice = this.clamp(
        this.state.sliceIdx + 1,
        0,
        Math.max(0, this.length - 1)
      );
    this.slice(slice);
  }

  sliderValueSlice(value) {
    this.slice(value);
  }

  nextAxis(dec) {
    var idx;
    if (dec) idx = (this.state.axisIdx + 2) % this.state.axes.length;
    else idx = (this.state.axisIdx + 1) % this.state.axes.length;

    this.setState(prevState => ({
      ...prevState,
      axisIdx: idx,
    }));
    updateChannelSlice(
      this.state.cntxt,
      this.volume,
      this.state.sliceIdx,
      this.state.axes,
      idx
    );
    this.forceUpdate();
  }

  clamp(val, min, max) {
    return Math.min(Math.max(val, min), max);
  }

  render() {
    fApi.subscribe(state => {
      this.updateForFile(state);
    });
    return (
      <div>
        <canvas
          id="canvas-1"
          ref={this.canvas}
          width="100%"
          height="100%"
        ></canvas>
        <ProgressBar />
        <div className="slice-slider-container">
          <Slider
            label="slice"
            width="40%"
            min="0"
            max={Math.max(this.length - 1, 0)}
            step="1"
            initial="0"
            multiplier="1"
            raw="1"
            sliderValue={this.sliderValueSlice.bind(this)}
          />
          <button
            id="resetSliceBtn"
            onClick={() => {
              this.slice(0);
            }}
          >
            Slice 0
          </button>
        </div>
      </div>
    );
  }
}

export default TiffViewer;
