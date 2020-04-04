import React from 'react';
import { Canvas } from 'react-three-fiber';
import { createTexture } from './imageStore.js'
import { fApi, uApi } from '../utils/index.js'
import { updateUniformImage } from './CanvasControl.js'
import {canvasApi} from './canvasStore.js'
import { animate, addMeshToScene } from './ImageScene.js'

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
    let canvas = <Canvas className='image-canvas' >
        {canvasApi.getState().canvas[this.props.channel-1]}
      </Canvas>
    // line below does not work. result =  THREE.Object3D.add: object not an instance of THREE.Object3D
    // I suspect it's because the adding of the Mesh to the scene is happening at the wrong time?
    // canvas = addMeshToScene(canvas);
    animate();
    fApi.subscribe(state =>  {
      this.updateForFile(state);
    })
    uApi.subscribe(state =>  {
      this.updateForControls(state);
    })

    return (
      canvas
    );
  }
}

export default ImageCanvas;
