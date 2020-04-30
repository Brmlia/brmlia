import React, { Component } from 'react';
import ProgressBar from '../../datacube/datacubeControls.js';
import DataCube from '../../datacube/datacube.js';
import Slider from './slider.js';

import {
  fApi,
  Volume,
  loadSlices,
  updateChannelSlice,
} from './index.js'

class mainTiffViewer extends Component {
  constructor(props) {
    super(props);

    this.canvas = React.createRef();
    this.state = {
      axes: ['x', 'y', 'z'],
      axisIdx: props.axis,
      sliceIdx: 0,
      channel: 1,
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

  isValidFile(file, idx) {

    return (
      (file.length > 0) &&
      (file[idx]) &&
      (file[idx].pages) &&
      (file[idx].pages.length > 0) &&
      (file.length !== this.fileLength)
    )
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

  setTiffParams(file, pages) {
        if (this.type === 0) {
      this.fileLength = this.length = file.length;
        } else if (this.type === 1) {
      this.fileLength = file.length;
      this.length = pages.length;
    }
        }

  async initializeVolume(file, width, height, length) {
    this.cube.x = width
    this.cube.y = height
    this.cube.z = length

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
      file,
      this.type
    );
  }

  updateForFile(state) {
    if (state && state.file) {
      const idx = Math.max((state.file.length - 1), 0);
      const file = state.file[idx]
      if (
        this.isValidFile(state.file, idx)
      ) {
        this.parseMetadata(state.file, file.metadata)
        this.setTiffParams(state.file, file.pages)
        this.initializeVolume(state.file, file.image.width, file.image.height, file.pages.length)
      }
    }
    this.forceUpdate();
  }

  clamp(val, min, max) {
    return Math.min(Math.max(val, min), max);
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

  sliderValueAxis(value) {
    this.setState(prevState => ({
      ...prevState,
      axisIdx: value
    }))
  }

  sliderValueChannel(value) {
    this.setState(prevState => ({
      ...prevState,
      channel: value
    }))
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
        <div> Slice: {this.state.sliceIdx} </div>
        <div className="axis-slider-container">
          <Slider
            label=""
            width="40%"
            min="0"
            max="2"
            step="1"
            initial="0"
            multiplier="1"
            raw="1"
            sliderValue={this.sliderValueAxis.bind(this)}
          />
        </div>
        <div> Axis: {this.state.axisIdx} </div>
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
        <div> Channel: {this.state.channel} </div>
      </div>
    );
  }
}

export default mainTiffViewer;
