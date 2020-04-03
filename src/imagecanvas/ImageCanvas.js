import React from 'react';
import { Canvas } from 'react-three-fiber';
import Grid from '@material-ui/core/Grid';
import Mesh from './Mesh';
import { canvasStyle } from '../ui/style.js'
import { createTexture, createTextureFromTiff } from './imageStore.js'
import { fApi, uApi } from '../utils/index.js'
import { updateUniformImage } from './CanvasControl.js'
import {canvasApi} from './canvasStore.js'

class ImageCanvas extends React.Component {

  updateForFile(state) {
    if (state) {
      if (uApi.getState().name !== state.file[state.selected].name) {
          let texture = createTexture(state.file[state.selected].image);
          updateUniformImage(texture, state.file[state.selected].name, this.props.channel)
          //this.forceUpdate();
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
      <div class="image-canvas-container" style={canvasStyle}>
        <Canvas className='image-canvas' >
          {canvasApi.getState().canvas[this.props.channel-1]}
        </Canvas>
      </div>
    );
  }
}

export default ImageCanvas;
