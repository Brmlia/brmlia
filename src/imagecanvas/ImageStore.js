import create from 'zustand';
import * as THREE from 'three';

export const createTexture = image => {
  return new THREE.TextureLoader().load(image);
};

// export const createTextureFromTiff = imagedata => {
export const createTextureFromTiff = canvas => {
  console.log("createTextureFromTiff", canvas)
  var texture = new THREE.Texture(canvas)
  // var texture = new THREE.DataTexture(imagedata, 256, 256, THREE.RGBFormat)
  // texture.type = THREE.UnsignedByteType;
  texture.needsUpdate = true;
  // return new THREE.TextureLoader().load(image);
  // return null
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
