import create from 'zustand';
import * as THREE from 'three';

export const createTexture = image => {
  return new THREE.TextureLoader().load(image);
};

export const createTextureFromTiff = (imagedata, width, height) => {
  const data = new Uint8Array(imagedata)

  var texture =  new THREE.DataTexture(data, width, height, THREE.RGBAFormat)
  texture.needsUpdate = true;
  // console.log("imageStore::createTextureFromTiff() - texture generated from imagedata with width and height: ", texture, imagedata, width, height)
  return texture
};

const initState = {
  channels: [
    {
      uniforms: {
        brightness: {
          value: '0.0',
        },
        contrast: {
          value: '0.0',
        },
        whitepoint: {
          value: '255.0',
        },
        blackpoint: {
          value: '0.0',
        },
        opacity: {
          value: '0.0',
        },
        color: {
          value: '',
        },
        image: {
          value: '',
        },
      },
      texture: null,
      name: '',
      type: '',
    },
    {
      uniforms: {
        brightness: {
          value: '0.0',
        },
        contrast: {
          value: '0.0',
        },
        whitepoint: {
          value: '235.0',
        },
        blackpoint: {
          value: '16.0',
        },
        opacity: {
          value: '0.0',
        },
        color: {
          value: '',
        },
        image: {
          value: '',
        },
      },
      texture: null,
      name: '',
      type: '',
    },
    {
      uniforms: {
        brightness: {
          value: '0.0',
        },
        contrast: {
          value: '0.0',
        },
        whitepoint: {
          value: '235.0',
        },
        blackpoint: {
          value: '16.0',
        },
        opacity: {
          value: '0.0',
        },
        color: {
          value: '',
        },
        image: {
          value: '',
        },
      },
      texture: null,
      name: '',
      type: '',
    },
    {
      uniforms: {
        brightness: {
          value: '0.0',
        },
        contrast: {
          value: '0.0',
        },
        whitepoint: {
          value: '235.0',
        },
        blackpoint: {
          value: '16.0',
        },
        opacity: {
          value: '0.0',
        },
        color: {
          value: '',
        },
        image: {
          value: '',
        },
      },
      texture: null,
      name: '',
      type: '',
    },
    {
      uniforms: {
        brightness: {
          value: '0.0',
        },
        contrast: {
          value: '0.0',
        },
        whitepoint: {
          value: '255.0',
        },
        blackpoint: {
          value: '0.0',
        },
        opacity: {
          value: '0.0',
        },
        color: {
          value: '',
        },
        image: {
          value: '',
        },
      },
      texture: null,
      name: '',
      type: '',
    },
    {
      uniforms: {
        brightness: {
          value: '0.0',
        },
        contrast: {
          value: '0.0',
        },
        whitepoint: {
          value: '255.0',
        },
        blackpoint: {
          value: '0.0',
        },
        opacity: {
          value: '0.0',
        },
        color: {
          value: '',
        },
        image: {
          value: '',
        },
      },
      texture: null,
      name: '',
      type: '',
    },
    {
      uniforms: {
        brightness: {
          value: '0.0',
        },
        contrast: {
          value: '0.0',
        },
        whitepoint: {
          value: '235.0',
        },
        blackpoint: {
          value: '16.0',
        },
        opacity: {
          value: '0.0',
        },
        color: {
          value: '',
        },
        image: {
          value: '',
        },
      },
      texture: null,
      name: '',
      type: '',
    },
    {
      uniforms: {
        brightness: {
          value: '0.0',
        },
        contrast: {
          value: '0.0',
        },
        whitepoint: {
          value: '235.0',
        },
        blackpoint: {
          value: '16.0',
        },
        opacity: {
          value: '0.0',
        },
        color: {
          value: '',
        },
        image: {
          value: '',
        },
      },
      texture: null,
      name: '',
      type: '',
    },
    {
      uniforms: {
        brightness: {
          value: '0.0',
        },
        contrast: {
          value: '0.0',
        },
        whitepoint: {
          value: '235.0',
        },
        blackpoint: {
          value: '16.0',
        },
        opacity: {
          value: '0.0',
        },
        color: {
          value: '',
        },
        image: {
          value: '',
        },
      },
      texture: null,
      name: '',
      type: '',
    },
    {
      uniforms: {
        brightness: {
          value: '0.0',
        },
        contrast: {
          value: '0.0',
        },
        whitepoint: {
          value: '255.0',
        },
        blackpoint: {
          value: '0.0',
        },
        opacity: {
          value: '0.0',
        },
        color: {
          value: '',
        },
        image: {
          value: '',
        },
      },
      texture: null,
      name: '',
      type: '',
    },
  ],
};

export const [useUniformStore, uniApi] = create(set => ({
  ...initState,
  update: (
    brightness,
    contrast,
    whitepoint,
    blackpoint,
    opacity,
    color,
    image
  ) =>
    set(state => ({
      ...state,
      uniforms: {
        ...state.uniforms,
        brightness: {
          ...state.uniforms.brightness,
          value: brightness,
        },
        contrast: {
          ...state.uniforms.contrast,
          value: contrast,
        },
        whitepoint: {
          ...state.uniforms.whitepoint,
          value: whitepoint,
        },
        blackpoint: {
          ...state.uniforms.blackpoint,
          value: blackpoint,
        },
        opacity: {
          ...state.uniforms.opacity,
          value: opacity,
        },
        color: {
          ...state.uniforms.color,
          value: color,
        },
        image: {
          ...state.uniforms.image,
        },
      },
      texture: image,
      brightness: brightness,
    })),
}));
