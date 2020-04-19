import create from 'zustand';
import * as THREE from 'three';

export const createTexture = image => {
  return new THREE.TextureLoader().load(image);
};

export const createTextureFromTiff = image => {
  return new THREE.TextureLoader().load(image);
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
  update: (brightness, contrast, whitepoint, blackpoint, color, image) =>
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
