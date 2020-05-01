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
} from './index.js';

class ImageCanvas extends React.Component {
  constructor (props) {
    super(props)
    this.files = [];
    this.canvasRef = React.createRef();
    this.state = {
      axes: ['x', 'y', 'z'],
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

    this.sliceIdx       = 22;
    this.computedSlicedIdx = 0;
    this.axisIdx        = 2;
    this.length         = 0;

    this.imgdata        = null;
    this.updatedtexture = false;
    this.volType = 0;
  }

  componentDidMount() {
    const canvas = new fabric.Canvas(this.canvasRef.current);
    const cntxt = canvas.getContext('2d');

    this.setState(prevState => ({
      cntxt: cntxt
    }));
  }

  determineType(fileLength, pageLength, channelLength) {
    var tType = 0

    if      ( (fileLength === 1) && (channelLength === 3) && (pageLength >   1) ) { tType = 1; this.volType = 1 }
    else if ( (fileLength === 3) && (channelLength === 1) && (pageLength >   1) ) { tType = 2; this.volType = 1 }
    else if ( (fileLength >   1)                          && (pageLength === 3) ) { tType = 3; this.volType = 1 }
    else if ( (fileLength >   1)                          && (pageLength === 1) ) { tType = 4; this.volType = 1 }

    if (tType !== 0) {
      this.type = tType
    }
    else {
      // invalid type
    }
    console.log("determineType() - type, file, page, channel lengths: ", tType, fileLength, pageLength, channelLength)
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

  updateLength(fileLength, pageLength) {
    if (this.type === 1) {
      this.length = pageLength/3
    }
    else if (this.type === 2 ) {
      this.length = pageLength
    }
  }

  getIdx(fileLength) {
    if (this.type === 1) {
      return Math.max((fileLength - 1), 0);
    }
    else if (this.type === 2) {
      return (parseInt(this.props.channel)-1)
    }
  }

  updateForFile(state) {
    if (filesNeedUpdate(state, this.files.length)) {
      var idx = this.getIdx(state.file.length)
      const files = state.file
      const file = files[idx]
      this.file = file
      if (
        areFilesValid(files, idx, this.fileLength)
      ) {
        this.updateFileList(files)
        this.parseMetadata(state.file, file.metadata)
        this.updateLength(files.length, file.pages.length)
        updateImage(files[state.selected], this.props.channel);
        idx = this.getIdx(state.file.length)
        initializeVolume(0, this.state.cntxt, files, idx, this.state.axes, this.volType, file.image.width, file.image.height, file.pages.length)
        updateSliceLength((parseInt(this.props.channel)+3), this.length)
        this.fileLength = this.files.length
      }
    }
    this.forceUpdate();
  }
  updateForControls(state) {
    this.forceUpdate();
  }
  updateForSlice(state) {
    const sliceIdx = state.sliceIndices[parseInt(this.props.channel)+3]
    if (this.sliceIdx !== sliceIdx) {
      this.computedSlicedIdx = this.computeSlice(parseInt(sliceIdx))
      this.updateSlice();
      this.loadTiff();
      this.forceUpdate();
      this.sliceIdx = sliceIdx
    }
  }

  computeSlice(value) {
    if (this.type === 1) {
      return ((value * 3) + (parseInt(this.props.channel)-1) )
    }
    else if (this.type === 2) {
      return (value)
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
    this.volume =  getVolume(0)
    if (this.volume) {
      this.imgdata = await this.volume.getImageData()
    }
  }

  async setTexture() {
    this.texture = generateTexture(this.imgdata.data, this.imgdata.width, this.imgdata.height)
    updateTexture(this.file, this.texture, this.props.channel)
  }

  async loadTiff() {
    this.setImageData()
    if (this.imgdata && (this.imgdata.data.length > 0) && !this.updatedtexture) {
      this.setTexture()
      this.updatedtexture = true
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
