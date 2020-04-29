import React, { Component } from 'react';

import ProgressBar from '../../datacube/datacubeControls.js';
import DataCube from '../../datacube/datacube.js';
import Slider from './slider.js';

import {
  fApi,
  Volume,
  loadSlices,
  updateChannelSlice,
  saveVolume,
  initializeVolume,
  getVolume,
} from './index.js';

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

    // Case 1: (60 z planes, 3 channels, 1)
    // Case 2: (60 z planes, 1 channel, 3)
    // Case 3: (1 z planes, 3 channels, 60)
    // Case 4: (1 z planes, 1 channel, 180)
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

  isValidFile(file, idx) {

    return (
      (file.length > 0) &&
      (file[idx]) &&
      (file[idx].pages) &&
      (file[idx].pages.length > 0) &&
      (file.length !== this.fileLength)
    )
  }

  // async initializeVolume(file, width, height, length) {
  //   this.cube.x = width
  //   this.cube.y = height
  //   this.cube.z = length

  //   this.volume = new Volume({
  //     channel: new DataCube({
  //       bytes: 1,
  //       size: this.cube,
  //       context: this.state.cntxt,
  //     }),
  //   });

  //   await loadSlices(
  //     this.state.cntxt,
  //     this.volume,
  //     this.state.axes,
  //     2,
  //     file,
  //     this.type
  //   );
  //   // saveVolume(this.props.channel, this.volume)
  // }

  setSlider() {
    if (this.props.axis === "0") this.length = this.cube.x
    if (this.props.axis === "1") this.length = this.cube.y
    if (this.props.axis === "2") this.length = this.cube.z
  }

  async updateForFile(state) {
    if (state && state.file) {
      const idx = Math.max((state.file.length - 1), 0);
      const file = state.file[idx]

      if (
        this.isValidFile(state.file, idx)
      ) {
        // this.initializeVolume(state.file, file.image.width, file.image.height, file.pages.length)
        initializeVolume(0, this.state.cntxt, state.file, this.state.axes, this.type, file.image.width, file.image.height, file.pages.length)
        this.volume = getVolume(0)
        this.slice(0)
        this.setSlider()
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
      this.state.axisIdx,
      false
    );
    this.forceUpdate();
  }

  nextSlice(dec) {
    var slice;
    if (dec)
      slice = this.clamp(
        parseInt(this.state.sliceIdx) - 1,
        0,
        Math.max(0, this.length - 1)
      );
    else
      slice = this.clamp(
        parseInt(this.state.sliceIdx) + 1,
        0,
        Math.max(0, this.length - 1)
      );
    this.slice(slice);
  }

  sliderValueSlice(value) {
    this.slice(parseInt(value));
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
      idx,
      false
    );
    this.forceUpdate();
  }

  clamp(val, min, max) {
    return Math.min(Math.max(val, min), max);
  }

  handleChangePageNumber(value) {
    this.slice(parseInt(value))
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
          // width={window.innerWidth}
          height="280"
        ></canvas>
        <ProgressBar />
        <div className="slice-slider-container">
          <Slider
            label=""
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
            id="prevSliceBtn"
            onClick={() => {
              this.nextSlice(true);
            }}
          >
            {'<<'}
          </button>
          <button
            id="resetSliceBtn"
            onClick={() => {
              this.slice(0);
            }}
          >
            Go to Slice 0
          </button>
          <button
            id="nextSliceBtn"
            onClick={() => {
              this.nextSlice(false);
            }}
          >
            {'>>'}
          </button>
          &nbsp;
          <label>
           Page #: &nbsp;
           <input type="text" value={this.state.pagenumber} onChange={event => this.handleChangePageNumber(event.target.value) } />
          </label>
          <div> Slice: {this.state.sliceIdx} </div>
        </div>
      </div>
    );
  }
}

export default TiffViewer;
