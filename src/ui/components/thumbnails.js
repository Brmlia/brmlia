import React from 'react';

import { thumb, thumbInner } from '../style.js';
import { fApi } from '../../utils/index.js';
import { fabric } from 'fabric';

class Thumbnails extends React.Component {

  constructor(props) {
    super(props);
    this.selected = 0;
    this.files = [];
    this.canvasRef = React.createRef();
    this.canvas = null
  }

  componentDidMount() {
    this.canvas = new fabric.Canvas(this.canvasRef.current);
  }

  setSelected(idx) {
    if (this.selected !== idx) {
      fApi.setState(prevState => ({
        ...prevState,
        selected: idx,
      }));
      this.selected = idx;
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
      this.forceUpdate();
    }
  }

  classicImage = (file, idx) => {
    return(
            <div style={thumb} key={file.name}>
              <div style={thumbInner}>
                <img
                  src={file.image}
                  style={file.style}
                  alt={file.name}
                  onClick={() => this.setSelected(idx)}
                />
              </div>
            </div>
    )
  }

  allThumbs = () => {
    var elements = [];

    if (fApi.getState().file) {
      fApi.getState().file.map ((file, idx) => {
        if (file.type === "image/png"
        ){
          elements.push (
            this.classicImage(file, idx)
          )
        }
        return null;
      });
    }

    return (
      <div>
        {elements}
      </div>
    );
  }

  shrinkTiff(context, imageData, idx) {
    const cw = 50
    const ch = 50
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
        />
      </div>
    );
  }

  display() {
    return (
      <div>
        {this.allThumbs()}
        {this.allTiffsCanvas()}
      </div>
    )
  }

  render() {

    fApi.subscribe(state => {
      this.updateForFile(state)
      this.forceUpdate()
    })

    return (
      <div id="thumbsContainer">
        {this.display()}
      </div>
    );
  }
}

export default Thumbnails;
