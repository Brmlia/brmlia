import React from 'react';
import { Canvas } from 'react-three-fiber';
import { fabric } from 'fabric';

import {
  fApi,
  getVolume,
  filesNeedUpdate,
  areFilesValid,
  initializeVolume,
  generateTexture,
  shrinkTiff,
} from './index.js'

import Mesh from './testMesh.js'

class TestCanvas extends React.Component {

  constructor (props) {
    super(props);

    this.canvasRef = React.createRef();

    // 0: tiff html5 canvas
    // 1: fabric mesh canvas with texture from raw image data
    // 2: fabric mesh canvas with texture from datacube image data
    this.canvasType = 2;
    this.files = [];
    this.state = {
      axes: ['x', 'y', 'z'],
    }
    this.init()
  }

  init() {
    if (this.canvasType === 1) {

    }
    else if (this.canvasType === 2) {
      this.setState(prevState => ({
        ...prevState,
        axisIdx: 0,
        sliceIdx: 23,
        cntxt: null,
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
    }
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

      if (
        areFilesValid(files, idx, this.fileLength)
      ) {
        this.updateFileList(files)
        if (this.canvasType === 2) {
          initializeVolume(7, this.state.cntxt, files, this.state.axes, this.type, file.image.width, file.image.height, file.pages.length)
        }
      }
    }
    this.forceUpdate();
  }

  async loadSimpleTiffs() {
    for (var f = 0; f < this.files.length; f++) {

      const file = this.files[f]
      var page = null
      if (file ) {
        page = file.page
      }
      if (page && (file.width > 0) && (file.height > 0)) {
        const imageData = this.state.cntxt.createImageData(
          file.width,
          file.height
        );
        for (let idx = 0; idx < page.length; idx++) {
          imageData.data[idx] = page[idx];
        }

        this.texture = generateTexture(imageData.data, imageData.width, imageData.height)
        shrinkTiff(this.state.cntxt, imageData, f)
      }
    }
  }

  async setImageData() {
    this.volume =  getVolume(7)
    if (this.volume) {
      this.imgdata = await this.volume.getImageData()
    }
  }

  async loadComplexTiffs() {
    this.setImageData()
    if (this.imgdata && (this.imgdata.data.length > 0)) {
      this.texture = generateTexture(this.imgdata.data, this.imgdata.width, this.imgdata.height)
    }
  }

  async loadTiff() {
    if (this.canvasType === 1) {
      this.loadSimpleTiffs()
    }
    else if (this.canvasType === 2 ) {
      this.loadComplexTiffs()
    }
  }

  display() {
    this.loadTiff()
    return (
      <div>
        <Canvas
          width="1000px"
          height="1000px"
          margin="0px"
          id="tiff-canvas"
        >
        <Mesh channel="1" texture={this.texture}>
        </Mesh>
        </Canvas>
      </div>
    );
  }

  render() {
    fApi.subscribe(state => {
      this.updateForFile(state);
      this.forceUpdate()
    });
    return (
      <div>
        {this.display()}
      </div>
    )
  }
}

export default TestCanvas;
