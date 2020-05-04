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
  filesNeedUpdate,
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
    // if (this.props.axis === "0") this.length = width
    // if (this.props.axis === "1") this.length = height
    if (this.props.axis === "2") {
      if (this.type === 1) {
        this.length = pageLength / 3
      }
      else if (this.type === 2) {
        this.length = pageLength
      }
      else if (this.type === 3) {
        this.length = length
      }
      else if (this.type === 4) {
        this.length = length / 3
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

  async refreshImage() {
    this.state.cntxt.clearRect(0, 0, this.canvas.current.width, this.canvas.current.height)
    if (!this.volume) {
      this.volume = getVolume(0)
    }
  }

  async updateForFile(state) {
    if (filesNeedUpdate(state, this.fileLength)) {
      const files = state.file
      if (state && files) {
        const idx = Math.max((files.length - 1), 0);
        if (
          this.isValidFile(state.file, idx)
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
          this.fileLength = fileLength
          this.forceUpdate();
        }
      }
    }
  }

  computeSlice(value) {
    // select every third
    if (this.type === 1) {
      return ((value * 3) + (this.channel-1) )
    }
    // select slice in [0-length) for channel 1, [length-2*length) for channel 2, [2*length-3*length) for channel 3
    else if (this.type === 2) {
      return ((value + ((this.channel-1) * this.length)))
    }
    // select every third
    else if (this.type === 3) {
      return ((value * 3) + (this.channel-1) )
    }
    // select every third
    else if (this.type === 4) {
      return ((value * 3) + (this.channel-1) )
    }
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

    // let width = window.innerWidth * 0.6;
    // let height = window.innerHeight * 0.6;
    let width = "100%";
    let height = "100%";
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
