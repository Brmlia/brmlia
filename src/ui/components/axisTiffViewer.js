import React, { Component } from 'react';
import ProgressBar from '../../datacube/datacubeControls.js';
import Slider from './slider.js';

import {
  fApi,
  updateChannelSlice,
  initializeVolume,
  getVolume,
  updateType,
  parseMetadata,
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
    this.typeIsDefault = true;
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

  setVolume(files, width, height, length) {
    initializeVolume(0, this.state.cntxt, files, 0, this.state.axes, this.type, width, height, length)
    if (!this.volume) {
      this.volume = getVolume(0)
    }
  }

  setType(files, metadata) {
    if (this.typeIsDefault) {
      this.type = parseMetadata(files, metadata)
      updateType(this.type)
      this.typeIsDefault = false
    }
  }

  async updateForFile(state) {
    const files = state.file
    if (state && files) {
      const idx = Math.max((files.length - 1), 0);
      if (
        this.isValidFile(files, idx)
      ) {
        const file = files[idx]
        const width = file.image.width
        const height = file.image.height
        const fileLength = files.length
        const pageLength = file.pages.length
        this.setType(files, file.metadata)
        this.setSlider(width, height, fileLength, pageLength)
        this.setVolume(files, width, height, pageLength * fileLength)
        this.updateSlice()
      }
    }
    this.forceUpdate();
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
    if (dec)
      this.sliceIdx = this.clamp(
        parseInt(this.sliceIdx) - 1,
        0,
        Math.max(0, this.length - 1)
      );
    else
      this.sliceIdx = this.clamp(
        parseInt(this.sliceIdx) + 1,
        0,
        Math.max(0, this.length - 1)
      );
    this.updateSlice();
  }

  sliderValueSlice(value) {
    this.sliceIdx = parseInt(value || 0)
    this.updateSlice()
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
           <input type="text" value={this.sliceIdx} onChange={event => this.sliderValueSlice(event.target.value) } />
          </label>
          <div> Slice: {this.sliceIdx} </div>
        </div>
      </div>
    );
  }
}

export default TiffViewer;
