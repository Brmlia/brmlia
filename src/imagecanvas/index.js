import {
  uApi as uniApi,
  fApi as fileApi,
} from '../utils/index.js';

import {
  updateImage as updIm,
} from './CanvasControl.js';

import {
  createTexture as createT,
  createTextureFromTiff as createTFrTiff,
} from './ImageStore.js';

export const uApi = uniApi
export const fApi = fileApi
export const updateImage = updIm
export const createTexture = createT
export const createTextureFromTiff = createTFrTiff
