import { fileApi as fApi } from '../fileuploader/fileStore.js';

import {
  annotApi as aApi,
  undoApi as unApi,
  redoApi as reApi,
} from './annotationStore.js';

import {
  addAnnotation as addAnnot,
  addAnnotationFromJson as addAnnotJson,
  undoAnnotation as undoAnnot,
  getLastAnnotIdx as getLstAntIdx,
  getLastUndoAnnot as getLstCdAnt,
  getLastUndoAnnotIdx as getLstCdAntIdx,
  deleteUndoAnnotation as delCdAnt,
  updateAnnotationLabel as updAntLbl,
  updateAnnotClassLabel as updAntClsLbl,
  getAnnotationClasses as getAnnotCls,
  redoAnnotation as redoAnno,
} from './annotationControl.js';

import { getDisabledClasses as getDisCls } from './annotationClass.js';

import {
  getItems as getIts,
  AnnotationMenuApi as aMenuApi,
  setDisplay as setDisp,
  getSelectedObjects as getSelObjs,
  updateSelect as updSel,
  getCanvas as getCvs,
} from './annotationSettings.js';

import {
  updateLabel as updLbl,
  updateClassLabel as updClsLbl,
  drawRect as drawR,
} from './annotationEditor.js';

import {
  editAnnotationOption as editAnnotOpt,
  editClassOption as editClsOpt,
  editAnnotationLabel as editAnnotLbl,
  editAnnotationClass as editAnnotCls,
} from './annotationMenuOptions.js';

import { fabricApi as fabApi } from '../fabric/fabricControl.js';

export const fileApi = fApi;
export const annotApi = aApi;
export const undoApi = unApi;
export const redoApi = reApi;
export const addAnnotation = addAnnot;
export const addAnnotationFromJson = addAnnotJson;
export const undoAnnotation = undoAnnot;
export const getLastAnnotIdx = getLstAntIdx;
export const getLastUndoAnnot = getLstCdAnt;
export const getLastUndoAnnotIdx = getLstCdAntIdx;
export const deleteUndoAnnotation = delCdAnt;
export const updateAnnotationLabel = updAntLbl;
export const updateAnnotClassLabel = updAntClsLbl;
export const getAnnotationClasses = getAnnotCls;
export const redoAnnotation = redoAnno;
export const getDisabledClasses = getDisCls;
export const getItems = getIts;
export const AnnotationMenuApi = aMenuApi;
export const setDisplay = setDisp;
export const getSelectedObjects = getSelObjs;
export const updateSelect = updSel;
export const getCanvas = getCvs;
export const updateLabel = updLbl;
export const updateClassLabel = updClsLbl;
export const drawRect = drawR;
export const editAnnotationLabel = editAnnotLbl;
export const editAnnotationClass = editAnnotCls;
export const fabricApi = fabApi;

export function editAnnotationOption() {
  editAnnotOpt();
}
export function editClassOption() {
  editClsOpt();
}
