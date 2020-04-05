import React from "react";
import { annotApi, cachedAnnotApi } from './annotationStore.js'

export function addAnnotation(rect, label) {
  annotApi.setState( prevState => ({
    ...prevState,
    annotations: [...prevState.annotations, {
      rect: rect,
      label: label
    }]
  }))
}

export function addCachedAnnotation(rect, label) {
  cachedAnnotApi.setState( prevState => ({
    ...prevState,
    cachedAnnots: [...prevState.cachedAnnots, {
      rect: rect,
      label: label
    }]
  }))
}

export function deleteAnnotation(index) {
  const annotation = annotApi.getState().annotations[index];

  addCachedAnnotation(annotation.rect, annotation.label)
  annotApi.setState( prevState => {
    return prevState.annotations.splice(index, 1)
  })
}

export function deleteCachedAnnotation(index) {

  const cachedAnnot = cachedAnnotApi.getState().cachedAnnots[index];

  addAnnotation(cachedAnnot.rect, cachedAnnot.label)
  cachedAnnotApi.setState( prevState => {
    return prevState.cachedAnnots.splice(index, 1)
  })
}

export function undoAnnotation() {
  deleteAnnotation(annotApi.getState().annotations.length-1);
}

export function getLastAnnotIdx() {
  return annotApi.getState().annotations.length-1;
}

export function getLastCachedAnnot() {
  return cachedAnnotApi.getState().cachedAnnots[cachedAnnotApi.getState().cachedAnnots.length-1];
}

export function getLastCachedAnnotIdx() {
  return cachedAnnotApi.getState().cachedAnnots.length-1;
}
