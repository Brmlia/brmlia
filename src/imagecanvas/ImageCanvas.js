import React from 'react';
import { fApi, uApi } from '../utils/index.js'
import { updateImage } from './CanvasControl.js'
import {canvasApi} from './canvasStore.js'
import { canvasStyle1 } from '../style.js';

class ImageCanvas extends React.Component {

  channel = 1

  updateForFile(state) {
    if (state) {
      updateImage(state.file[state.selected], this.channel)
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
      <div id="imageLayer" style={canvasStyle1}>
        {canvasApi.getState().canvas[this.channel-1]}
      </div>
    );
  }
}

export default ImageCanvas;
