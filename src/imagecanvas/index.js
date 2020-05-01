import {
  uApi as uniApi,
  fApi as fileApi,
} from '../utils/index.js';

import {
  canvasApi as cvsApi,
} from './canvasStore.js';

import {
  volApi as vApi,
} from './../datacube/volumeStore.js';

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
  updateChannelSlice as updSlice,
} from '../datacube/datacubeControls.js';

import {
  filesNeedUpdate  as filesNeedUpd,
  areFilesValid    as areFilesVal,
  initializeVolume as initVol,
  generateTexture  as genText,
  getImageData     as getImgDt,
} from './canvasUtils.js';

export const uApi                  = uniApi
export const fApi                  = fileApi
export const canvasApi             = cvsApi
export const volApi                = vApi
export const updateImage           = updIm
export const updateTexture         = updText
export const createTexture         = createT
export const createTextureFromTiff = createTFrTiff
export const saveVolume            = saveVol
export const getVolume             = getVol
export const filesNeedUpdate       = filesNeedUpd
export const areFilesValid         = areFilesVal
export const generateTexture       = genText
export const getImageData          = getImgDt
export const initializeVolume      = initVol
export const loadSlices            = ldSlices
export const updateChannelSlice    = updSlice
