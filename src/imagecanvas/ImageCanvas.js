import React from 'react';
import { fabric } from 'fabric';

import {
  fApi,
  uApi,
  canvasApi,
  volApi,
  updateImage,
  updateTexture,
  getVolume,
  generateTexture,
  filesNeedUpdate,
  areFilesValid,
  initializeVolume,
  updateChannelSlice,
  updateSliceLength,
  updateType,
  parseMetadata,
  getImageProps,
} from './index.js';

class ImageCanvas extends React.Component {
  constructor (props) {
    super(props)
    this.files = [];
    this.canvasRef = React.createRef();
    this.state = {
      axes: ['x', 'y', 'z'],
    }
    this.customSettings = {
      order: "0",
      channels: 0,
      slices: 0,
    }
    this.init()
  }

  init() {
    this.setState(prevState => ({
      ...prevState,
      cntxt: null,
      // rgb: 0 (red), 1 (green), 2 (blue)
      rgb: 0,
    }))
    this.fileLength = 0;

    // Case 1: (60 z planes, 3 channels, 1)
    // Case 2: (60 z planes, 1 channel, 3)
    // Case 3: (1 z planes, 3 channels, 60)
    // Case 4: (1 z planes, 1 channel, 180)
    // Case 5: (1 z planes, 3 channels, 180) (PNG)
    this.type = 1;
    this.typeIsDefault = true;

    this.sliceIdx       = 0;
    this.computedSlicedIdx = 0;
    this.axisIdx        = 2;
    this.length         = 0;

    this.imgdata        = null;
    this.updatedtexture = true;
    this.volType = 0;
    this.texture = null;
  }

  componentDidMount() {
    const canvas = new fabric.Canvas(this.canvasRef.current);
    const cntxt = canvas.getContext('2d');

    this.setState(prevState => ({
      cntxt: cntxt
    }));
  }

  updateFileList(files) {
    const tiffFiles = files.filter(file => file.type === "image/tiff")
    for (var i = this.files.length; i < tiffFiles.length; i++) {
      const idx = tiffFiles.length - 1
      const file = tiffFiles[idx]

      const newFile = {
        rgba: file.rgba,
        width: file.image.width,
        height: file.image.height,
        length: file.pages.length,
        page: file.pages[0],
        name: file.name,
        type: file.type
      }

      this.files.push(newFile)
    }
    const pngFiles = files.filter(file => file.type === "image/png")
    for (var j = this.files.length; j < pngFiles.length; j++) {
      this.files.push(pngFiles[j])
    }
  }

  updateLength(fileLength, pageLength) {
    if (this.type === 1) {
      this.length = pageLength/3
    }
    else if (this.type === 2 ) {
      this.length = pageLength
    }
    else if (this.type === 3) {
      this.length = fileLength
    }
    else if (this.type === 4) {
      this.length = fileLength / 3
    }
    else if (this.type === 5) {
      this.length = fileLength
    }
  }

  getIdx(fileLength) {
    if (this.type === 1) {
      return Math.max((fileLength - 1), 0);
    }
    else if (this.type === 2) {
      return (parseInt(this.props.channel)-1)
    }
    else if (this.type === 3) {
      return Math.max((fileLength - 1), 0);
    }
    else if (this.type === 4) {
      return Math.max((fileLength - 1), 0);
    }
    else if (this.type === 5) {
      return Math.max((fileLength - 1), 0);
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

  isValidPNGFile(file, idx) {
    return (
      (file.length > 0) &&
      (file[idx]) &&
      (file.length !== this.fileLength) &&
      (file[idx].type === 'image/png')
    )
  }

  updateForFile(state) {
    if (filesNeedUpdate(state, this.files.length)) {
      var idx = this.getIdx(state.file.length)
      const files = state.file
      if (
        areFilesValid(files, idx, this.fileLength)
      ) {
        const file = files[idx]
        const width = file.image.width
        const height = file.image.height
        const fileLength = files.length
        const pageLength = file.pages.length

        this.updateFileList(files)
        this.setType(files, file.metadata)
        this.updateLength(fileLength, pageLength)
        this.setVolume(files, width, height, pageLength)
        this.fileLength = this.files.length
        this.file = file

        updateImage(files[state.selected], this.props.channel);
        updateSliceLength((parseInt(this.props.channel)+3), this.length)
      }
      else if (
        this.isValidPNGFile(files, idx)
      ) {
        this.updateFileList(files)
        this.type = 5
        this.updateLength(files.length, 0)

        updateImage(this.files[this.sliceIdx], this.props.channel);
        updateSliceLength((parseInt(this.props.channel)+3), this.length)
      }
    }
    this.forceUpdate();
  }
  updateForControls(state) {
    const texture = state.channels[this.props.channel-1].uniforms.image.value
    if (texture && (this.texture !== texture)) {
      this.texture = texture;
      this.forceUpdate();
    }
  }
  updateForSlice(state) {
    if (state) {
      this.updateCustomSettings()
      const sliceIdx = state.sliceIndices[parseInt(this.props.channel)+3]
      if (this.sliceIdx !== sliceIdx) {
        this.computedSlicedIdx = this.computeSlice(parseInt(sliceIdx))

        if (this.type < 5) {
          this.updateSlice();
          this.loadTiff();
        }
        else if (this.type === 5) {
          updateImage(this.files[parseInt(sliceIdx)], this.props.channel);
        }
        this.forceUpdate();
        this.sliceIdx = sliceIdx
      }
    }
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

  computeSlice(value) {
    if (this.type === 1) {
      return ((value * 3) + (parseInt(this.props.channel)-1) )
    }
    else if (this.type === 2) {
      return ((value + ((parseInt(this.props.channel)-1) * this.length)))
    }
    else if (this.type === 3) {
      return ((value * 3) + (parseInt(this.props.channel)-1) )
    }
    else if (this.type === 4) {
      return ((value * 3) + (parseInt(this.props.channel)-1) )
    }
    else if (this.type === 5) {
      return value
    }
  }

  updateSlice() {
    updateChannelSlice(
      this.state.cntxt,
      this.volume,
      this.computedSlicedIdx,
      this.state.axes,
      this.axisIdx,
      true
    );
    this.updatedtexture = false;
    this.forceUpdate();
  }

  async setImageData() {
    if (!this.volume) {
      this.volume = getVolume(0)
    }
    if (this.volume) {
      this.imgdata = await this.volume.getImageData()
    }
  }

  async setTexture() {
    this.texture = generateTexture(this.imgdata.data, this.imgdata.width, this.imgdata.height)
    updateTexture(this.file, this.texture, this.props.channel)
  }

  async loadTiff() {
    if (!this.updatedtexture) {
      this.setImageData()
      if (this.imgdata && (this.imgdata.data.length > 0)) {
        this.setTexture()
        this.updatedtexture = true
      }
    }
  }

  displayCanvas() {
    this.loadTiff()
    return canvasApi.getState().canvas[this.props.channel - 1]
  }

  render() {
    fApi.subscribe(state => {
      this.updateForFile(state);
      this.forceUpdate()
    });
    uApi.subscribe(state => {
      this.updateForControls(state);
    });
    volApi.subscribe(state => {
      this.updateForSlice(state);
    });

    return (
      this.displayCanvas()
    )
  }
}

export default ImageCanvas;
