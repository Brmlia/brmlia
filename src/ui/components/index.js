import { fileApi } from '../../fileuploader/fileStore.js';

import { annotApi as aApi } from '../../annotator/annotationStore.js';

import { uApi as uniApi } from '../../utils/index.js';

import { volApi as vApi } from '../../datacube/volumeStore.js';

import {
  saveVolume as saveVol,
  getVolume as getVol,
  updateSliceIndex as updSliceIdx,
  updateType as updType,
} from '../../datacube/volumeControl.js';

import {
  initializeVolume as initVol,
  generateTexture as genText,
  getImageData as getImgDt,
  generateSampleData as genSmpDat,
  shrinkTiff as shrTiff,
} from '../../imagecanvas/canvasUtils.js';

import {
  buttonGroupStyle as btnGrpStyle,
  cardStyle as cdStyle,
} from '../styles/style.js';

import {
  mainViewStyle as mViewStyle,
  mainCardBodyStyle as mCdBodyStyle,
  mainCardStyle as mCdStyle,
  mainCanvasStyle0 as mCvsStyle0,
  mainCanvasStyle1 as mCvsStyle1,
  mainCanvasStyle2 as mCvsStyle2,
  mainCanvasStyle3 as mCvsStyle3,
  mainImgStyle as mImgStyle,
} from '../styles/mainStyle.js';

import {
  axisViewStyle as axVwStyle,
  axisCardStyle as axCdStyle,
  axisCardBodyStyle as axCdBodyStyle,
} from '../styles/axisStyle.js';

import {
  channelViewStyle as chVwStyle,
  channelViewStyleCollapsed as chVwColStyle,
  channelCardStyle as chCardStyle,
  channelCardBodyStyle as chCardBodyStyle,
  channelCanvasStyle as chCanvasStyle,
  channelImageCanvasStyle as chImgCanvasStyle,
} from '../styles/channelStyle.js';

import {
  annotViewStyle as annotVwStyle,
  annotCardStyle as annotCdStyle,
  annotLayerStyle as annotLrStyle,
} from '../styles/annotatorStyle.js';

import {
  thumbStyle as thbStyle,
  thumbInnerStyle as thbInStyle,
} from '../styles/thumbnailStyle.js';

import {
  updateClasses as updCls,
  getClasses as getCls,
  toggleClassEnable as toggleClsEn,
  annotClassApi as annotClsApi,
} from '../../annotator/annotationClass.js';

import {
  filterClasses as filterCls,
  filterAnnotations as filtAnnot,
  showAll as shAll,
  drawFreeStyle as drawFr,
  colors as clrs,
  undo as undoAnnot,
  redo as redoAnnot,
} from '../../annotator/annotationEditor.js';

import {
  setCanvas as setCvs,
  AnnotationMenuApi as aMenuApi,
} from '../../annotator/annotationSettings.js';

import { Volume as Vol } from '../../datacube/volume.js';

import {
  loadSlices as ldSlices,
  updateChannelSlice as updSlice,
} from '../../datacube/datacubeControls.js';

import {
  updateBrightness as updBrightness,
  updateContrast as updContrast,
  updateWhitepoint as updWhitepoint,
  updateBlackpoint as updBlackpoint,
  updateColor as updColor,
  updateOpacity as updOpacity,
  updateTexture as updText,
} from '../../imagecanvas/CanvasControl.js';
import {
  openMenu as opMenu,
  startDrawing as strDr,
  startSelecting as strSel,
  finish as fin,
  addToFabric as addToFab,
  setFabricCanvas as setFabCvs,
  setMode as setMd,
  fabricApi as fabApi,
  initFabricLayers as initFabLyrs,
  modes as mds,
} from '../../fabric/fabricControl.js';

import {
  updateChannelSel as updChannelSel,
  updateLastSel as updLastSel,
} from '../../mainSettings.js';

import { exportJson as expJson } from '../../fileuploader/fileExporter.js';

import {
  parseMetadata as parseMd,
  filesNeedUpdate as filesNeedUpd,
  areFilesValid as areFilesVal,
} from '../../fileuploader/fileParser.js';

export const fApi = fileApi;
export const annotApi = aApi;
export const volApi = vApi;
export const saveVolume = saveVol;
export const getVolume = getVol;
export const generateTexture = genText;
export const getImageData = getImgDt;
export const initializeVolume = initVol;
export const generateSampleData = genSmpDat;
export const shrinkTiff = shrTiff;
export const updateSliceIndex = updSliceIdx;
export const updateType = updType;
export const buttonGroupStyle = btnGrpStyle;
export const cardStyle = cdStyle;
export const thumbStyle = thbStyle;
export const thumbInnerStyle = thbInStyle;
export const mainCanvasStyle0 = mCvsStyle0;
export const mainCanvasStyle1 = mCvsStyle1;
export const mainCanvasStyle2 = mCvsStyle2;
export const mainCanvasStyle3 = mCvsStyle3;
export const channelViewStyle = chVwStyle;
export const channelViewStyleCollapsed = chVwColStyle;
export const channelCardStyle = chCardStyle;
export const channelCardBodyStyle = chCardBodyStyle;
export const channelCanvasStyle = chCanvasStyle;
export const channelImageCanvasStyle = chImgCanvasStyle;
export const annotViewStyle = annotVwStyle;
export const annotCardStyle = annotCdStyle;
export const annotLayerStyle = annotLrStyle;
export const mainViewStyle = mViewStyle;
export const mainCardBodyStyle = mCdBodyStyle;
export const mainCardStyle = mCdStyle;
export const mainImgStyle = mImgStyle;

export const axisViewStyle = axVwStyle;
export const axisCardStyle = axCdStyle;
export const axisCardBodyStyle = axCdBodyStyle;
export const updateClasses = updCls;
export const getClasses = getCls;
export const toggleClassEnable = toggleClsEn;
export const annotClassApi = annotClsApi;
export const filterClasses = filterCls;
export const filterAnnotations = filtAnnot;
export const showAll = shAll;
export const drawFreeStyle = drawFr;
export const colors = clrs;
export const undo = undoAnnot;
export const redo = redoAnnot;
export const setCanvas = setCvs;
export const AnnotationMenuApi = aMenuApi;
export const Volume = Vol;
export const loadSlices = ldSlices;
export const updateChannelSlice = updSlice;
export const updateBrightness = updBrightness;
export const updateContrast = updContrast;
export const updateWhitepoint = updWhitepoint;
export const updateBlackpoint = updBlackpoint;
export const updateColor = updColor;
export const updateOpacity = updOpacity;
export const updateTexture = updText;
export const openMenu = opMenu;
export const startDrawing = strDr;
export const startSelecting = strSel;
export const finish = fin;
export const addToFabric = addToFab;
export const setFabricCanvas = setFabCvs;
export const setMode = setMd;
export const fabricApi = fabApi;
export const initFabricLayers = initFabLyrs;
export const modes = mds;
export const updateChannelSel = updChannelSel;
export const updateLastSel = updLastSel;
export const exportJson = expJson;
export const parseMetadata = parseMd;
export const filesNeedUpdate = filesNeedUpd;
export const areFilesValid = areFilesVal;

export const uApi = uniApi;
