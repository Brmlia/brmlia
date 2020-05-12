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

class mainTiffViewer extends Component {
  constructor(props) {
    super(props);

    this.canvas = React.createRef();
    this.state = {
      axes: ['x', 'y', 'z'],
      cntxt: null,
    };
    this.customSettings = {
      order: "0",
      channels: 0,
      slices: 0,
    }
    this.fileLength      = 0;
    this.sliceLength     = 0;
    this.channelLength   = 0;
    this.sliceIdx        = 0;
    this.slice           = 0;
    this.axisIdx         = props.axis;
    this.channel         = 1;

    // Case 1: (60 z planes, 3 channels, 1)
    // Case 2: (60 z planes, 1 channel, 3)
    // Case 3: (1 z planes, 3 channels, 60)
    // Case 4: (1 z planes, 1 channel, 180)
    // Case 5: (1 z planes, 3 channels, 180) (PNG)
    this.type = 1;
    this.typeIsDefault = true;
    this.files = props.files;
    this.order = "0";

    this.width = window.innerWidth * 0.6;
    this.height = window.innerHeight * 0.5;
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
        this.setSlider(fileLength, pageLength)
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
        this.setSlider(this.files.length, 0)
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

  setSlider(length, pageLength) {
    // if (this.props.axis === "0") this.length = width
    // if (this.props.axis === "1") this.length = height
    if (this.props.axis === "2") {
      if (this.type === 1) {
        this.sliceLength = pageLength / 3
      }
      else if (this.type === 2) {
        this.sliceLength = pageLength
      }
      else if (this.type === 3) {
        this.sliceLength = length
      }
      else if (this.type === 4) {
        this.sliceLength = length / 3
      }
      else if (this.type === 5) {
        this.sliceLength = length
      }
      else {
        this.sliceLength = pageLength
      }
      this.channelLength = 3
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

          if (file && width && height && fileLength && pageLength) {
            this.setType(files, file.metadata)
            this.setSlider(fileLength, pageLength)
            this.setVolume(files, width, height, pageLength * fileLength)
            this.updateSlice()
            this.fileLength = fileLength
            this.forceUpdate();
          }
        }
        else if (
          this.isValidPNGFile(state.file, idx)
        ) {
          this.updateFileList(state.file)
          this.drawPNG(state.file[idx].image)
          this.type = 5
          this.setSlider(files.length, 0)
          // this.fileLength = files.length
          this.forceUpdate()
        }
      }
    }
  }

  computeSlice(value) {
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
      else {
        return value
      }
    }
  }

  async scaleImage() {
    const imageData = await this.volume.getImageData()

    if (imageData) {
      const cw = this.width;
      const ch = this.height;
      const imgW = imageData.width;
      const imgH = imageData.height;

      var newC = document.createElement('canvas');
      newC.width = imgW;
      newC.height = imgH;
      newC.getContext('2d').putImageData(imageData, 0, 0);

      this.cntxt.drawImage(newC, 0, 0, cw, ch);
    }
  }

  updateSlice() {
    if (this.type < 5 && (this.slice < this.sliceLength)) {
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
    this.scaleImage()
    this.forceUpdate();
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
    this.slice = parseInt(value)
    this.sliceIdx = this.computeSlice(this.slice)
    this.updateSlice()
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
      <div className="slice-slider-container">
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
        <div> Slice: {this.slice} </div>
      </div>
    )
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
              max={this.channelLength}
              step="1"
              initial="1"
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
    volApi.subscribe(state => {
      this.updateCustomSettings();
    })
    // let width = "100%";
    // let height = "100%";
    return (
      <div style={{"color": "black", "height": "100%"}}>
        <canvas
          id="canvas-1"
          ref={this.canvas}
          width={this.width}
          height={this.height}
        ></canvas>
        <ProgressBar />
        {this.drawSliceSlider()}
        {this.drawChannelSlider()}
      </div>
    );
  }
}

export default mainTiffViewer;
