import React from 'react';
import { Canvas } from 'react-three-fiber';
import { fabric } from 'fabric';

import {
  fApi,
  uApi,
  updateImage,
  updateTexture,
  thumb,
  thumbInner
} from './index.js'

import {
  canvasApi,
} from '../../imagecanvas/canvasStore.js';

import Mesh from './Mesh2.js'

class Canvas2 extends React.Component {

  constructor (props) {
    super(props)
    this.files = [];
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    // this.cntxt = document.createElement('canvas').getContext('2d')
    this.canvas = new fabric.Canvas(this.canvasRef.current);
  }

  updateForFile(state) {
    if (state && (state.file.length > 0) && (state.file.length !== this.files.length)) {

      const tiffFiles = state.file.filter(file => file.type === "image/tiff")
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
      this.forceUpdate();
    }
  }

  shrinkTiff(context, imageData, idx) {
    const cw = 200
    const ch = 200
    const imgW = imageData.width
    const imgH = imageData.height

    var newC = document.createElement('canvas')
    newC.width = imgW
    newC.height = imgH
    newC.getContext('2d').putImageData(imageData, 0, 0)

    var x = (cw+10) * idx
    var y = 0
    context.drawImage(newC, x, y, cw, ch)
  }

  loadTiff(context) {
    for (var f = 0; f < this.files.length; f++) {

      const file = this.files[f]
      var page = null
      if (file ) {
        page = file.page
      }
      if (page && (file.width > 0) && (file.height > 0)) {
        const imageData = context.createImageData(
          file.width,
          file.height
        );

        for (let idx = 0; idx < page.length; idx++) {
          imageData.data[idx] = page[idx];
        }

        this.shrinkTiff(context, imageData, f)
      }
    }
  }

  allTiffsCanvas = () => {
    if (this.canvas) this.loadTiff(this.canvas.getContext('2d'))
    return (
      <div>
        <canvas
          ref={this.canvasRef}
          width="1000px"
          height="1000px"
          margin="0px"
          id="tiff-canvas"
        >
        </canvas>
      </div>
    );
  }

  display() {
    return (
      <div>
        {this.allTiffsCanvas()}
      </div>
    )
  }

  render() {
    fApi.subscribe(state => {
      this.updateForFile(state);
      this.forceUpdate()
    });
    // uApi.subscribe(state => {
    //   this.updateForControls(state);
    // });

    // return (
    //   <Canvas>
    //     <Mesh channel="1" />
    //   </Canvas>
    // )
    return (
      <div>
        {this.display()}
      </div>
    )
  }
}

export default Canvas2;
