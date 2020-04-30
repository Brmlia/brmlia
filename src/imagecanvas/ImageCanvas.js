import React from 'react';
import { fabric } from 'fabric';

import {
  fApi,
  uApi,
  updateImage,
  updateTexture,
  getVolume,
  generateTexture,
  filesNeedUpdate,
  areFilesValid,
  initializeVolume,
  updateChannelSlice,
} from './index.js'

import {
  canvasApi,
} from './canvasStore.js';

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
      axisIdx: 0,
      sliceIdx: 23,
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

    this.imgdata = null;
    this.updatedtexture = false;
  }

  componentDidMount() {
    const canvas = new fabric.Canvas(this.canvasRef.current);
    const cntxt = canvas.getContext('2d');

    this.setState(prevState => ({
      cntxt: cntxt
    }));
  }

  async setImageData() {
    this.volume =  getVolume(parseInt(this.props.channel)+3)
    if (this.volume) {
      this.imgdata = await this.volume.getImageData()
    }
  }

  async loadTiff() {
    this.setImageData()
    if (this.imgdata && (this.imgdata.data.length > 0) && !this.updatedtexture) {
      this.texture = generateTexture(this.imgdata.data, this.imgdata.width, this.imgdata.height)
      updateTexture(this.file, this.texture, this.props.channel)
      this.updatedtexture = true
    }
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

  updateForFile(state) {
    if (filesNeedUpdate(state, this.files.length)) {
      const idx = Math.max((state.file.length - 1), 0);
      const files = state.file
      const file = files[idx]
      this.file = file
      if (
        areFilesValid(files, idx, this.fileLength)
      ) {
        this.updateFileList(files)
        updateImage(files[state.selected], this.props.channel);
        initializeVolume((parseInt(this.props.channel)+3), this.state.cntxt, files, this.state.axes, this.type, file.image.width, file.image.height, file.pages.length)
      }
    }
    this.forceUpdate();
  }
  updateForControls(state) {
    this.forceUpdate();
  }

  slice(value) {
    const slice = this.clamp(
      parseInt(value),
      0,
      Math.max(0, this.files[0].length -1)
    )

    const axisIdx = 2;
    this.setState(prevState => ({
      ...prevState,
      sliceIdx: slice,
    }));
    updateChannelSlice(
      this.state.cntxt,
      this.volume,
      slice,
      this.state.axes,
      axisIdx,
      true
    );
    this.setImageData()
    this.updatedtexture = false;
    this.forceUpdate();
  }

  clamp(val, min, max) {
    return Math.min(Math.max(val, min), max);
  }

  handleChangePageNumber(value) {
    this.slice(parseInt(value))
  }

  displayCanvas() {
    this.loadTiff()
    return canvasApi.getState().canvas[this.props.channel - 1]
  }

  // move to channel, causes issues here
  displayPageControls() {
    return (
      <div>
        <label>
         Page #: &nbsp;
         <input type="text" value={this.state.pagenumber} onChange={event => this.handleChangePageNumber(event.target.value) } />
        </label>
        <div> Slice: {this.state.sliceIdx} </div>
      </div>
    )
  }

  render() {
    fApi.subscribe(state => {
      this.updateForFile(state);
      this.forceUpdate()
    });
    uApi.subscribe(state => {
      this.updateForControls(state);
    });

    return (
      this.displayCanvas()
    )
  }
}

export default ImageCanvas;
