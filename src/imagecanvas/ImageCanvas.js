import React from 'react';
import { createTexture, createTextureFromTiff } from './ImageStore.js'
import { fApi, uApi } from '../utils/index.js'
import { updateImage } from './CanvasControl.js'
import {canvasApi} from './canvasStore.js'
import { canvasStyle1 } from '../style.js';

class ImageCanvas extends React.Component {

  updateForFile(state) {
    if (state) {
      updateImage(state.file[state.selected], this.props.channel)
    }
    this.forceUpdate();
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
