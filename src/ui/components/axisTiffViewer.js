import React, { Component } from 'react';
import ProgressBar from '../../datacube/datacubeControls.js';
import Slider from './slider.js';

import {
  fApi,
  updateChannelSlice,
  initializeVolume,
  getVolume,
} from './index.js';

class TiffViewer extends Component {
  constructor(props) {
    super(props);

    this.canvas = React.createRef();
    this.state = {
      axes: ['x', 'y', 'z'],
      cntxt: null,
    };
    this.fileLength = 0;
    this.length = 0;
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

  setSlider(width, height, length, pageLength) {
    if (this.props.axis === "0") this.length = width
    if (this.props.axis === "1") this.length = height
    if (this.props.axis === "2") {
      if (this.type === 1) {
        this.length = pageLength
      }
      else if (this.type === 2) {
        this.length = pageLength * length
      }
    }
  }

  async updateForFile(state) {
    if (state && state.file) {
      const idx = Math.max((state.file.length - 1), 0);
      const file = state.file[idx]

      if (
        this.isValidFile(state.file, idx)
      ) {
        this.parseMetadata(state.file, file.metadata)
        initializeVolume(0, this.state.cntxt, state.file, 0, this.state.axes, this.type, file.image.width, file.image.height, file.pages.length * state.file.length)
        this.setSlider(file.image.width, file.image.height, state.file.length, file.pages.length)
        if (!this.volume) {
          this.volume = getVolume(0)
        }
        this.updateSlice()
      }
    }
    this.forceUpdate();
  }

  computeSlice(value) {
    if (this.type === 1) {
      return ((value * 3) + (this.channel-1) )
    }
    else if (this.type === 2) {
      return ((value + ((this.channel-1) * this.length)))
    }
  }

  updateSlice() {
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

  nextSlice(dec) {
    var slice;
    if (dec)
      slice = this.clamp(
        parseInt(this.sliceIdx) - 1,
        0,
        Math.max(0, this.length - 1)
      );
    else
      slice = this.clamp(
        parseInt(this.sliceIdx) + 1,
        0,
        Math.max(0, this.length - 1)
      );
    this.updateSlice();
  }

  sliderValueSlice(value) {
    this.channelSliceIdx = parseInt(value)
    // this.sliceIdx = this.computeSlice(this.channelSliceIdx)
    this.sliceIdx = this.channelSliceIdx
    this.updateSlice()
  }

  nextAxis(dec) {
    var idx;
    if (dec) idx = (this.axisIdx + 2) % this.state.axes.length;
    else idx = (this.axisIdx + 1) % this.state.axes.length;
    this.axisIdx = idx
    this.updateSlice()
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
           <input type="text" value={this.sliceIdx} onChange={event => this.handleChangePageNumber(event.target.value) } />
          </label>
          <div> Slice: {this.sliceIdx} </div>
        </div>
      </div>
    );
  }
}

export default TiffViewer;
