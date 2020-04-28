import React from 'react';
import { Canvas } from 'react-three-fiber';
import { fabric } from 'fabric';

import {
  fApi,
  uApi,
  updateImage,
  updateTexture,
  createTextureFromTiff,
} from './index.js'

import {
  canvasApi,
} from './canvasStore.js';
import Mesh from './Mesh.js'

class ImageCanvas extends React.Component {

  constructor (props) {
    super(props)
    this.files = [];
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    this.canvas = new fabric.Canvas(this.canvasRef.current);
    this.cntxt = this.canvas.getContext('2d')
  }

  loadTiff(file) {
    var page = null
    if (file ) {
      page = file.pages[0]
    }
    if (page && (file.image.width > 0) && (file.image.height > 0)) {
      const imageData = this.cntxt.createImageData(
        file.image.width,
        file.image.height
      );

      for (let idx = 0; idx < page.length; idx++) {
        imageData.data[idx] = page[idx];
      }
      // this.cntxt.putImageData(imageData, 0, 0)

      // this.texture = createTextureFromTiff(imageData.data, imageData.width, imageData.height)
      const texture = createTextureFromTiff(imageData.data, imageData.width, imageData.height)
      updateTexture(file, texture, this.props.channel)
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
        page: file.pages[0],
        name: file.name,
        type: file.type
      }

      this.files.push(newFile)
    }
  }

  updateForFile(state) {
    if (state && (state.file.length > 0) && (state.file.length !== this.files.length)) {
      this.updateFileList(state.file)
      updateImage(state.file[state.selected], this.props.channel);
      this.loadTiff(state.file[0])
    }
    this.forceUpdate();
  }
  updateForControls(state) {
    this.forceUpdate();
  }

  render() {
    fApi.subscribe(state => {
      this.updateForFile(state);
    });
    uApi.subscribe(state => {
      this.updateForControls(state);
    });

    return canvasApi.getState().canvas[this.props.channel - 1];
    // return (
    //   <div>
    //     <Canvas
    //       // ref={this.canvasRef}
    //       width="1000px"
    //       height="1000px"
    //       margin="0px"
    //       id="tiff-canvas"
    //     >
    //     <Mesh channel={this.props.channel}>
    //     </Mesh>
    //     </Canvas>
    //   </div>
    // )
  }
}

export default ImageCanvas;
