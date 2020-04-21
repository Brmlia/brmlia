import React, { Component } from "react";
import { Stage, Layer, Shape } from "react-konva";
import UTIF from "utif";
import { fApi } from '../../utils/index.js'
import { updateImage } from './../../imagecanvas/CanvasControl.js'

class SampleTiff extends Component {

  state = {
    rgba: null,
    width: 0,
    height: 0,
    pages: [],
    loaded: 0,
    pagenumber: 0,
    files: []
  }

  displayOriginal() {
    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Shape
            x={0}
            y={0}
            sceneFunc={context => {
              const xhr = new XMLHttpRequest();
              xhr.open("GET", "2d.tiff");
              xhr.responseType = "arraybuffer";
              xhr.onload = e => {

                const ifds = UTIF.decode(e.target.response);
                const firstPageOfTif = ifds[0];
                UTIF.decodeImage(e.target.response, ifds[0]);
                const rgba = UTIF.toRGBA8(firstPageOfTif);

                const imageWidth = firstPageOfTif.width;
                const imageHeight = firstPageOfTif.height;
                const imageData = context.createImageData(
                  imageWidth,
                  imageHeight
                );
                for (let i = 0; i < rgba.length; i++) {
                  imageData.data[i] = rgba[i];
                }
                context.putImageData(imageData, 0, 0);
              };
              xhr.send();

            }}
          />
        </Layer>
      </Stage>
    );
  }

  updateForFile(state) {
    if (state) {
      const idx = state.file.length - 1
      const file = state.file[idx]
      const newFile = {
        rgba: file.rgba,
        width: file.image.width,
        height: file.image.height,
        page: file.pages[0],
      }
      this.setState( prevState => ({
        ...prevState,
        rgba: state.file[0].rgba,
        width: state.file[0].image.width,
        height: state.file[0].image.height,
        pages: state.file[0].pages,
        files: [
          ...prevState.files,
          newFile
        ]
      }))
      updateImage(state.file[state.selected], this.channel)
    }
    this.forceUpdate();
  }

  displayTiff2() {
    var rgba = null
    if (this.state && this.state.rgba) {
      rgba = this.state.rgba
    }
    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Shape
            x={0}
            y={0}
            sceneFunc={context => {
              if (rgba) {
                const imageWidth = this.state.width;
                const imageHeight = this.state.height;
                const imageData = context.createImageData(
                  imageWidth,
                  imageHeight
                );
                for (let i = 0; i < this.state.rgba.length; i++) {
                  imageData.data[i] = this.state.rgba[i];
                }
                context.putImageData(imageData, 0, 0);
              }
            }}
          />
        </Layer>
      </Stage>
    );
  }

  loadTiff(context, idx, pages, width, height) {
    console.log("loading ", idx , "/", pages.length)
    const imageData = context.createImageData(
      width,
      height
    );

    const page = pages[idx]
    for (let idx = 0; idx < page.length; idx++) {
      imageData.data[idx] = page[idx];
    }
    return imageData;
  }

  displayTiff(context, imageData) {

    context.putImageData(imageData, 0, 0);
  }

  displayTiffGrid(context, idx, width, height, imageData) {
    // grid of 3 x 3
    var x = 0
    const mod3 = (idx % 3)
    const y = Math.floor(idx / 3) * height

    if ( mod3 === 1) x = width * 1
    else if (mod3 === 2) x = width * 2

    context.putImageData(imageData, x, y);
  }

  displayMultiPageTiff() {
    var pages = null
    if (this.state && this.state.pages) {
      pages = this.state.pages
    }
    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Shape
            x={0}
            y={0}
            sceneFunc={context => {
              if (pages && (this.state.width > 0) && (this.state.height > 0) && (this.state.loaded !== this.state.pages.length-1)) {

                var loaded = 0
                for (var i = 0; i < this.state.pages.length; i++) {

                 const imageData = this.loadTiff(context, i, pages, this.state.width, this.state.height);
                 this.displayTiffGrid(context, i, this.state.width, this.state.height, imageData);
                 loaded = i;
                }
                if (this.state.loaded !== loaded) {
                  this.setState(prevState => ({
                    ...prevState,
                    loaded: loaded
                  }))
                }
              }
            }}
          />
        </Layer>
      </Stage>
    );
  }

  handleChangePageNumber(value) {
    this.setState(prevState => ({
      ...prevState,
      pagenumber: value
    }))
  }

  displaySelectedTiff() {
    var pages = null
    if (this.state && this.state.pages) {
      pages = this.state.pages
    }
    return (
      <div>
        <label>
          Page #:
          <input type="text" value={this.state.pagenumber} onChange={event => this.handleChangePageNumber(event.target.value) } />
        </label>
        <Stage width={window.innerWidth} height={window.innerHeight}>
          <Layer>
            <Shape
              x={0}
              y={0}
              sceneFunc={context => {
                if (pages && (this.state.width > 0) && (this.state.height > 0)) {


                 const imageData = this.loadTiff(context, this.state.pagenumber, pages, this.state.width, this.state.height);
                 this.displayTiff(context, imageData);
                }
              }}
            />
          </Layer>
        </Stage>
      </div>
    );
  }

  render() {
    fApi.subscribe(state =>  {
      this.updateForFile(state);
    })
    return(
      // this.displayOriginal()
      // this.displayTiff2()
      // this.displayMultiPageTiff()
      this.displaySelectedTiff()
    );
  }
}

export default SampleTiff
