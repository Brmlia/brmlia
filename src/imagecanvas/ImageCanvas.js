import React from 'react';
import { Canvas } from 'react-three-fiber';
import { createTexture } from './imageStore.js'
import { fApi, uApi } from '../utils/index.js'
import { updateUniformImage } from './CanvasControl.js'
import {canvasApi} from './canvasStore.js'
import * as THREE from 'three';

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
    fApi.subscribe(state =>  {
      this.updateForFile(state);
    })
    uApi.subscribe(state =>  {
      this.updateForControls(state);
    })

    let scene = new THREE.Scene();
		let camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
		let renderer = new THREE.WebGLRenderer();
    let canvas = <Canvas className='image-canvas' >
          {canvasApi.getState().canvas[this.props.channel-1]}
        </Canvas>
    function animate() {
	    requestAnimationFrame( animate );
	    renderer.render( scene, camera );
    }

    scene.add(canvas);
    animate();
    return (
      scene
    );
  }
}

export default ImageCanvas;
