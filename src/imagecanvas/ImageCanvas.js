import React from 'react';
import { Canvas } from 'react-three-fiber';
import Grid from '@material-ui/core/Grid';
import Mesh from './Mesh';
import { createTexture, createTextureFromTiff } from './imageStore.js'
import { fApi, uApi } from '../utils/index.js'
import { updateUniformImage } from './CanvasControl.js'
import {canvasApi} from './canvasStore.js'

class ImageCanvas extends React.Component {

  updateForFile(state) {
    if (state) {
      if (uApi.getState().name !== state.file[state.selected].name) {

        let texture = createTexture(state.file[state.selected].image);
        if (state.file[state.selected].type === "image/tiff") {
          console.log('ImageCanvas::updateForFile() - tiff detected ==> converting to canvas');
          texture = createTextureFromTiff(state.file[state.selected].image);
        }

        updateUniformImage(texture, state.file[state.selected].name, this.props.channel)
        this.forceUpdate();
      }
    }
  }
  updateForControls(state) {
    this.forceUpdate();
  }

  render() {
    fApi.subscribe(state =>  {
      this.updateForFile(state);
    })
    uApi.subscribe(state =>  {
      this.updateForControls(state);
    })

    return (
      canvasApi.getState().canvas[this.props.channel-1]
    );
  }
}

export default ImageCanvas;
