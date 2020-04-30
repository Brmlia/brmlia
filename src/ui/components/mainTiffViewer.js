import React, { Component } from 'react';
import ProgressBar from '../../datacube/datacubeControls.js';
import DataCube from '../../datacube/datacube.js';
import Slider from './slider.js';

import {
  fApi,
  Volume,
  loadSlices,
  updateChannelSlice,
  initializeVolume,
  getVolume,
} from './index.js';

class mainTiffViewer extends Component {
  constructor(props) {
    super(props);

    this.canvas = React.createRef();
    this.state = {
      axes: ['x', 'y', 'z'],
      cntxt: null,
    };
    this.fileLength      = 0;
    this.length          = 0;
    this.sliceIdx        = 0;
    this.axisIdx         = props.axis;
    this.channel         = 1;
    this.channelSliceIdx = 0;

    // Case 1: (60 z planes, 3 channels, 1)
    // Case 2: (60 z planes, 1 channel, 3)
    // Case 3: (1 z planes, 3 channels, 60)
    // Case 4: (1 z planes, 1 channel, 180)
    this.type = 1;
  }

  componentDidMount() {
    this.setState(prevState => ({
      cntxt: this.canvas.current.getContext('2d'),
    }));
  }

  determineType(fileLength, pageLength, channelLength) {
    var tType = 0

    if      ( (fileLength === 1) && (channelLength === 3) && (pageLength >   1) ) tType = 1
    else if ( (fileLength === 3) && (channelLength === 1) && (pageLength >   1) ) tType = 2
    else if ( (fileLength >   1)                          && (pageLength === 3) ) tType = 3
    else if ( (fileLength >   1)                          && (pageLength === 1) ) tType = 4

    if (tType !== 0) {
      this.type = tType
    }
    else {
      // invalid type
    }
    console.log("determineType() - type, file, page, channel lengths: ", tType, fileLength, pageLength, channelLength)
  }

  parseMetadata(file, metadata) {

    const {
      // images,
      channels,
      // slices,
    } = metadata

    const fileLength = file.length
    const pageLength = file[0].pages.length
    const channelLength = parseInt(channels || 1)
    // Case 1: (60 z planes, 3 channels, 1)
    //   images = 180
    //   channels = 3
    //   slices = 60
    //   hyperstack = true
    //   pages = 180
    // Case 2: (60 z planes, 1 channel, 3)
    //   images = 60
    //   channels = n/a
    //   slices = 60
    //   hyperstack = n/a
    //   pages = 60
    // Case 3: (1 z planes, 3 channels, 60)
    //   images = 3
    //   channels = n/a
    //   slices = 3
    //   hyperstack = n/a
    //   pages = 3
    // Case 4: (1 z planes, 1 channel, 180)
    //   pages = 1
    //   n/a

    this.determineType(fileLength, pageLength, channelLength)
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

  setTiffParams(file, pages) {
    if (this.type === 0) {
      this.fileLength = this.length = file.length;
    } else if (this.type === 1) {
      this.fileLength = file.length;
      this.length = pages.length;
    }
  }

  setSlider(width, height, length) {
    // if (this.props.axis === "0") this.length = width
    // if (this.props.axis === "1") this.length = height
    if (this.props.axis === "2") this.length = length / 3
  }

  async refreshImage() {
    this.state.cntxt.clearRect(0, 0, this.canvas.current.width, this.canvas.current.height)
    this.volume = getVolume(this.axisIdx)
  }

  async updateForFile(state) {
    if (state && state.file) {
      const idx = Math.max((state.file.length - 1), 0);
      const file = state.file[idx]

      if (
        this.isValidFile(state.file, idx)
      ) {
        this.parseMetadata(state.file, file.metadata)
        this.setTiffParams(state.file, file.pages)
        initializeVolume(0, this.state.cntxt, state.file, this.state.axes, this.type, file.image.width, file.image.height, file.pages.length)
        initializeVolume(1, this.state.cntxt, state.file, this.state.axes, this.type, file.image.width, file.image.height, file.pages.length)
        initializeVolume(2, this.state.cntxt, state.file, this.state.axes, this.type, file.image.width, file.image.height, file.pages.length)
        this.setSlider(file.image.width, file.image.height, file.pages.length)
        this.volume = getVolume(this.axisIdx)
        this.updateSlice()
      }
    }
    this.forceUpdate();
  }

  computeSlice(value) {
    return ((value * 3) + (this.channel-1) )
  }

  updateSlice() {
    this.refreshImage();
    updateChannelSlice(
      this.state.cntxt,
      this.volume,
      this.sliceIdx,
      this.state.axes,
      this.axisIdx,
      false
    );
    this.forceUpdate();
  }

  sliderValueSlice(value) {
    this.channelSliceIdx = parseInt(value)
    this.sliceIdx = this.computeSlice(this.channelSliceIdx)
    this.updateSlice()
  }

  sliderValueAxis(value) {
    this.axisIdx = value
    this.updateSlice()
  }

  sliderValueChannel(value) {
    this.channel = parseInt(value)
    this.sliceIdx = this.computeSlice(this.channelSliceIdx)
    this.updateSlice()
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
        </div>
        <div> Slice: {this.channelSliceIdx} </div>
        <div className="channel-slider-container">
          <Slider
            label=""
            width="40%"
            min="1"
            max="3"
            step="1"
            initial="0"
            multiplier="1"
            raw="1"
            sliderValue={this.sliderValueChannel.bind(this)}
          />
        </div>
        <div> Channel: {this.channel} </div>
      </div>
    );
  }
}

export default mainTiffViewer;
