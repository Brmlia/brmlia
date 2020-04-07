import { annotApi, cachedAnnotApi } from './annotationStore.js';

export function addAnnotation(rect, label, classLabel) {
  const default_class = 'class1'
  annotApi.setState(prevState => ({
    ...prevState,
    annotations: [
      ...prevState.annotations,
      {
        rect: rect,
        label: label,
        class: classLabel || default_class
      },
    ],
  }));
}

export function addCachedAnnotation(rect, label, classLabel) {
  cachedAnnotApi.setState(prevState => ({
    ...prevState,
    cachedAnnots: [
      ...prevState.cachedAnnots,
      {
        rect: rect,
        label: label,
        class: classLabel
      },
    ],
  }));
}

export function deleteAnnotation(index) {
  const annotation = annotApi.getState().annotations[index];

  addCachedAnnotation(annotation.rect, annotation.label);
  annotApi.setState(prevState => {
    return prevState.annotations.splice(index, 1);
  });
}

export function deleteCachedAnnotation(index) {
  const cachedAnnot = cachedAnnotApi.getState().cachedAnnots[index];

  addAnnotation(cachedAnnot.rect, cachedAnnot.label);
  cachedAnnotApi.setState(prevState => {
    return prevState.cachedAnnots.splice(index, 1);
  });
}

export function undoAnnotation() {
  deleteAnnotation(annotApi.getState().annotations.length - 1);
}

export function getLastAnnotIdx() {
  return annotApi.getState().annotations.length - 1;
}

export function getLastCachedAnnot() {
  return cachedAnnotApi.getState().cachedAnnots[
    cachedAnnotApi.getState().cachedAnnots.length - 1
  ];
}

export function getLastCachedAnnotIdx() {
  return cachedAnnotApi.getState().cachedAnnots.length - 1;
}

export function updateAnnotationLabel(oldLabel, label) {

  annotApi.setState( prevState => {
    const annotations = prevState.annotations.map((annot, j) => {
      if (annot.label === oldLabel) {
        var newAnnot = annot;
        newAnnot.label = label
        return newAnnot;
      }
      else {
        return annot
      }
    })
    return {
      annotations
    }
  })
}
