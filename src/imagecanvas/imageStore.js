import create from 'zustand';
import * as THREE from 'three';
//import Tiff from 'tiff.js';
import UTIF from 'utif';
import UPNG from 'utif';

export const createTexture = (image) => {
  console.log(" createTexture() - texture " , new THREE.TextureLoader().load(image));

  return new THREE.TextureLoader().load(image);
}

export const createTextureFromTiff = (image) => {

  //use async and promises to load the blob into a buffer, then decode it
  //into an RGBA Uint8Array. Load the array into a DataTexture
  async function fetchImageBuffer(image) {
    // function input 'image' is already a blob,
    // but it was not working without explicitly creating the Blob...
    const blob = new Blob([image]);
    const arrayBuffer = await new Response(blob).arrayBuffer();
    return arrayBuffer;
  }
  fetchImageBuffer().then((blob) => {
    const byteLength = blob.byteLength;
    console.log(byteLength);
    if(byteLength > 0){
      let ifds = UTIF.decode(blob);
      UTIF.decodeImage(blob, ifds[0])
      let rgba = UTIF.toRGBA8(ifds[0]);  // Uint8Array with RGBA pixels
      // console.log("decoded ifds0: " + ifds[0].width, "HEIGHT: " + ifds[0].height, ifds[0]);
      return rgba;
    }
  })
  .catch((e) =>
    console.log(e)
  );


  const canv = fetchImageBuffer(image);
  Promise.resolve(canv).then(function(canv) {
    console.log('Uint8Array with RGBA pixel length: ' + canv.byteLength);
    // use DataTexture to load the RGBA Uint8Array into a texture
    // https://threejs.org/docs/index.html#api/en/textures/DataTexture
    // TODO: Get the actual height and width of the image for tiff spec

    let dataView = new DataView(canv, 0, 28);
    let width = 512; //dataView.getInt32(16);
    let height = 512; //dataView.getInt32(20);
    let texture = new THREE.DataTexture( canv, width, height, THREE.RGBFormat );
    console.log("createTextureFromTiff() - texture " , texture);
    return texture;
  }, function(canv) {
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