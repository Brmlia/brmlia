import React, { Component } from 'react';
import ProgressBar from '../../datacube/datacubeControls.js';
import Slider from './slider.js';

import {
  fApi,
  volApi,
  updateChannelSlice,
  initializeVolume,
  getVolume,
  updateType,
  parseMetadata,
  filesNeedUpdate,
  getImageProps,
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
    this.sliceIdx = 0;
    this.axisIdx = props.axis;
    this.channel = 1;

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
      file.length > 0 &&
      file[idx] &&
      file[idx].pages &&
      file[idx].pages.length > 0 &&
      file.length !== this.fileLength
    );
  }

  setSlider(width, height, length, pageLength) {
    if (this.props.axis === '0') this.sliceLength = width;
    if (this.props.axis === '1') this.sliceLength = height;
    if (this.props.axis === '2') {
      if (this.type === 1) {
        this.sliceLength = pageLength / 3
        this.channelLength = 3
      } else if (this.type === 2) {
        this.sliceLength = pageLength
        this.channelLength = 1
      } else if (this.type === 3) {
        this.sliceLength = length
        this.channelLength = 3
      } else if (this.type === 4) {
        this.sliceLength = length / 3
        this.channelLength = 1
      }
    }
  }

  setVolume(files, width, height, length) {
    initializeVolume(
      0,
      this.state.cntxt,
      files,
      0,
      this.state.axes,
      this.type,
      width,
      height,
      length
    );
    if (!this.volume) {
      this.volume = getVolume(0);
    }
  }

  setType(files, metadata) {
    if (this.typeIsDefault) {
      this.type = parseMetadata(files, metadata);
      updateType(this.type);
      this.typeIsDefault = false;
    }
  }

  async updateForFile(state) {
    if (filesNeedUpdate(state, this.fileLength)) {
      const files = state.file;
      if (state && files) {
        const idx = Math.max(files.length - 1, 0);
        if (this.isValidFile(files, idx)) {
          const file = files[idx];
          const width = file.image.width;
          const height = file.image.height;
          const fileLength = files.length;
          const pageLength = file.pages.length;
          this.setType(files, file.metadata);
          this.setSlider(width, height, fileLength, pageLength);
          this.setVolume(files, width, height, pageLength * fileLength);
          this.updateSlice();
          this.fileLength = fileLength;
          this.forceUpdate();
        }
      }
    }
  }

  computeSlice(value) {
    if (this.props.axis === '2') {
      // xycz
      if (this.order === "1") {
        return ((value * this.channelLength) + (this.channel-1) )
      }
      // xyzc
      else if (this.order === "2") {
        return ((value + ((this.channel-1) * this.sliceLength)))
      }
      else {
        // select every third
        if (this.type === 1) {
          return ((value * 3) + (this.channel-1) )
        }
        // select slice in [0-length) for channel 1, [length-2*length) for channel 2, [2*length-3*length) for channel 3
        else if (this.type === 2) {
          return ((value + ((this.channel-1) * this.sliceLength)))
        }
        // select every third
        else if (this.type === 3) {
          return ((value * 3) + (this.channel-1) )
        }
        // select every third
        else if (this.type === 4) {
          return ((value * 3) + (this.channel-1) )
        }
        else if (this.type === 5) {
          return value
        }
      }
    }
    else {
      return value
    }
  }

  async updateSlice() {
    await updateChannelSlice(
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

  updateCustomSettings() {
    this.customSettings = getImageProps()

    if (this.customSettings.order !== 0) {
      this.order = this.customSettings.order
      this.channelLength = this.customSettings.channels
      this.sliceLength = this.customSettings.slices
      this.channel = 1
      this.slice = 0
      this.forceUpdate()
    }
  }

  sliderValueSlice(value) {
    this.slice = parseInt(value || 0);
    this.sliceIdx = this.computeSlice(this.slice)
    this.updateSlice();
  }

  sliderValueChannel(value) {
    this.channel = parseInt(value)
    this.sliceIdx = this.computeSlice(this.slice)
    this.updateSlice()
  }

  clamp(val, min, max) {
    return Math.min(Math.max(val, min), max);
  }

  drawSliceSlider() {
    return (
      <div className="axis-slice-slider-container">
        <Slider
          label=""
          width="40%"
          min="0"
          max={Math.max(this.sliceLength - 1, 0)}
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
          Slice #: &nbsp;
          <input
            type="text"
            style={{ width: '30px' }}
            value={this.slice}
            onChange={event => this.sliderValueSlice(event.target.value)}
          />
        </label>
      </div>
    )
  }

  drawChannelInput() {
    return (
      <label>
        Channel #: &nbsp;
        <input
          type="text"
          style={{ width: '30px' }}
          value={this.channel}
          onChange={event => this.sliderValueChannel(event.target.value)}
        />
      </label>
    )
  }

  render() {
    fApi.subscribe(state => {
      this.updateForFile(state);
    });
    volApi.subscribe(state => {
      this.updateCustomSettings();
    })

    return (
      <div>
        <canvas
          id="canvas-1"
          ref={this.canvas}
          // width={window.innerWidth}
          height="280"
        ></canvas>
        <ProgressBar />
        {this.drawSliceSlider()}
        {this.props.axis === '2' && this.drawChannelInput()}
      </div>
    );
  }
}

export default TiffViewer;
