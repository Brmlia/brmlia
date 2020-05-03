
import DataCube from '../datacube/datacube.js';
import * as THREE from 'three';

import {
  Volume,
} from '../datacube/volume.js'

import {
  saveVolume,
  getVolume,
  loadSlices,
  canvasApi,
  volApi,
} from './index.js'

export async function initializeVolume(idx, cntxt, files, fileIdx, axes, type, width, height, length) {

  if (!getVolume(idx)) {
    var cube = {
      x: 256,
      y: 256,
      z: 256,
    };
    cube.x = width
    cube.y = height
    cube.z = length

    var volume = new Volume({
      channel: new DataCube({
        bytes: 1,
        size: cube,
        context: cntxt,
      }),
    });
    saveVolume(idx, volume)

    await loadSlices(
      cntxt,
      volume,
      axes,
      2,
      files,
      type,
      fileIdx,
    );

    await volume.channel.cacheCube()
    console.debug("initializeVolume: volume initialized with params: idx: %d fileIdx: %d type: %d width: %d height: %d length: %d", idx, fileIdx, type, width, height, length)
  }
}

export async function getImageData(idx) {
  const vol = getVolume(idx)
  if (vol) {
    return await vol.getImageData()
  }
}

export function generateTexture(imageData, width, height) {
  const data = new Uint8Array(imageData)

  var texture =  new THREE.DataTexture(data, width, height, THREE.RGBAFormat)
  texture.needsUpdate = true
  return texture
}

export function generateSampleData() {
  var data = [];
  var N = 4;

  for (var i = 0; i < N*N; ++i) {
    data.push(255);
    data.push(0);
    data.push(0);
    data.push(255);
  }
  return data
}

export function shrinkTiff(context, imageData, idx) {
  const cw = 200
  const ch = 200
  const imgW = imageData.width
  const imgH = imageData.height

  var newC = document.createElement('canvas')
  newC.width = imgW
  newC.height = imgH
  newC.getContext('2d').putImageData(imageData, 0, 0)

  var x = (cw+10) * idx
  var y = 0
  context.drawImage(newC, x, y, cw, ch)
}
