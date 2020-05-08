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
    // Case 5: (1 z planes, 3 channels, 180) (PNG)
    this.type = 1;
    this.typeIsDefault = true;
    this.files = props.files;
  }

  componentDidMount() {
    this.cntxt = this.canvas.current.getContext('2d')

    if (this.files) {
      const idx = Math.max((this.files.length - 1), 0);
      if (
        this.isValidTiffFile(this.files, idx)
      ) {
        const file = this.files[idx]
        const width = file.image.width
        const height = file.image.height
        const fileLength = this.files.length
        const pageLength = file.pages.length

        this.setType(this.files, file.metadata)
        this.setSlider(width, height, fileLength, pageLength)
        this.setVolume(this.files, width, height, pageLength * fileLength)
        this.updateSlice()
        this.fileLength = fileLength
        this.forceUpdate();
      }
      else if (
        this.isValidPNGFile(this.files, idx)
      ) {
        this.updateFileList(this.files)
        this.drawPNG(this.files[idx].image)
        this.type = 5
        this.setSlider(0, 0, this.files.length, 0)
        // this.fileLength = files.length
        this.forceUpdate()
      }
    }
  }

  isValidTiffFile(file, idx) {

    return (
      (file.length > 0) &&
      (file[idx]) &&
      (file[idx].pages) &&
      (file[idx].pages.length > 0) &&
      (file.length !== this.fileLength)
    )
  }

  isValidPNGFile(file, idx) {
    return (
      (file.length > 0) &&
      (file[idx]) &&
      (file.length !== this.fileLength) &&
      (file[idx].type === 'image/png')
    )
  }

  drawPNG(src) {
    var image = new Image()
    image.src = src
    this.cntxt.drawImage(image, 0, 0)
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
      else if (this.type === 5) {
        this.length = length
      }
    }
  }

  setVolume(files, width, height, length) {
    initializeVolume(0, this.cntxt, files, 0, this.state.axes, this.type, width, height, length)
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
    this.cntxt.clearRect(0, 0, this.canvas.current.width, this.canvas.current.height)
    if (!this.volume) {
      this.volume = getVolume(0)
    }
  }

  updateFileList(files) {
    const pngFiles = files.filter(file => file.type === "image/png")
    for (var i = this.files.length; i < pngFiles.length; i++) {
      this.files.push(pngFiles[i])
    }
  }

  async updateForFile(state) {
    if (filesNeedUpdate(state, this.fileLength)) {
      const files = state.file
      if (state && files) {
        const idx = Math.max((files.length - 1), 0);
        if (
          this.isValidTiffFile(state.file, idx)
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
        else if (
          this.isValidPNGFile(state.file, idx)
        ) {
          this.updateFileList(state.file)
          this.drawPNG(state.file[idx].image)
          this.type = 5
          this.setSlider(0, 0, files.length, 0)
          // this.fileLength = files.length
          this.forceUpdate()
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
    else if (this.type === 5) {
      return value
    }
  }

  updateSlice() {
    if (this.type < 5 ) {
      this.refreshImage();
      updateChannelSlice(
        this.cntxt,
        this.volume,
        this.sliceIdx,
        this.state.axes,
        this.axisIdx,
        false
      );
    }
    else if (this.type === 5) {
      this.drawPNG(this.files[this.sliceIdx].image)
    }
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

  drawChannelSlider() {
    if (this.type < 5 ) {
      return (
        <div>
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
            <div> Channel: {this.channel} </div>
          </div>
        </div>
      )
    }
    else if (this.type === 5) {
      return (
        <div>
        </div>
      )
    }
  }

  render() {
    fApi.subscribe(state => {
      this.updateForFile(state);
    });

    let width = window.innerWidth * 1.0;
    let height = window.innerHeight * 0.5;
    // let width = "100%";
    // let height = "100%";
    return (
      <div style={{"color": "black", "height": "100%"}}>
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
          <div> Slice: {this.channelSliceIdx} </div>
        </div>
        {this.drawChannelSlider()}
      </div>
    );
  }
}

export default mainTiffViewer;
