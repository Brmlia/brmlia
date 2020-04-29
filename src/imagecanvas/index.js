import {
  uApi as uniApi,
  fApi as fileApi,
} from '../utils/index.js';

import {
  updateImage as updIm,
  updateTexture as updText,
} from './CanvasControl.js';

import {
  createTexture as createT,
  createTextureFromTiff as createTFrTiff,
} from './ImageStore.js';

import {
  saveVolume as saveVol,
  getVolume  as getVol,
} from '../datacube/volumeControl.js';

import {
  loadSlices as ldSlices,
} from '../datacube/datacubeControls.js';

export const uApi = uniApi
export const fApi = fileApi
export const updateImage = updIm
export const updateTexture = updText
export const createTexture = createT
export const createTextureFromTiff = createTFrTiff
export const saveVolume         = saveVol
export const getVolume          = getVol
export const loadSlices         = ldSlices
