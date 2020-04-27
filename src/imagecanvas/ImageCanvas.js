import React from 'react';

import {
  fApi,
  uApi,
  updateImage,
  updateTexture,
} from './index.js'

import {
  canvasApi,
} from './canvasStore.js';

class ImageCanvas extends React.Component {

  constructor (props) {
    super(props)
    this.files = [];
  }

  componentDidMount() {
    this.cntxt = document.createElement('canvas').getContext('2d')
  }

  loadTiff(file) {
    var page = null
    if (file ) {
      page = file.pages
    }
    console.log("loadTiff", file)
    if (page && (file.image.width > 0) && (file.image.height > 0)) {
    console.log("loadTiff page", file, page)
      const imageData = this.cntxt.createImageData(
        file.image.width,
        file.image.height
      );

      for (let idx = 0; idx < page.length; idx++) {
        console.log("iamgedata idx", idx)
        imageData.data[idx] = page[idx];
      }
      console.log("imagedat", imageData)
      this.cntxt.putImageData(imageData, 0, 0)
      console.log("imagedat", imageData)
      updateTexture(file, this.cntxt.canvas)
    }
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
      console.log("state.file", state.file, this.files, this.files.length)

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
  }
}

export default ImageCanvas;
