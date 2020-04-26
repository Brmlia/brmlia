import {
  fileApi as fApi,
} from '../fileuploader/fileStore.js';

import {
  annotApi       as aApi,
  cachedAnnotApi as caApi,
} from './annotationStore.js'

import {
  addAnnotation          as addAnnot,
  undoAnnotation         as undoAnnot,
  getLastAnnotIdx        as getLstAntIdx,
  getLastCachedAnnot     as getLstCdAnt,
  getLastCachedAnnotIdx  as getLstCdAntIdx,
  deleteCachedAnnotation as delCdAnt,
  updateAnnotationLabel  as updAntLbl,
  updateAnnotClassLabel  as updAntClsLbl,
  getAnnotationClasses   as getAnnotCls,
} from './annotationControl.js';

import {
  getDisabledClasses as getDisCls,
} from './annotationClass.js';

import {
  getItems           as getIts,
  AnnotationMenuApi  as aMenuApi,
  setDisplay         as setDisp,
  getSelectedObjects as getSelObjs,
  updateSelect       as updSel,
  getCanvas          as getCvs,
} from "./annotationSettings.js"

import {
  updateLabel      as updLbl,
  updateClassLabel as updClsLbl,
} from './annotationEditor.js'

import {
  editAnnotationOption as editAnnotOpt,
  editClassOption      as editClsOpt,
  editAnnotationLabel  as editAnnotLbl,
  editAnnotationClass  as editAnnotCls,
} from './annotationMenuOptions.js'

export const fileApi                = fApi;
export const annotApi               = aApi;
export const cachedAnnotApi         = caApi;
export const addAnnotation          = addAnnot;
export const undoAnnotation         = undoAnnot;
export const getLastAnnotIdx        = getLstAntIdx;
export const getLastCachedAnnot     = getLstCdAnt;
export const getLastCachedAnnotIdx  = getLstCdAntIdx;
export const deleteCachedAnnotation = delCdAnt;
export const updateAnnotationLabel  = updAntLbl;
export const updateAnnotClassLabel  = updAntClsLbl;
export const getAnnotationClasses   = getAnnotCls;
export const getDisabledClasses     = getDisCls;
export const getItems               = getIts;
export const AnnotationMenuApi      = aMenuApi;
export const setDisplay             = setDisp;
export const getSelectedObjects     = getSelObjs;
export const updateSelect           = updSel;
export const getCanvas              = getCvs;
export const updateLabel            = updLbl;
export const updateClassLabel       = updClsLbl;
export const editAnnotationLabel    = editAnnotLbl;
export const editAnnotationClass    = editAnnotCls;

export function editAnnotationOption() {
  editAnnotOpt()
}
export function editClassOption() {
  editClsOpt()
}
