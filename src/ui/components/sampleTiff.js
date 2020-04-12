import React, { Component } from "react";
import { render } from "react-dom";
import { Stage, Layer, Shape } from "react-konva";
import Konva from "konva";
import UTIF from "utif";
import { fApi, uApi } from '../../utils/index.js'
import { updateImage } from './../../imagecanvas/CanvasControl.js'

class SampleTiff extends Component {

  state = {
    rgba: null,
    width: 0,
    height: 0,
    pages: []
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
      this.setState( {
        rgba: state.file[0].rgba,
        width: state.file[0].image.width,
        height: state.file[0].image.height,
        pages: state.file[0].pages,
      })
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
              if (pages && (this.state.width > 0) && (this.state.height > 0)) {

                for (var i = 0; i < this.state.pages.length; i++) {
                  const imageWidth = this.state.width;
                  const imageHeight = this.state.height;
                  const imageData = context.createImageData(
                    imageWidth,
                    imageHeight
                  );

                  const page = pages[i]
                  for (let i = 0; i < page.length; i++) {
                    imageData.data[i] = page[i];
                  }

                  // grid of 3 x 3
                  var x = 0
                  const mod3 = (i % 3)
                  const y = Math.floor(i / 3) * imageHeight

                  if ( mod3 === 1) x = imageWidth * 1
                  else if (mod3 === 2) x = imageWidth * 2

                  context.putImageData(imageData, x, y);
                }
              }
            }}
          />
        </Layer>
      </Stage>
    );
  }
  render() {
    fApi.subscribe(state =>  {
      this.updateForFile(state);
    })
    return(
      // this.displayOriginal()
      // this.displayTiff2()
      this.displayMultiPageTiff()
    );
  }
}

export default SampleTiff
