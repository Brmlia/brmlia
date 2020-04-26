import {
  drawRect as dRect,
  drawFreeStyle as dFreeSty,
} from '../annotator/annotationEditor.js';
import {
  isDisplayOn as isDispOn,
  setDisplay as setDisp,
  setMenuCoords as setMenuCrds,
  setSelectedObjects as setSelObjs,
} from '../annotator/annotationSettings.js';
import { addAnnotation as addAnnot } from '../annotator/annotationControl.js';

export const drawRect = dRect;
export const drawFreeStyle = dFreeSty;
export const isDisplayOn = isDispOn;
export const setDisplay = setDisp;
export const setMenuCoords = setMenuCrds;
export const setSelectedObjects = setSelObjs;
export const addAnnotation = addAnnot;
