import { fileApi } from '../../fileuploader/fileStore.js';

import { annotApi as aApi } from '../../annotator/annotationStore.js';

import {
  buttonGroup as btnGrp,
  cardStyle as cdStyle,
  card as cd,
  cardBody as cdBody,
  canvasThumbnail as cvsThb,
  thumb as thbStyle,
  thumbInner as thbInStyle,
  mainImg as mImg,
  mainCanvasStyle as mCvsStyle,
  canvasStyle1 as cvsStyle1,
  canvasStyle2 as cvsStyle2,
  canvasStyle3 as cvsStyle3,
} from '../style.js';

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

import { exportJson as expJson } from '../../fileuploader/exporter.js';

export const fApi = fileApi;
export const annotApi = aApi;
export const buttonGroup = btnGrp;
export const cardStyle = cdStyle;
export const card = cd;
export const cardBody = cdBody;
export const canvasThumbnail = cvsThb;
export const thumb = thbStyle;
export const thumbInner = thbInStyle;
export const mainImg = mImg;
export const mainCanvasStyle = mCvsStyle;
export const canvasStyle1 = cvsStyle1;
export const canvasStyle2 = cvsStyle2;
export const canvasStyle3 = cvsStyle3;
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
