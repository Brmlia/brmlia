import React from 'react';
import { Canvas } from 'react-three-fiber';
import { createTexture } from './imageStore.js'
import { fApi, uApi } from '../utils/index.js'
import { updateUniformImage } from './CanvasControl.js'
import {canvasApi} from './canvasStore.js'
import { animate } from './ImageScene.js'

class ImageCanvas extends React.Component {

  updateForFile(state) {
    if (state) {
      if (uApi.getState().name !== state.file[state.selected].name) {
          let texture = createTexture(state.file[state.selected].image);
          updateUniformImage(texture, state.file[state.selected].name, this.props.channel)
      }
    }
  }
  updateForControls(state) {
    this.forceUpdate();
  }


  render() {
    animate();
    fApi.subscribe(state =>  {
      this.updateForFile(state);
    })
    uApi.subscribe(state =>  {
      this.updateForControls(state);
    })
    return (
      <Canvas className='image-canvas' >
        {canvasApi.getState().canvas[this.props.channel-1]}
      </Canvas>
    );
  }
}

export default ImageCanvas;
