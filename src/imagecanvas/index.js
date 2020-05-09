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
  updateSliceLength  as updSliceLen,
  updateType         as updType,
  getImageProps      as getImProps,
} from '../datacube/volumeControl.js';

import {
  loadSlices as ldSlices,
  updateChannelSlice as updSlice,
} from '../datacube/datacubeControls.js';

import {
  parseMetadata as parseMd,
  filesNeedUpdate  as filesNeedUpd,
  areFilesValid    as areFilesVal,
} from '../fileuploader/fileParser.js';

import {
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
export const updateSliceLength     = updSliceLen
export const updateType            = updType
export const getImageProps         = getImProps
export const generateTexture       = genText
export const getImageData          = getImgDt
export const initializeVolume      = initVol
export const loadSlices            = ldSlices
export const updateChannelSlice    = updSlice
export const parseMetadata         = parseMd
export const filesNeedUpdate       = filesNeedUpd
export const areFilesValid         = areFilesVal
