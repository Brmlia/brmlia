import create from 'zustand';
import * as THREE from 'three';
import { Image } from 'image-js';
import { updateUniformImage } from './CanvasControl.js'
import { fApi, uApi } from '../utils/index.js'

// Loading an image is asynchronous and will return a Promise.
export const createTexture = (image) => {
  Image.load(image).then(function (image) {
    console.log('Width', image.width);
    console.log('Height', image.height);
    console.log('colorModel', image.colorModel);
    console.log('components', image.components);
    console.log('alpha', image.alpha);
    console.log('channels', image.channels);
    console.log('bitDepth', image.bitDepth);
    //uncomment to show tiff as canvas in UI
    //const newImage = Image.createFrom(image, { width: 200, height: 200 });
    //let ele = document.getElementById('mainView');
    //ele.appendChild(newImage.getCanvas());
    //does not render canvas
    let texture = new THREE.CanvasTexture(image.getCanvas());
    console.log('texture', texture);
    return texture;
  });
}

const initState = {
  // todo: individual uniforms for separate channels
  channels:
    [
      {
        uniforms: {
          brightness: {
            value: '0.0'
          },
          contrast: {
            value: '0.0'
          },
          image: {
            value: ''
          }
        },
        texture: null,
        name: '',
        type: ''
      },
      {

        uniforms: {
          brightness: {
            value: '0.0'
          },
          contrast: {
            value: '0.0'
          },
          image: {
            value: ''
          }
        },
        texture: null,
        name: '',
        type: ''
      },
      {

        uniforms: {
          brightness: {
            value: '0.0'
          },
          contrast: {
            value: '0.0'
          },
          image: {
            value: ''
          }
        },
        texture: null,
        name: '',
        type: ''
      }
    ]
}

export const [useUniformStore, uniApi] = create ( set => ( {
  ...initState,
}))